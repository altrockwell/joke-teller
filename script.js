const audioElement = document.getElementById('audio');
const button = document.getElementById('btn');
const apiKey = '351cd859cf0a42d3a33a95e2d7f19a5b';

function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
	VoiceRSS.speech({
		key: apiKey,
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false,
	});
}

async function getJokes() {
	console.log('called it');
	let joke = '';
	const apiUrl =
		'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		tellMe(joke);
		// Disable button
		toggleButton();
	} catch (error) {
		console.log('whoops ', error);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

// getJokes();
