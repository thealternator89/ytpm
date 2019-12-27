// tslint:disable:no-console

import * as $ from 'jquery';
import * as YouTubePlayer from 'youtube-player';

import {PlayerState} from './enums';

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

$('#host').text(new URL(window.location.href).host);

let player;
let currentVideo;

$.ajax({
    success: (response) => {
        playerToken = response.token;
        const queueKey = response.queue_key;

        document.title = 'YTPM - ' + queueKey;
        $('#pass_phrase').text(queueKey);
        $('#auth_info_panel').css('visibility', 'visible');
        $('#NoMusicError').css('visibility', 'visible');
        $('#loading_curtain').css('visibility', 'hidden');

        getItemToPlay();
    },
    complete: () => { startPoll() },
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
    setTimeout(()=> {
        requestStart = new Date().getTime();
        $.ajax({
            complete: poll,
            dataType: 'json',
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

                switch(event) {
                    case 'SONG_ENQUEUE': showToast(`${response.addedBy} added: ${response.video.title}`, 'queue');
                        break;
                    case 'PLAYER_COMMAND': handlePlayerCommand(response.command);
                        break;
                    case 'TOAST': showToast(response.message);
                        break;
                    case 'USER_JOIN': showToast(`${response.name} joined`, 'person_add');
                        break;
                    case 'USER_LEAVE': showToast(`${response.name} left`, 'person_outline');
                        break;
                    default:
                        console.error(`Unrecognised event ${event} - ignoring`);
                }
                subsequentFailures = 0;
            },
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
}

function getItemToPlay() {
    $('#loading_curtain').css('visibility', 'visible');
    $('#player').remove();
    player = null;
    currentVideo = null;
    $.ajax({
        success: (response) => {
            if (typeof response === 'undefined' || !response) {
                $('#NoMusicError').css('visibility', 'visible');
                $('#loading_curtain').css('visibility', 'hidden');
            } else {
                $('#NoMusicError').css('visibility', 'hidden');
                playSong(response);
            }
        },
        url: `/api/player/next_song?token=${playerToken}`,
    });
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
    showSongInfoPanel(song.video.title, song.video.thumbnail.normal, song.addedBy);
}

function showSongInfoPanel(title: string, thumbnail: string, addedBy: string) {
    $('#played_title').text(title);
    $('#played_thumb').attr('src', thumbnail);
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

function buildToast(text: string, icon: string) {
    const toastElem = document.createElement('div');
    toastElem.className = 'toast';
   
    // hide it until we're ready to show it
    toastElem.style.visibility = 'hidden';

    const toastIcon = document.createElement('i');
    toastIcon.classList.add('toast-icon');  // TODO: Set the style of the toast-icon class to "vertical-align: bottom"
    toastIcon.classList.add('material-icons');
    toastIcon.setAttribute('aria-hidden', 'true');
    toastIcon.textContent = icon;

    const toastText = document.createElement('span');
    toastText.className = 'toast-text';
    toastText.textContent = text;

    toastElem.appendChild(toastIcon);
    toastElem.appendChild(toastText);
}

/**
 * Show a toast on screen.
 * @param text The text to display
 * @param iconName The icon to display
 * @param timeout The time to display the toast. If this is '-1', the toast will not disappear until a new toast is displayed
 */
function showToast(text: string, iconName: string = 'info', timeout: number = 3000) {
    $('#toast_icon').text(iconName);
    $('#toast_text').text(text);

    const toastElem = $('#toast');

    toastElem.css('visibility', 'visible');

    if(timeout !== -1) {
        setTimeout(() => {
            toastElem.css('visibility', 'hidden');
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
            $('#pausedOsd').css('visibility', 'visible');
            break;
        }
        case PlayerState.PLAYING: {
            const data = {
                videoId: currentVideo,
            };

            sendBeacon('playing', data);
            $('#pausedOsd').css('visibility', 'hidden');
            setTimeout(() => {
                $('#loading_curtain').css('visibility', 'hidden');
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
        'msRequestFullscreen'       // Edge (maybe IE?)
    );
}

function exitFullscreen() {
    runFirstValidFunction(document,
        'exitFullscreen',           // Default
        'mozCancelFullScreen',      // Firefox, Seamonkey, etc.
        'webkitExitFullscreen',     // Brave, Chrome, Opera, Safari, etc.
        'msExitFullscreen'          // Edge, (maybe IE?)
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
