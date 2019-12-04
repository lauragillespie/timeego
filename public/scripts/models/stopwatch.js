// Imports
import { global } from './firebase.js';
import Session from './session.js';
import { timerViews } from '../views/global-views.js';

// Grabs Text in Timer (00:00:00)
const timerText = document.querySelector('.timer__text');

/**************************************************************
* Stopwatch Class
* Holds State of the apps stopwatch so it can be consistent
* across all pages of the app.
*
* interval - used for timing
* selectedCourse - currently selected course
* currentlyTiming - is timer currently running?
* activeSession - is time session in progress?
* sessionToDB - holds session as it is written to the database
**************************************************************/

class Stopwatch {
	// Gets Object from localStorage or null if no object in localStorage. Sets Stopwatch state accordingly
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
			// If there is an activeSession from localStorage, creates a session object from the Session class
			if (activeSession) {
				const { time } = activeSession;
				this.activeSession = new Session(time);
			} else {
				this.activeSession = null;
			}
		}
	}
	// Starts Stopwatch
	start() {
		// Creates a new session object using the Session class if there is currently no active session
		if (this.activeSession === null) {
			this.activeSession = new Session(null);
		}

		// Sets currentlyTiming state
		this.currentlyTiming = true;
		// Saves State to localStorage
		this.saveToLocalStorage();

		// Happens every second
		// Increases time (in session object), saves state to local storage
		this.interval = setInterval(() => {
			this.activeSession.increaseTime();
			this.saveToLocalStorage();
		}, 1000);

		// Updates all HTML elements to show stopwatch is currently timing
		timerViews.toggleTimerElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
	}

	// Pauses Stopwatch
	pause() {
		// Sets currentlyTiming state
		this.currentlyTiming = false;

		// Clears interval to stop time increasing every second
		clearInterval(this.interval);

		// Saves State to localStorage
		this.saveToLocalStorage();

		// Updates all HTML elements to show stopwatch is currently paused
		timerViews.toggleTimerElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
	}

	// Resets Stopwatch
	reset() {
		// Updates state to have no current session/time
		this.activeSession = null;
		this.selectedCourse = null;

		// Saves State to localStorage
		this.saveToLocalStorage();

		// Updates all HTML elements to show stopwatch has no session
		timerViews.toggleTimerElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
		// Resets Time HTML
		timerText.innerText = '00:00:00';
	}

	save() {
		// saveToDB method saves session to to DB
		this.saveToDB();
		// Resets Timer
		this.reset();
	}

	// Runs on every page load to update stopwatch from state
	onPageLoad() {
		// Updates all HTML elements to show stopwatch has no session
		timerViews.toggleTimerElements(
			this.currentlyTiming,
			this.activeSession,
			this.selectedCourse
		);
		if (this.currentlyTiming) {
			// Starts timer
			this.start();
		}
		if (this.activeSession) {
			// Updates Time in timer
			this.activeSession.updateTimerText();
		}
	}

	// Converts javascript object into JSON object, then saves to local storage to maintain state across different pages
	saveToLocalStorage() {
		// Creates object
		const timerState = {
			currentlyTiming : this.currentlyTiming,
			selectedCourse  : this.selectedCourse,
			activeSession   : this.activeSession
		};
		// Saves to localStorage as JSON
		window.localStorage.setItem('timerState', JSON.stringify(timerState));
	}

	// Saves session to DB
	saveToDB() {
		// Saves Session info to state
		this.sessionToDB = {
			course : this.selectedCourse,
			time   : this.activeSession.time,
			date   : new Date()
		};
		// Writes to DB
		global.createSession(this.sessionToDB);
	}

	// Updates Course that is currently selected
	updateSelectedCourse(selectedCourse) {
		this.selectedCourse = selectedCourse;
		this.saveToLocalStorage();
	}
}

export default Stopwatch;
