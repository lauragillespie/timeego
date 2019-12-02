/**************************************************************
* Helper File
* Used to update HTML elements related to Stopwatch. This includes:
* - Nav Stopwatch Button 
* - Stopwatch Play, pause and reset buttons
* - The currently selected course
*
**************************************************************/

// Grabs Timer Start, Pause and Reset Buttons
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');

// Grabs Nav Toggle Btn, Icons in Btn
const navToggleBtn = document.querySelector('#timer-toggle-btn');
const navToggleTimerIcon = document.querySelector('#toggle-btn-nav--timer');
const navTogglePauseIcon = document.querySelector('#toggle-btn-nav--pause');

// Currently Tracked Course in Timer Popup
const currentlyTrackingCourse = document.querySelector('.currently-tracking-course');

/**************************************************************
* Gets state from Stopwatch. Sets HTML elements accordingly
*
* Params:
*  - currentlyTiming - is timer currently running?
*  - activeSession - is time session in progress?
*  - selectedCourse - currently selected course
*
**************************************************************/
// Checks state of Stopwatch, Session and selected course. Sets HTML elements accordingly
function updateTimerPopupElements(currentlyTiming, activeSession, selectedCourse) {
	// Currently Selected Course
	// If there is a currently selected course - sets name of course "Currently Tracking: ..." button
	// No currently selected course - Sets btn text to "None", removes Active class from previously selected course
	if (selectedCourse) {
		currentlyTrackingCourse.innerText = selectedCourse.name;
	} else {
		currentlyTrackingCourse.innerText = 'None';
		const selectedCourseList = document.querySelector('.course-list__list-item--active');
		if (selectedCourseList) {
			selectedCourseList.classList.remove('course-list__list-item--active');
		}
	}

	if (currentlyTiming) {
		// If currently time, sets HTML elements to be active
		setElementsActive();
	} else {
		/// If not currently time, sets HTML elements to be inactive
		setElementsInactive(activeSession);
	}
}
// When Stopwatch is currently timing...
function setElementsActive() {
	// Adds class to animate nav timer pop-up button
	navToggleBtn.classList.add('timer-toggle-btn--timing');
	// Displays "Pause" icon in nav timer pop-up button
	navToggleTimerIcon.style.display = 'none';
	navTogglePauseIcon.style.display = 'block';
	// Shows only stopwatch "Pause" button
	stopwatchPlayBtn.style.display = 'none';
	stopwatchPauseBtn.style.display = 'flex';
	stopwatchResetBtn.style.display = 'none';
}
// When Stopwatch is NOT currently timing...
function setElementsInactive(activeSession) {
	// Removes class to Stop animation of nav timer pop-up button
	navToggleBtn.classList.remove('timer-toggle-btn--timing');
	// Displays "Timer" icon in nav timer pop-up button
	stopwatchPlayBtn.style.display = 'flex';
	stopwatchPauseBtn.style.display = 'none';
	// Shows stopwatch "Play" button and...
	navToggleTimerIcon.style.display = 'block';
	navTogglePauseIcon.style.display = 'none';
	// ...Checks to see if there is an active session
	if (activeSession) {
		// If session is active, also show stopwatch "Reset" button
		stopwatchResetBtn.style.display = 'flex';
	} else {
		// If no session active, don't show stopwatch "Reset" button
		stopwatchResetBtn.style.display = 'none';
	}
}

export default updateTimerPopupElements;
