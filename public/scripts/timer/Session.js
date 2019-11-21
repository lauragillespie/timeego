// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');

class Session {
	constructor(courseName, time, sessionId) {
		if (!courseName) {
			this.courseName = null;
		} else {
			this.courseName = courseName;
		}

		if (!time) {
			this.time = {
				seconds : 0,
				minutes : 0,
				hours   : 0
			};
		} else {
			this.time = time;
		}

		if (!sessionId) {
			this.sessionId = this.createInDB();
		} else {
			this.sessionId = sessionId;
		}
	}
	increaseTime() {
		if (this.time.seconds < 59) {
			this.time.seconds++;
			// Every 30 seconds, session is updated in DB
			if (this.time.seconds === 15 || this.time.seconds === 45) {
				this.updateInDB();
			}
		} else {
			this.time.seconds = 0;
			if (this.time.minutes < 59) {
				this.time.minutes++;
			} else {
				this.time.minutes = 0;
				this.time.hours++;
			}
		}
		// console.log(this.time.seconds);
		this.updateTimerText();
	}

	updateTimerText() {
		timerText.innerText = formatTime(this.time);
	}
	createInDB() {
		// Call to make new document in DB goes here
		return 'thisIDcomesFROMdb';
	}
	updateInDB() {
		// Saving to DB call goes here
		console.log('Session updated in DB');
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
	// console.log(`${hrs}:${mins}:${secs}`);
	return `${hrs}:${mins}:${secs}`;
}

export default Session;
