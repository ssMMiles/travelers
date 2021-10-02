const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const fadeSpeed = parseFloat(urlParams.get('fade')||'0.2');
const seekThreshold = parseFloat(urlParams.get('seek')||'0.01');

const travelers = [
	'chert', 
	'esker', 
	'riebeck', 
	'gabbro', 
	'feldspar', 
	'solanum', 
	'prisoner'
]

var loadState = travelers.length, song = [];

var state = localStorage.state || 'false,'.repeat(loadState).slice(0, -1)
state = state.split(',');
state = state.map(v=>v==='true');

var volume = localStorage.volume || '0.5,'.repeat(loadState).slice(0, -1)
volume = volume.split(',');
volume = volume.map(parseFloat);

var song = [];

for (let traveler of travelers) {
	song.push(new Howl({
		src:[`resources/${traveler}.ogg`,`resources/${traveler}.wav`],
		loop: true,
		volume: 0,
		onload: ()=>{loadState -= 1;},
		onloaderror:err=>{
			document.getElementById('loader').innerHTML = 
			`ERROR<p>${traveler}: ${err}</p>`
		},
		onstop:i=>{song[0].play()},
		onplayerror:(i,e)=>{console.error(e)}
	}));
}
