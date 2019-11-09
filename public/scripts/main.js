/*** Timer Pop-Up ***/

// Grabs HTML elements needed to toggle timer pop-up
const toggleNavBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerCard = document.querySelector('.timer__card');
const timerCloseBtn = document.querySelector('.timer__close-btn');

// Timer Nav Button Event listener
// Opens Timer pop-up
toggleNavBtn.addEventListener('click', e => {
	openTimerPopUp(e);
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
	timerCard.classList.add('timer__card--active');
	timerCloseBtn.classList.add('timer__close-btn--active');
}

// Closes Timer pop-up
function closeTimerPopUp(e) {
	timerBackground.classList.remove('timer__background--active');
	timerCard.classList.remove('timer__card--active');
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
const cardd = document.querySelector('.cardd');

// Timer/Stopwatch Toggle Event listener
// Shifts block to other side, spins timer
timerToggle.addEventListener('click', e => {
	timerToggleBlock.classList.toggle('timer__toggle-block--right');
	timerToggleLeft.classList.toggle('timer__toggle-option--active');
	timerToggleRight.classList.toggle('timer__toggle-option--active');
	cardd.classList.toggle('cardd-active');
});

/*** Timer/Stopwatch Toggle ENDS ***/

/*** Stopwatch Start/Pause Buttons Triggers ***/

// imports stopwatch logic functions from stopwatch.js
import { stopwatchActive, stopwatchStart, stopwatchStop } from './stopwatch.js';

// Grabs HTML elements needed to start, pause, reset stopwatch
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');

// Stopwatch start button Event listener
// Starts stopwatch
stopwatchPlayBtn.addEventListener('click', e => {
	stopwatchStart(e);
	changeStopwatchButtons();
});

// Stopwatch pause button Event listener
// Pauses stopwatch
stopwatchPauseBtn.addEventListener('click', e => {
	stopwatchStop(e);
	changeStopwatchButtons();
});

// Checks if stopwatch is active
// Controls which buttons are shown/hidden
function changeStopwatchButtons() {
	if (stopwatchActive) {
		stopwatchPlayBtn.classList.add('hidden');
		stopwatchPauseBtn.classList.remove('hidden');
	} else {
		stopwatchPlayBtn.classList.remove('hidden');
		stopwatchPauseBtn.classList.add('hidden');
	}
}

/*** Stopwatch Start/Pause Buttons Triggers ENDS ***/
