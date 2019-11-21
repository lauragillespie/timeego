import Stopwatch from './Stopwatch.js';

/*** Timer Pop-Up ***/

// Grabs HTML elements needed to toggle timer pop-up
const toggleNavBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerPopup = document.querySelector('.timer__popup');
const timerCloseBtn = document.querySelector('.timer__close-btn');

// Grabs HTML elements needed to start, pause, reset stopwatch
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');

// Course List BTNS + Sections
const closeCourseListBtn = document.querySelector('.course-list__btn--close');
const openCourseListBtn = document.querySelector('.course-list__btn--show');
const popupTimeSection = document.querySelector('.popup__time-section');
const popupCourseSection = document.querySelector('.popup__course-list');
// Timer Button Container
const timerBtnContainer = document.querySelector('.timer__control-btns');
const timerText = document.querySelector('.timer__text');

export function timerListeners() {
	// const exampleTimerStateObject = {
	// 	currentlyTiming : false,
	// 	activeSession   : {
	// 		courseName : 'Comp',
	// 		time       : {
	// 			seconds : 40,
	// 			minutes : 2,
	// 			hours   : 0
	// 		},
	// 		sessionId  : 'af8f3034fg4h543'
	// 	}
	// };

	// Gets Timer State from Local Storage
	const timerStateFromLocalStorage = JSON.parse(
		window.localStorage.getItem('timerState')
	);

	// Creates stopwatch object from Stopwatch class, passes in timer state as parameter
	const stopwatchObject = new Stopwatch(timerStateFromLocalStorage);

	// Calls onPageLoad on stopwatch to set correct buttons, display correct time, and have timer running if needed
	stopwatchObject.onPageLoad();

	// Course List Stuff
	openCourseListBtn.addEventListener('click', e => {
		popupTimeSection.classList.remove('popup__time-section--expanded');
		popupCourseSection.classList.add('popup__course-list--expanded');
		timerBtnContainer.classList.add('timer__control-btns--small');
		timerText.classList.add('timer__text--small');
		openCourseListBtn.style.display = 'none';
	});

	closeCourseListBtn.addEventListener('click', e => {
		popupTimeSection.classList.add('popup__time-section--expanded');
		popupCourseSection.classList.remove('popup__course-list--expanded');
		timerBtnContainer.classList.remove('timer__control-btns--small');
		timerText.classList.remove('timer__text--small');
		openCourseListBtn.style.display = 'flex';
	});

	// Course List Stuff Ends

	// Timer Nav Button Event listener
	// Opens Timer pop-up
	toggleNavBtn.addEventListener('click', () => {
		openTimerPopUp();
	});

	// Dark Background Overlay Event listener
	// Closes Timer pop-up
	timerBackground.addEventListener('click', () => {
		closeTimerPopUp();
	});

	// Timer Close Button Event listener
	// Closes Timer pop-up
	timerCloseBtn.addEventListener('click', () => {
		closeTimerPopUp();
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

	/*** Stopwatch Start/Pause Buttons Triggers ***/

	// Stopwatch start button Event listener
	// Starts stopwatch
	stopwatchPlayBtn.addEventListener('click', e => {
		stopwatchObject.start(e);
	});

	// Stopwatch pause button Event listener
	// Pauses stopwatch
	stopwatchPauseBtn.addEventListener('click', e => {
		stopwatchObject.pause(e);
	});

	// Stopwatch reset button Event listener
	// Resets stopwatch
	stopwatchResetBtn.addEventListener('click', e => {
		stopwatchObject.reset(e);
	});

	/*** Stopwatch Start/Pause Buttons Triggers ENDS ***/
}
