
const currentPath = window.location.pathname;

// Writes to the database
import {readDB, writeDB} from './firebase/firebase.js';
	if (currentPath == "/course-home.html"){
		readDB.displayCourses();
	}
	if (currentPath == "/course-add.html") {
		writeDB.addCourse();
	}




/*** Timer Pop-Up ***/

// Grabs HTML elements needed to toggle timer pop-up
const toggleNavBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerPopup = document.querySelector('.timer__popup');
const timerCloseBtn = document.querySelector('.timer__close-btn');

// Timer Nav Button Event listener
// Opens Timer pop-up
toggleNavBtn.addEventListener('click', e => {
	openTimerPopUp(e);
	console.log(e);
});

// Dark Background Overlay Event listener
// Closes Timer pop-up
timerBackground.addEventListener('click', e => {
	closeTimerPopUp(e);
});

// Timer Close Button Event listener
// Closes Timer pop-up
timerCloseBtn.addEventListener('click', e => {
	closeTimerPopUp(e);
});

// Opens Timer pop-up
function openTimerPopUp(e) {
	timerBackground.classList.add('timer__background--active');
	timerPopup.classList.add('timer__popup--active');
	timerCloseBtn.classList.add('timer__close-btn--active');
}

// Closes Timer pop-up
function closeTimerPopUp(e) {
	timerBackground.classList.remove('timer__background--active');
	timerPopup.classList.remove('timer__popup--active');
	timerCloseBtn.classList.remove('timer__close-btn--active');
}

/*** Timer Pop-Up ENDS ***/

/*** Timer/Stopwatch Toggle ***/

// Grabs HTML elements needed to toggle timer/stopwatch option
const timerToggle = document.querySelector('.timer__toggle');
const timerToggleBlock = document.querySelector('.timer__toggle-block');
const timerToggleLeft = document.querySelector('#timer__toggle--left');
const timerToggleRight = document.querySelector('#timer__toggle--right');
// Timer card Spin-effect
const timeSection = document.querySelector('.timer__time-section');

// Timer/Stopwatch Toggle Event listener
// Shifts block to other side, spins timer
timerToggle.addEventListener('click', e => {
	timerToggleBlock.classList.toggle('timer__toggle-block--right');
	timerToggleLeft.classList.toggle('timer__toggle-option--active');
	timerToggleRight.classList.toggle('timer__toggle-option--active');
	timeSection.classList.toggle('timer__time-section--active');
});

/*** Timer/Stopwatch Toggle ENDS ***/

/*** Stopwatch Start/Pause Buttons Triggers ***/

// imports stopwatch logic functions from stopwatch.js
import { stopwatch } from './stopwatch.js';

// Grabs HTML elements needed to start, pause, reset stopwatch
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');

// Stopwatch start button Event listener
// Starts stopwatch
stopwatchPlayBtn.addEventListener('click', e => {
	stopwatch.start(e);
});

// Stopwatch pause button Event listener
// Pauses stopwatch
stopwatchPauseBtn.addEventListener('click', e => {
	stopwatch.stop(e);
});

// Stopwatch reset button Event listener
// Resets stopwatch
stopwatchResetBtn.addEventListener('click', e => {
	stopwatch.reset(e);
});

/*** Stopwatch Start/Pause Buttons Triggers ENDS ***/

/*** On Page Load... ***/

// Checks if saved time in local storage
const timeLocalStorage = JSON.parse(window.localStorage.getItem('time'));
// If saved time, sets timer to time from local storage
if (timeLocalStorage) {
	stopwatch.time = timeLocalStorage;
	stopwatch.updateTimerText();
}

// Checks if Timer is active from local storage
const activeSwLocal =
	JSON.parse(window.localStorage.getItem('stopwatchActive')) || false;
// If timer is active, sets variables, buttons and starts timer
// otherwise, just sets inactive buttons
if (activeSwLocal) {
	stopwatch.active = true;
	stopwatch.start();
	stopwatch.setButtonsActive();
} else {
	stopwatch.setButtonsInactive();
}

/***courses page change */
