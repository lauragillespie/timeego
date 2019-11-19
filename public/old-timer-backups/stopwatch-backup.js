// Grabs Nav Toggle Btn, Icons in Btn
const navToggleBtn = document.querySelector('#timer-toggle-btn');
const navToggleTimerIcon = document.querySelector('#toggle-btn-nav--timer');
const navTogglePauseIcon = document.querySelector('#toggle-btn-nav--pause');
// Grabs Timer pop-up toggle block section
const timerToggleSection = document.querySelector('.timer__toggle');
// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');
// Grabs Timer Start, Pause and Reset Buttons
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');

// This file is logic to start and stop the stopwatch,
// and update current time displayed in HTML when the
// stopwatch is running
export const stopwatch = {
	interval           : null,
	active             : false,
	time               : {
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
		this.setButtonsActive();
		timerToggleSection.classList.add('timer__toggle--hidden');
	},
	stop(e) {
		this.active = false;
		clearInterval(this.interval);
		window.localStorage.setItem('stopwatchActive', 'false');
		this.setButtonsInactive();
		timerToggleSection.classList.remove('timer__toggle--hidden');
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
	},
	// Has Time? Show Reset Button, Hide Toggle Option
	setButtonsActive() {
		stopwatchPlayBtn.style.display = 'none';
		stopwatchPauseBtn.style.display = 'flex';
		stopwatchResetBtn.style.display = 'none';
		navToggleTimerIcon.style.display = 'none';
		navTogglePauseIcon.style.display = 'block';
		navToggleBtn.classList.add('timer-toggle-btn--timing');
	},
	// Does not have time? Hide Reset Button, Show Toggle Option
	setButtonsInactive() {
		stopwatchPlayBtn.style.display = 'flex';
		stopwatchPauseBtn.style.display = 'none';
		stopwatchResetBtn.style.display = 'flex';
		navToggleTimerIcon.style.display = 'block';
		navTogglePauseIcon.style.display = 'none';
		navToggleBtn.classList.remove('timer-toggle-btn--timing');
	}
};
