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
    url: '/api/player/register',
});

// perform xhr to /api/player/poll

(function poll() {
    $.ajax({
        complete: poll,
        dataType: 'json',
        success: (response) => {
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
                    console.log(`Unrecognised event ${event} - ignoring`);
            }
        },
        error: (req, errorType) => {
            console.log(`${errorType} occurred`);
        },
        url: '/api/player/poll?token=' + playerToken,
    });
})();

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

function showToast(text: string, iconName: string = 'info') {
    $('#toast_icon').text(iconName);
    $('#toast_text').text(text);

    const toastElem = $('#toast');

    toastElem.css('visibility', 'visible');
    setTimeout(() => {
        toastElem.css('visibility', 'hidden');
    }, 3000);
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
            const playerTime = await player.getCurrentTime();
            const playerDuration = await player.getDuration();

            const data = {
                duration: playerDuration,
                position: playerTime,
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
