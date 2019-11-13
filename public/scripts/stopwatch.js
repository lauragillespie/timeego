// This file is logic to start and stop the stopwatch,
// and update current time displayed in HTML when the
// stopwatch is running

const timerText = document.querySelector('.timer__text');

export const stopwatch = {
	interval        : null,
	active          : false,
	time            : {
		hours   : 0,
		minutes : 0,
		seconds : 0
	},
	start(e) {
		this.active = true;
		this.interval = setInterval(() => {
			this.count();
		}, 1000);
		window.localStorage.setItem('stopwatchActive', 'true');
	},
	stop(e) {
		this.active = false;
		clearInterval(this.interval);
		window.localStorage.setItem('stopwatchActive', 'false');
	},
	reset(e) {
		this.time = {
			hours   : 0,
			minutes : 0,
			seconds : 0
		};
		window.localStorage.setItem('time', JSON.stringify(this.time));
		this.updateTimerText();
	},
	count() {
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
		window.localStorage.setItem('time', JSON.stringify(this.time));
		this.updateTimerText();
	},
	updateTimerText() {
		timerText.innerText = this.updateHTML();
	},
	updateHTML() {
		let hrs;
		let mins;
		let secs;
		if (stopwatch.time.hours < 10) {
			hrs = '0' + stopwatch.time.hours;
		} else {
			hrs = '' + stopwatch.time.hours;
		}
		if (stopwatch.time.minutes < 10) {
			mins = '0' + stopwatch.time.minutes;
		} else {
			mins = '' + stopwatch.time.minutes;
		}
		if (stopwatch.time.seconds < 10) {
			secs = '0' + stopwatch.time.seconds;
		} else {
			secs = '' + stopwatch.time.seconds;
		}
		return `${hrs}:${mins}:${secs}`;
	}
};
