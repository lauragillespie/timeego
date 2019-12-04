// Stopwatch Class
import Stopwatch from '../models/stopwatch.js';
// Global DB
import { global } from '../models/firebase.js';

/*******************************************************
 *    Initialize Stopwatch Object from Local storage   *
 ******************************************************/

// Gets Timer State from Local Storage
const timerStateFromLocalStorage = JSON.parse(
	window.localStorage.getItem('timerState')
);
// Creates stopwatch object from Stopwatch class, and passes in timerState from local storage as parameter. See timed.md for object structure.
// Object will either be the correct format, or null
const stopwatchObject = new Stopwatch(timerStateFromLocalStorage);
// Calls onPageLoad on stopwatch to set correct buttons, display correct time, update "currently tracking" course, and have timer running if needed. All this is determined by the stopwatch state which was set by passing in local storage info
stopwatchObject.onPageLoad();

/*** Done Initialing Stopwatch Object ***/

// Sets:
// -User's first name in Header
// -Course List in Timer Pop-up
global.readDB();

// Log out function
const logOutBtn = document.querySelector('#logout-btn');

logOutBtn.addEventListener('click', () => {
	global.logOut();
});

// TODO: Other Global DB Calls Goes here

/************************************************
 *            Grabbing HTML Elements            *
 ***********************************************/

// Grabs HTML elements needed to toggle timer pop-up
const toggleNavBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerPopup = document.querySelector('.timer__popup');
const timerCloseBtn = document.querySelector('.timer__close-btn');

// Grabs Timer Pop-up Sections
const popupTimeSection = document.querySelector('.popup__time-section');
const popupCourseSection = document.querySelector('.popup__course-list');

// Grabs Timer Time Section Elements - Used to scale them on course list expand
const timerText = document.querySelector('.timer__text');
const timerBtnContainer = document.querySelector('.timer__control-btns');

// Grabs HTML elements needed to start, pause, reset stopwatch
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');
const stopwatchSaveBtn = document.querySelector('#stopwatch_save_btn');

// Grabs course List List and "currently tracking" course span
const courseList = document.querySelector('.course-list__list');
const currentlyTrackingCourse = document.querySelector(
	'.currently-tracking-course'
);

// Grabs Course List Toggle Buttons
const closeCourseListBtn = document.querySelector('.course-list__btn--close');
const openCourseListBtn = document.querySelector('.course-list__btn--show');

/*** HTML Elements - DONE ***/

/************************************************
 *            Setting Event Listeners           *
 ***********************************************/

// Timer Nav Button Event listener
// Opens Timer pop-up
toggleNavBtn.addEventListener('click', openTimerPopUp);

// Dark Background Overlay Event listener
// Closes Timer pop-up
timerBackground.addEventListener('click', closeTimerPopUp);

// Timer Close Button Event listener
// Closes Timer pop-up
timerCloseBtn.addEventListener('click', closeTimerPopUp);

// Stopwatch Play, Pause and Reset button Event listeners
// Start Stopwatch
stopwatchPlayBtn.addEventListener('click', e => {
	stopwatchObject.start();
	// If stopwatchObject has no currently selectedCourse, select course select automatically expands
	if (stopwatchObject.selectedCourse === null) {
		expandCourseList();
	}
});
// Pauses stopwatch
stopwatchPauseBtn.addEventListener('click', e => {
	stopwatchObject.pause();
});
// Resets stopwatch
stopwatchResetBtn.addEventListener('click', e => {
	let response = confirm(
		'Are you sure you want to reset the Stopwatch without save?'
	);
	if (response) {
		stopwatchObject.reset();
	}
});

stopwatchSaveBtn.addEventListener('click', e => {
	stopwatchObject.save();
	// Saved Pop-up message when done is clicked
	document.querySelector('.done_saved').classList.add('done_saved_active');
	// Hides the saved pop-up after 3 seconds
	setTimeout(() => {
		document
			.querySelector('.done_saved')
			.classList.remove('done_saved_active');
	}, 3000);
});
// Timer Pop-up Course List Expand Btn/Close Btn
openCourseListBtn.addEventListener('click', expandCourseList);
closeCourseListBtn.addEventListener('click', shrinkCourseList);

// User clicks on course list in timer pop-up
courseList.addEventListener('click', e => {
	// Makes clicked course active, updates stopwatchObject's state with new selected course, shrinks courseList section
	courseListClicked(e);
});

/*** Event Listeners DONE ***/

/************************************************
 *            Setting Event Functions           *
 ***********************************************/

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

// Expands Timer Pop-up Course List
function expandCourseList() {
	// Sets classes + styles needed to expand course list and shrink time section of timer popup
	popupTimeSection.classList.remove('popup__time-section--expanded');
	popupCourseSection.classList.add('popup__course-list--expanded');
	timerBtnContainer.classList.add('timer__control-btns--small');
	timerText.classList.add('timer__text--small');
	openCourseListBtn.style.display = 'none';

	// Fires if stopwatch object has a selected course. Will sets the list item of that course to active, adding style
	if (stopwatchObject.selectedCourse) {
		const selectedCourseId = stopwatchObject.selectedCourse.id;
		document
			.getElementById(selectedCourseId)
			.classList.add('course-list__list-item--active');
	}
}
// Shrinks Timer Pop-up Course List
function shrinkCourseList() {
	// Sets classes + styles needed to shrink course list and expand time section of timer popup
	popupTimeSection.classList.add('popup__time-section--expanded');
	popupCourseSection.classList.remove('popup__course-list--expanded');
	timerBtnContainer.classList.remove('timer__control-btns--small');
	timerText.classList.remove('timer__text--small');
	openCourseListBtn.style.display = 'flex';
}

// When Timer pop-up course list is clicked, determines which course is clicked, sets that course active, updates stopwatchObject's state with new selected course, & shrinks courseList section
function courseListClicked(e) {
	let courseId;
	let courseName;
	let activeList;

	// this fires when the use clicks on a list item, sets variables from the clicked list item
	if (e.target.id) {
		courseId = e.target.id;
		courseName = e.target.innerText;
		activeList = e.target;
	}

	// grabs list item that is currently active
	let previouslyActive = document.querySelector(
		'.course-list__list-item--active'
	);
	// if previously active exists (ie not null), then it removes active class
	if (previouslyActive) {
		previouslyActive.classList.remove('course-list__list-item--active');
	}
	// adds active class to newly clicked list item
	activeList.classList.add('course-list__list-item--active');
	// adds course name to "now tracking" button
	currentlyTrackingCourse.innerText = courseName;
	// updates stopwatch object with new selected course info
	stopwatchObject.updateSelectedCourse({
		name : courseName,
		id   : courseId
	});
	// Finally, shrinks the course list (after a 75ms delay)
	setTimeout(() => {
		shrinkCourseList();
	}, 75);
}
