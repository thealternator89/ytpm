import * as $ from 'jquery';
import * as YouTubePlayer from 'youtube-player';

import {PlayerState} from './enums';

var playerToken;

// TODO add type def for additional data
function sendBeacon(eventName: string, additionalData?: any) {
    var timestamp = Math.round((new Date()).getTime() / 1000);
    var url = '/api/player/update?token=' + playerToken;
    var dataObj = {event: eventName, time: timestamp};
    Object.assign(dataObj, additionalData);

    var urlEncodedData = getUrlEncodedData(dataObj);

    var dataBlob = new Blob([urlEncodedData],
        {type : 'application/x-www-form-urlencoded'});
    navigator.sendBeacon(url, dataBlob);
}

function getUrlEncodedData(data) {
    var urlEncodedDataPairs = [];
    for (var name in data) {
        if(!data.hasOwnProperty(name)) {
            continue;
        }
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
}

window.onbeforeunload = function() {
    sendBeacon('unloaded');
    return null;
}

$('#host').text(new URL(window.location.href).host);

let player;
let currentVideo;

$.ajax({
    url: '/api/player/register',
    success: function(response) {
        playerToken = response.token;
        var queueKey = response.queue_key;

        document.title = 'YTPM - ' + queueKey;
        $('#pass_phrase').text(queueKey);
        $('#queue_size').text(response.queue_length);
        $('#auth_info_panel').css('visibility', 'visible');
        $('#NoMusicError').css('visibility', 'visible');
        $('#loading_curtain').css('visibility', 'hidden');
        getItemToPlay();
    }
});

// perform xhr to /api/player/poll

(function poll() {
    $.ajax({
        url: '/api/player/poll?token=' + playerToken,
        success: function(response) {
            // If the queueLength is now > 0 and we're not currently playing a song, reload to get a song.
            if ((typeof(player) === 'undefined' || player === null) && response.queueLength > 0) {
                getItemToPlay();
            }

            if (typeof(response.command) !== 'undefined' && (typeof(player) !== 'undefined' && player !== null)) {
                switch (response.command) {
                    case 'PLAY': player.playVideo();
                        break;
                    case 'PAUSE': player.pauseVideo();
                        break;
                    case 'NEXTTRACK': getItemToPlay();
                        break;
                    case 'REPLAYTRACK': player.seekTo(0);
                        break;
                    default: console.log('unknown command: ' + response.command);
                }
            }

            document.getElementById('queue_size').innerText = response.queueLength;

            if(typeof response.addedSong !== 'undefined') {
                let song = response.addedSong;
                showSongAddedPanel(song.title, song.addedBy);
            }
        },
        error: function(xhr, textStatus, error) {},
        dataType: "json",
        complete: poll
    });
})();

/*
    {
        video: {
            videoId: string;
            title: string;
            description: string;
            thumbnailUrl?: string;
            thumbnailUrlBig?: string;
            channelName?: string;
        },
        addedByText: string
    }
*/

function getItemToPlay() {
    $('#loading_curtain').css('visibility', 'visible');
    $('#player').remove();
    player = null;
    currentVideo = null;
    $.ajax({
    url: '/api/player/next_song?token=' + playerToken,
    success: function(response) {
        if (typeof response === 'undefined' || !response) {
            $('#NoMusicError').css('visibility', 'visible');
            $('#loading_curtain').css('visibility', 'hidden');
        } else {
            $('#NoMusicError').css('visibility', 'hidden');
            $('#queue_size').text(response.queueLength);
            playSong(response);
        }
    }
});
}

function playSong(song: {video: {videoId: string, title: string, description:string, thumbnailUrl: string, thumbnailUrlBig: string, channelName: string}, addedBy: string}) {
    $('<div id="player"></div>').appendTo(document.body);
    currentVideo = song.video.videoId;
    player = YouTubePlayer('player', {
        videoId: song.video.videoId,
        playerVars: { 'autoplay': 1, 'controls': 0 }
    });
    player.on('stateChange', onPlayerStateChange);
    player.playVideo();
    showSongInfoPanel(song.video.title, song.video.thumbnailUrl, song.addedBy);
}

function showSongInfoPanel(title: string, thumbnail: string, addedBy: string) {
    $('#played_title').text(title);
    $('#played_thumb').attr('src', thumbnail);
    $('#played_added_by').text(addedBy);

    var songInfoPanelElem = $('#played_song');

    animateCSS('#played_song', 'fadeInDown', () => {
        songInfoPanelElem.css('top', '0px');
    });
    setTimeout(() =>{
        animateCSS('#played_song', 'fadeOutUp', () => {
            songInfoPanelElem.css('top', '-120px');
        });
    }, 7000);
}

function showSongAddedPanel(title: string, addedBy: string) {
    $('#added_title').text(title);
    $('#added_user').text(addedBy);

    var songInfoPanelElem = $('#added_song');

    songInfoPanelElem.css('visibility', 'visible');
    setTimeout(() =>{
        songInfoPanelElem.css('visibility', 'hidden');
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
            var data = {
                videoId: currentVideo,
                position: await player.getCurrentTime(),
                duration: await player.getDuration(),
            };

            sendBeacon('paused', data);
            $('#pausedOsd').css('visibility', 'visible');
            break;
        }
        case PlayerState.PLAYING: {
            let playerTime = await player.getCurrentTime();
            let playerDuration = await player.getDuration();

            console.dir(player);

            var data = {
                videoId: currentVideo,
                position: playerTime,
                duration: playerDuration,
            };

            sendBeacon('playing', data);
            $('#pausedOsd').css('visibility', 'hidden');
            setTimeout(function() {
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
    switch(state){
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
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
