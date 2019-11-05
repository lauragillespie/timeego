const timerText = document.querySelector('.timer__text');

export let stopwatchActive = false;
export const stopwatchTime = {
	hours   : 0,
	minutes : 0,
	seconds : 0
};
let interval;

export function stopwatchStart(e) {
	stopwatchActive = true;
	interval = setInterval(() => {
		increaseSecs();
	}, 1000);
}

export function stopwatchStop(e) {
	stopwatchActive = false;
	clearInterval(interval);
}

function increaseSecs() {
	if (stopwatchTime.seconds < 59) {
		stopwatchTime.seconds++;
	} else {
		stopwatchTime.seconds = 0;
		if (stopwatchTime.minutes < 59) {
			stopwatchTime.minutes++;
		} else {
			stopwatchTime.minutes = 0;
			stopwatchTime.hours++;
		}
	}

	timerText.innerText = updateHTML();
}

function updateHTML() {
	let hrs;
	let mins;
	let secs;
	if (stopwatchTime.hours < 10) {
		hrs = '0' + stopwatchTime.hours;
	} else {
		hrs = '' + stopwatchTime.hours;
	}
	if (stopwatchTime.minutes < 10) {
		mins = '0' + stopwatchTime.minutes;
	} else {
		mins = '' + stopwatchTime.minutes;
	}
	if (stopwatchTime.seconds < 10) {
		secs = '0' + stopwatchTime.seconds;
	} else {
		secs = '' + stopwatchTime.seconds;
	}
	return `${hrs}:${mins}:${secs}`;
}