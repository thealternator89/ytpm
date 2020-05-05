// tslint:disable:no-console

import $ from 'jquery';
import YouTubePlayer from 'youtube-player';

import { PlayerState } from './enums';

// NOTE: This is temporary until we split out general things into another src subdirectory
// tslint:disable-next-line:interface-over-type-literal
type VideoDetails = {videoId: string, title: string, description: string,
    thumbnail: {
        normal?: string,
        big?: string,
    }, channelName: string};

let playerToken;

// TODO add type def for additional data
function sendBeacon(eventName: string, additionalData?: any) {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const url = '/api/player/update?token=' + playerToken;
    const dataObj = {event: eventName, time: timestamp};
    Object.assign(dataObj, additionalData);

    const urlEncodedData = getUrlEncodedData(dataObj);

    const dataBlob = new Blob([urlEncodedData],
        {type : 'application/x-www-form-urlencoded'});
    navigator.sendBeacon(url, dataBlob);
}

function getUrlEncodedData(data) {
    const urlEncodedDataPairs = [];
    for (const name in data) {
        if (!data.hasOwnProperty(name)) {
            continue;
        }
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
}

window.onbeforeunload = () => {
    sendBeacon('unloaded');
    return null;
};


let player;
let currentVideo;

$.ajax({
    complete: () => { startPoll(); },
    success: (response) => {
        playerToken = response.token;
        const queueKey = response.queue_key;
        const url = new URL(window.location.href);
        const host = url.host;

        document.title = 'YTPM - ' + queueKey;
        $('#pass_phrase').text(queueKey);
        $('#pass_phrase-x').text(queueKey);

        $('#host').text(host);
        $('#host-x').text(host);

        $('#login-qr').attr(
            'src',
            'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' +
                encodeURIComponent(`${url.protocol}//${host}/?key=${queueKey}`));
        show($('#first_launch'));
        hide($('#loading_curtain'));

        getItemToPlay();
    },
    url: '/api/player/register',
});

let requestStart = 0;
let subsequentFailures = 0;
let notifiedServerDown = false;
let allowPoll = true;

// perform xhr to /api/player/poll
const startPoll = (function poll() {
    if (!allowPoll) {
        return;
    }
    setTimeout(() => {
        requestStart = new Date().getTime();
        $.ajax({
            complete: poll,
            dataType: 'json',
            error: (req, status, error) => {
                const timeSinceRequestStarted = new Date().getTime() - requestStart;

                if (error === 'Bad Request') {
                    showToast('Authentication failure - Player will reload in 10 seconds.', 'error', -1);
                    allowPoll = false;
                    setTimeout(() => {
                        location.reload();
                    }, 10000);
                }

                // The request lasted less than 5 seconds, assume it hard failed rather than a timeout
                if (timeSinceRequestStarted < 15) {
                    subsequentFailures++;
                    console.error(`${error || 'Unknown Error'} occurred - Time: ${timeSinceRequestStarted}`);
                    if (subsequentFailures > 5 && !notifiedServerDown) {
                        showToast('Connection to server lost', 'error', -1);
                        notifiedServerDown = true;
                    }
                }
            },
            success: (response) => {
                if (notifiedServerDown) {
                    showToast('Connection re-established');
                    notifiedServerDown = false;
                }

                console.log(response);
                const event = response.event;

                // If a song was enqueued and we're not currently playing a song, get a new song to play.
                if ((typeof(player) === 'undefined' || player === null) && event === 'SONG_ENQUEUE') {
                    getItemToPlay();
                }

                switch (event) {
                    case 'SONG_ENQUEUE': {
                        showToast(`${response.addedBy} added: ${response.video.title}`, 'queue');
                        break;
                    }
                    case 'PLAYER_COMMAND': {
                        handlePlayerCommand(response.command);
                        break;
                    }
                    case 'TOAST': {
                        showToast(response.message);
                        break;
                    }
                    case 'USER_JOIN': {
                        showToast(`${response.name} joined`, 'person_add');
                        break;
                    }
                    case 'USER_LEAVE': {
                        showToast(`${response.name} left`, 'person_outline');
                        break;
                    }
                    default: {
                        console.error(`Unrecognised event ${event} - ignoring`);
                    }
                }
                subsequentFailures = 0;
            },
            url: '/api/player/poll?token=' + playerToken,
        });
    }, subsequentFailures <= 1 ? 0 : 1000);
});

const handlePlayerCommand = (command: string) => {
    if (player) {
        switch (command) {
            case 'PLAY': {
                player.playVideo();
                break;
            }
            case 'PAUSE': {
                player.pauseVideo();
                break;
            }
            case 'NEXTTRACK': {
                getItemToPlay();
                break;
            }
            case 'REPLAYTRACK': {
                player.seekTo(0);
                break;
            }
            case 'RELOAD': {
                window.location.reload(true);
                break;
            }
            default: console.log('unknown command: ' + command);
        }
    }
};

function getItemToPlay() {
    show($('#loading_curtain'));
    $('#player').remove();
    player = null;
    currentVideo = null;
    $.ajax({
        success: (response) => {
            if (typeof response === 'undefined' || !response) {
                show($('#first_launch'));
                hide($('#auth_info_panel'));
                hide($('#loading_curtain'));
            } else {
                hide($('#first_launch'));
                show($('#auth_info_panel'));
                $('#connect-heading').text('Nothing to play. Connect and add a song to the queue:');
                playSong(response);
            }
        },
        url: `/api/player/next_song?token=${playerToken}`,
    });
}

function hide(elem: JQuery<HTMLElement>) {
    elem.addClass('hidden');
}

function show(elem: JQuery<HTMLElement>) {
    elem.removeClass('hidden');
}

function playSong(song: {video: VideoDetails, addedBy: string}) {
    $('<div id="player"></div>').appendTo(document.body);
    currentVideo = song.video.videoId;
    player = YouTubePlayer('player', {
        playerVars: {
            autoplay: 1,
            controls: 0,
        },
        videoId: song.video.videoId,
    });
    player.on('stateChange', onPlayerStateChange);
    player.playVideo();
    showSongInfoPanel(song.video.title, song.addedBy);
}

function showSongInfoPanel(title: string, addedBy: string) {
    $('#played_title').text(title);
    $('#played_added_by').text(addedBy);

    const songInfoPanelElem = $('#played_song');

    animateCSS('#played_song', 'fadeInDown', () => {
        songInfoPanelElem.css('top', '0px');
    });
    setTimeout(() => {
        animateCSS('#played_song', 'fadeOutUp', () => {
            songInfoPanelElem.css('top', '-120px');
        });
    }, 7000);
}

/**
 * Show a toast on screen.
 * @param text The text to display
 * @param iconName The icon to display
 * @param timeout The time to display the toast.
 * If this is '-1', the toast will not disappear until a new toast is displayed
 */
function showToast(text: string, iconName: string = 'info', timeout: number = 3000) {
    $('#toast_icon').text(iconName);
    $('#toast_text').text(text);

    const toastElem = $('#toast');

    show(toastElem);

    if (timeout !== -1) {
        setTimeout(() => {
            hide(toastElem);
        }, timeout);
    }
}

async function onPlayerStateChange(event: {data: any}) {
    switch (event.data) {
        case PlayerState.ENDED: {
            sendBeacon('ended');
            getItemToPlay();
            break;
        }
        case PlayerState.PAUSED: {
            const playerTime = await player.getCurrentTime();
            const playerDuration = await player.getDuration();

            const data = {
                duration: playerDuration,
                position: playerTime,
                videoId: currentVideo,
            };

            sendBeacon('paused', data);
            show($('#pausedOsd'));
            break;
        }
        case PlayerState.PLAYING: {
            const data = {
                videoId: currentVideo,
            };

            sendBeacon('playing', data);
            hide($('#pausedOsd'));
            setTimeout(() => {
                hide($('#loading_curtain'));
            }, 100);
            break;
        }
        default: {
            sendBeacon(youTubePlayerStateToBeaconEvent(event.data));
        }
    }
}

function youTubePlayerStateToBeaconEvent(state: number) {
    switch (state) {
        case PlayerState.BUFFERING: return 'buffering';
        case PlayerState.CUED: return 'cued';
        case PlayerState.ENDED: return 'ended';
        case PlayerState.PAUSED: return 'paused';
        case PlayerState.PLAYING: return 'playing';
        case PlayerState.UNSTARTED: return 'unstarted';
        default: return 'unknown';
    }
}

function animateCSS(element: string, animationName: 'fadeInDown'|'fadeOutUp', callback?: () => void) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') {
            callback();
        }
    }

    node.addEventListener('animationend', handleAnimationEnd);
}

document.getElementById('invisible_curtain').ondblclick = () => {
    const isFullscreen = window.innerHeight === screen.height;
    if (isFullscreen) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
};

function enterFullscreen() {
    runFirstValidFunction(document.documentElement,
        'requestFullscreen',        // Default
        'mozRequestFullScreen',     // Firefox, Seamonkey, etc.
        'webkitRequestFullscreen',  // Brave, Chrome, Opera, Safari, etc.
        'msRequestFullscreen',      // Edge (maybe IE?)
    );
}

function exitFullscreen() {
    runFirstValidFunction(document,
        'exitFullscreen',           // Default
        'mozCancelFullScreen',      // Firefox, Seamonkey, etc.
        'webkitExitFullscreen',     // Brave, Chrome, Opera, Safari, etc.
        'msExitFullscreen',         // Edge, (maybe IE?)
    );
}

function runFirstValidFunction(obj: any, ...funcNames: string[]) {
    for (const func of funcNames) {
        if (obj[func]) {
            obj[func]();
            return;
        }
    }
}
