// TODO: Add Commenting to File

import { global } from '../models/firebase.js';
import Session from './Session.js';
import updateTimerPopupElements from './updateTimerPopupElements.js';

// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');
/**************************************************************
* Stopwatch Class
* Holds State of the the apps stopwatch so it can be consistent
* across all pages of the app.
*
* interval - used for timing
* selectedCourse - currently selected course
* currentlyTiming - is timer currently running?
* activeSession - is time session in progress?
* sessionToDB - holds session as it is written to the database
**************************************************************/

class Stopwatch {
	constructor(timerState) {
		this.interval = null;
		this.selectedCourse;
		this.currentlyTiming;
		this.activeSession;
		this.sessionToDB;

		if (!timerState) {
			this.currentlyTiming = false;
			this.activeSession = null;
			this.selectedCourse = null;
		} else {
			const {
				currentlyTiming,
				selectedCourse,
				activeSession
			} = timerState;
			this.currentlyTiming = currentlyTiming;
			this.selectedCourse = selectedCourse;
			if (activeSession) {
				const { time } = activeSession;
				this.activeSession = new Session(time);
			} else {
				this.activeSession = null;
			}
		}
	}
	start() {
		if (this.activeSession === null) {
			this.activeSession = new Session(null);
		}
		this.currentlyTiming = true;
		this.saveToLocalStorage();

		this.interval = setInterval(() => {
			this.activeSession.increaseTime();
			this.saveToLocalStorage();
		}, 1000);

		updateTimerPopupElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
	}
	pause() {
		this.currentlyTiming = false;
		clearInterval(this.interval);
		this.saveToLocalStorage();
		updateTimerPopupElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
	}
	reset() {
		this.saveToDB();
		this.activeSession = null;
		this.selectedCourse = null;
		this.saveToLocalStorage();
		updateTimerPopupElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
		timerText.innerText = '00:00:00';
	}

	onPageLoad() {
		updateTimerPopupElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
		if (this.currentlyTiming) {
			this.start();
		}
		if (this.activeSession) {
			this.activeSession.updateTimerText();
		}
	}
	saveToLocalStorage() {
		const timerState = {
			currentlyTiming : this.currentlyTiming,
			selectedCourse  : this.selectedCourse,
			activeSession   : this.activeSession
		};
		window.localStorage.setItem('timerState', JSON.stringify(timerState));
	}
	saveToDB() {
		this.sessionToDB = {
			course : this.selectedCourse,
			time   : this.activeSession.time,
			date   : new Date()
		};
		global.writeDB.createSession(this.sessionToDB);
	}
	updateSelectedCourse(selectedCourse) {
		this.selectedCourse = selectedCourse;
		this.saveToLocalStorage();
	}
}

export default Stopwatch;
