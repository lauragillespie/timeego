// TODO: Add Commenting to File

// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');

class Session {
	constructor(time) {
		if (!time) {
			this.time = {
				seconds : 0,
				minutes : 0,
				hours   : 0
			};
		} else {
			this.time = time;
		}
	}
	increaseTime() {
		if (this.time.seconds < 59) {
			this.time.seconds++;
		} else {
			this.time.seconds = 0;
			if (this.time.minutes < 59) {
				this.time.minutes++;
			} else {
				this.time.minutes = 0;
				this.time.hours++;
			}
		}
		this.updateTimerText();
	}

	updateTimerText() {
		timerText.innerText = formatTime(this.time);
	}
}

function formatTime(time) {
	const { seconds, minutes, hours } = time;
	let hrs;
	let mins;
	let secs;
	if (hours < 10) {
		hrs = '0' + hours;
	} else {
		hrs = hours;
	}
	if (minutes < 10) {
		mins = '0' + minutes;
	} else {
		mins = minutes;
	}
	if (seconds < 10) {
		secs = '0' + seconds;
	} else {
		secs = seconds;
	}
	return `${hrs}:${mins}:${secs}`;
}

export default Session;
