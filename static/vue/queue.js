var queueVue = new Vue({
  el: '#queue',
	data: {
		queueItems: [],
	},
	methods: {
		home: function () {
			window.location = 'home';
		},
		openYoutube: function (queueItem) {
			window.open('vnd.youtube://' + queueItem.videoId, '_blank');
		},
	},
});

var updateQueueList = function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			queueVue.queueItems = response.queue;
			document.getElementById('auto_queue_state_text').className = response.autoPlayEnabled ? 'auto_queue_enabled' : 'auto_queue_disabled';
		}
	}

	xhttp.open('GET', '/api/queue_state?token=' + getCookie('token'), true);
	xhttp.send();
};

setInterval(updateQueueList, 10000);

updateQueueList();