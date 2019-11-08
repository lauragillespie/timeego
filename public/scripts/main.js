// Timer - Show/Hide

// Timer element variables
const toggleNavBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerCard = document.querySelector('.timer__card');
const timerCloseBtn = document.querySelector('.timer__close-btn');

// Timer btn event listener
toggleNavBtn.addEventListener('click', e => {
	timerBackground.classList.toggle('timer__background--active');
	timerCard.classList.toggle('timer__card--active');
	timerCloseBtn.classList.toggle('timer__close-btn--active');
});

// Timer background event listener
timerBackground.addEventListener('click', e => {
	closeTimer(e);
});

// Timer Close Btn event listener
timerCloseBtn.addEventListener('click', e => {
	closeTimer(e);
});

// Close Timer Function
function closeTimer(e) {
	timerBackground.classList.remove('timer__background--active');
	timerCard.classList.remove('timer__card--active');
	timerCloseBtn.classList.remove('timer__close-btn--active');
}

// Stopwatch/Timer Toggle Block
const timerToggle = document.querySelector('.timer__toggle');
const timerToggleBlock = document.querySelector('.timer__toggle-block');
const timerToggleLeft = document.querySelector('#timer__toggle--left');
const timerToggleRight = document.querySelector('#timer__toggle--right');
//Timer Spin
const cardd = document.querySelector('.cardd');

timerToggle.addEventListener('click', e => {
	timerToggleBlock.classList.toggle('timer__toggle-block--right');
	timerToggleLeft.classList.toggle('timer__toggle-option--active');
	timerToggleRight.classList.toggle('timer__toggle-option--active');
	cardd.classList.toggle('cardd-active');
});

// Stopwatch Btn Vars
import { stopwatchActive, stopwatchStart, stopwatchStop } from './stopwatch.js';

const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');

changeStopwatchButtons();

stopwatchPlayBtn.addEventListener('click', e => {
	stopwatchStart(e);
	changeStopwatchButtons();
});

stopwatchPauseBtn.addEventListener('click', e => {
	stopwatchStop(e);
	changeStopwatchButtons();
});

// Checks if stopwatch is active, hides play btn and shows pause btn
function changeStopwatchButtons() {
	if (stopwatchActive) {
		stopwatchPlayBtn.classList.add('hidden');
		stopwatchPauseBtn.classList.remove('hidden');
	} else {
		stopwatchPlayBtn.classList.remove('hidden');
		stopwatchPauseBtn.classList.add('hidden');
	}
}

[
	{
		name   : 'course 1',
		userId : 'Anthony'
	}
];
