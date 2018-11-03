var results = new Vue({
  el: '#results',
	data: {
		results: [],
	},
	methods: {
		selectResult: function (result) {
			showSelector(result);
		},
	},
});

var resultActionSelector = new Vue({
	el: '#selector',
	data: { 
		influenceAutoQueue: true,
	},
	methods: {
		addToQueue: function (result) {
			var influenceAutoQueue = document.getElementById('influence-auto-queue').checked;
			addToQueue(result.videoId, influenceAutoQueue, false);
			dismissSelector();
		},
		playNext: function (result) {
			var influenceAutoQueue = document.getElementById('influence-auto-queue').checked;
			addToQueue(result.videoId, influenceAutoQueue, true);
			dismissSelector();
		},
		cancel: function () {
			dismissSelector();
		}
	},
});

function search() {
	var term = document.getElementById('searchField').value;
	showLoadingSpinner();

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			results.results = response;
			dismissLoadingSpinner();
		}
	}

	xhttp.open('GET', '/api/search?q=' + encodeURI(term) + '&token=' + getCookie('token'), true);
	xhttp.send();
	return false;
}

function addToQueue(videoId, influenceAutoQueue, next) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200) {
			showAddedSnackbar(JSON.parse(this.responseText));
		}
	}

	var playNextQs = next ? '&next=true' : '';
	var influenceAutoQueueQs = influenceAutoQueue ? '&influenceautoqueue=false' : '';

	xhttp.open('GET', '/api/enqueue?videoId=' + encodeURI(videoId) + playNextQs + influenceAutoQueueQs + '&token=' + getCookie('token'), true);
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

function showLoadingSpinner() {
	document.getElementById('curtain').style.visibility = 'visible';
	document.getElementById('spinner').style.visibility = 'visible';
	document.getElementById('selector').style.visibility = 'hidden';
}

function dismissLoadingSpinner() {
	document.getElementById('curtain').style.visibility = 'hidden';
	document.getElementById('spinner').style.visibility = 'hidden';
}

function showSelector(result) {
	document.getElementById('curtain').style.visibility = 'visible';
	document.getElementById('selector').style.visibility = 'visible';
	document.getElementById('spinner').style.visibility = 'hidden';
	// Force the checkbox to be checked.
	document.getElementById('influence-auto-queue').checked = true;
	resultActionSelector.result = result;
}

function dismissSelector() {
	document.getElementById('curtain').style.visibility = 'hidden';
	document.getElementById('selector').style.visibility = 'hidden';
	resultActionSelector.result = undefined;
}