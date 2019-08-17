
var historyVue = new Vue({
  el: '#history',
	data: {
		historyItems: [],
		selectedItem: undefined,
		influenceAutoQueue: true,
	},
	watch: {
		query: function(newQuery) {
			getSuggestionsForQuery(newQuery);
		}
	},
	methods: {
		home: function () {
			window.location = 'home';
		},
		selectItem: function (item) {
			showSelector(item);
		},
		addToQueue: function (item) {
			var influenceAutoQueue = document.getElementById('influence-auto-queue').checked;
			addToQueue(item.videoId, influenceAutoQueue, false);
			dismissSelector();
		},
		playNext: function (item) {
			var influenceAutoQueue = document.getElementById('influence-auto-queue').checked;
			addToQueue(item.videoId, influenceAutoQueue, true);
			dismissSelector();
		},
		openYouTube: function (item) {
			window.open('vnd.youtube://' + item.videoId, '_blank');
		},
		cancel: function () {
			dismissSelector();
		}
	},
});

function addToQueue(videoId, influenceAutoQueue, next) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200) {
			showAddedSnackbar(JSON.parse(this.responseText));
		}
	}

	var playNextQs = next ? '&next=true' : '';
	var influenceAutoQueueQs = influenceAutoQueue ? '&influenceautoqueue=false' : '';

	xhttp.open('GET', '/api/client/a/enqueue?videoId=' + encodeURI(videoId) + playNextQs + influenceAutoQueueQs + '&token=' + getCookie('token'), true);
	xhttp.send();
}

function showAddedSnackbar(videoDetails) {
	Vue.toasted.show('Added: ' + videoDetails.title, { 
		theme: "primary",
		position: "bottom-center",
		icon: "queue",
		fullWidth: true,
		duration : 5000
	});
}

function showSelector(item) {
	document.getElementById('curtain').style.visibility = 'visible';
	document.getElementById('selector').style.visibility = 'visible';
	// Force the checkbox to be checked.
	historyVue.influenceAutoQueue.checked = true;
	historyVue.result = item;
}

function dismissSelector() {
	document.getElementById('curtain').style.visibility = 'hidden';
	document.getElementById('selector').style.visibility = 'hidden';
	historyVue.result = undefined;
}

var updateHistoryList = function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			historyVue.historyItems = response;
		}
	}

	xhttp.open('GET', '/api/client/a/play_history?fullHistory=true&token=' + getCookie('token'), true);
	xhttp.send();
};

setInterval(updateHistoryList, 10000);

updateHistoryList();
