import Session from './Session.js';
import updateTimerPopupElements from './updateTimerPopupElements.js';

// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');

class Stopwatch {
	constructor(timerState) {
		this.interval = null;

		this.currentlyTiming;
		this.activeSession;

		if (!timerState) {
			this.currentlyTiming = false;
			this.activeSession = null;
		} else {
			const { currentlyTiming, activeSession } = timerState;
			this.currentlyTiming = currentlyTiming;
			if (activeSession) {
				const { courseName, time, sessionId } = activeSession;
				this.activeSession = new Session(courseName, time, sessionId);
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

		updateTimerPopupElements(this.currentlyTiming, this.activeSession);
	}
	pause() {
		this.currentlyTiming = false;
		clearInterval(this.interval);
		this.saveToLocalStorage();
		// When timer is paused, session is updated in DB
		this.activeSession.updateInDB();
		updateTimerPopupElements(this.currentlyTiming, this.activeSession);
	}
	reset() {
		this.activeSession = null;
		this.saveToLocalStorage();
		updateTimerPopupElements(this.currentlyTiming, this.activeSession);
		timerText.innerText = '00:00:00';
	}

	saveToLocalStorage() {
		const timerState = {
			currentlyTiming : this.currentlyTiming,
			activeSession   : this.activeSession
		};
		window.localStorage.setItem('timerState', JSON.stringify(timerState));
	}

	onPageLoad() {
		updateTimerPopupElements(this.currentlyTiming, this.activeSession);
		if (this.currentlyTiming) {
			this.start();
		}
		if (this.activeSession) {
			this.activeSession.updateTimerText();
		}
	}
}

export default Stopwatch;
