var details = new Vue({
  el: '#playingDetails',
	data: {
		status: undefined,
	},
	methods: {
		playPause: function() {
			var currentState = details.status.playerState;
			if(currentState === 'PLAYING'){
				sendCommand('PAUSE');
			} else if (currentState === 'PAUSED'){
				sendCommand('PLAY');
			}
		},
		skipTrack: function() {
			sendCommand('NEXTTRACK');
		}
	}
});

function sendCommand(command) {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', '/api/set_command?command=' + command.toUpperCase() + '&token=' + getCookie('token'), true);
	xhttp.send();
}

setInterval(function () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var video = response.video || {
				videoId: '',
				title: '',
				description: '',
				thumbnailUrl: '',
				channelName: '',
			};

			var positionString = response.position ? getTimeString(response.position) : '';
			var durationString = response.duration ? getTimeString(response.duration) : '';
			var completion = (response.position && response.duration ? response.position / response.duration : 0) * 100;


			details.status = {
				playerState: response.playerState,
				video: video,
				position: positionString,
				duration: durationString,
				completionPercent: completion,
				health: response.health,
			};
		}
	}

	xhttp.open('GET', '/api/client/poll?token=' + getCookie('token'), true);
	xhttp.send();

}, 1000);

function getTimeString(seconds) {
	var duration = moment.duration(seconds, 'seconds');
	return getTimeComponentString({
			component: duration.hours(),
			alwaysInclude: false,
			includeTrailingColon: true,
		}) +
		getTimeComponentString({
			component: duration.minutes(),
			alwaysInclude: true,
			includeTrailingColon: true,
		}) +
		getTimeComponentString({
			component: duration.seconds(),
			alwaysInclude: true,
			includeTrailingColon: false,
		});
}

function getTimeComponentString(params) {
	var componentString	
	if (params.component === 0 && !params.alwaysInclude) {
		return '';
	} else if(params.component === 0) {
		componentString = '00';
	} else if(params.component < 10) {
		componentString = '0' + params.component;
	} else {
		componentString = String(params.component);
	}

	if (params.includeTrailingColon) {
		componentString += ':';
	}

	return componentString;
}