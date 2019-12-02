// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');

/**********************************************************************
* Session Class
* Holds State of the current session time so it can be consistent
* across all pages of the app.
*
* time - holds current time
**********************************************************************/

class Session {
	// Sets time from localStorage, or to 00:00:00 if new session
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

	// Increases time by one second. Loops to minutes and hours as needed.
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
		// After time is increased, updates time HTML
		this.updateTimerText();
	}

	// Updates time HTML to display correct time
	updateTimerText() {
		timerText.innerText = formatTime(this.time);
	}
}

// Converts time (numbers) into strings with leading 0's and :'s as needed
// Params: current Time (numbers)
// Returns: time as formatted string
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
