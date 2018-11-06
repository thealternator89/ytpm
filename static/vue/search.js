var searchVue = new Vue({
  el: '#search',
	data: {
		suggestions: [],
		results: [],
		selectedResult: undefined,
		influenceAutoQueue: true,
		query: '',
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
		searchManual: function () {
			var query = document.getElementById('searchField').value;
			search(query);
		},
		selectSuggestion: function (suggestion) {
			search(suggestion);
		},
		selectResult: function (result) {
			showSelector(result);
		},
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

var enableAutoComplete = true;

function search(term) {
	showLoadingSpinner();
	enableAutoComplete = false;
	searchVue.query = term;
	showResultsPanel();

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			searchVue.results = response;
			dismissLoadingSpinner();
			enableAutoComplete = true;
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
	searchVue.influenceAutoQueue.checked = true;
	searchVue.result = result;
}

function dismissSelector() {
	document.getElementById('curtain').style.visibility = 'hidden';
	document.getElementById('selector').style.visibility = 'hidden';
	searchVue.result = undefined;
}

function getSuggestionsForQuery(query) {
	if(!enableAutoComplete) {
		return;
	}

	showSuggestionPanel();

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			searchVue.suggestions = JSON.parse(this.responseText);
		}
	}

	if (typeof(query) !== 'undefined' && query !== '') {
		xhttp.open('GET', '/api/autocomplete?q=' + encodeURI(query), true);
	} else {
		xhttp.open('GET', '/api/autocomplete', true);
	}
	xhttp.send();
}

function showSuggestionPanel() {
	var suggestionsPanel = document.getElementById('suggestions');
	var resultsPanel = document.getElementById('results');

	suggestionsPanel.style.display = 'block';
	resultsPanel.style.display = 'none';
}

function showResultsPanel() {
	var suggestionsPanel = document.getElementById('suggestions');
	var resultsPanel = document.getElementById('results');

	resultsPanel.style.display = 'block';
	suggestionsPanel.style.display = 'none';
}

// Populate initial suggestions.
getSuggestionsForQuery();