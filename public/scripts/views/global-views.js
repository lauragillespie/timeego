//*****************************************************************************
// Global Views
//*****************************************************************************
//
// This file renders HTML elements for Timer pop-up and the main header. These
// are the global components used by our app.
// This functions are exported and called by the global controller and global
// model.
//
//*****************************************************************************

import helpers from './helpers-views.js';

// Grabs Timer Start, Pause and Reset Buttons
const stopwatchPlayBtn = document.querySelector('#stopwatch_play_btn');
const stopwatchPauseBtn = document.querySelector('#stopwatch_pause_btn');
const stopwatchResetBtn = document.querySelector('#stopwatch_reset_btn');
const stopwatchSaveBtn = document.querySelector('#stopwatch_save_btn');

// Grabs Nav Toggle Btn, Icons in Btn
const navToggleBtn = document.querySelector('#timer-toggle-btn');
const navToggleTimerIcon = document.querySelector('#toggle-btn-nav--timer');
const navTogglePauseIcon = document.querySelector('#toggle-btn-nav--pause');

// Currently Tracked Course in Timer Popup
const currentlyTrackingCourse = document.querySelector(
	'.currently-tracking-course'
);

// Renders HTML Elements for Timer Pop-up
export const timerViews = {
	//*****************************************************************************
	// Renders Course List in Timer pop up.
	//
	// Params: Array of Courses
	//*****************************************************************************
	renderCourseList    : function(arr) {
		// Gets Course list HTML element in timer pop up
		const courseList = document.querySelector('.course-list__list');

		// Filter our archived courses
		const arrayLength = arr.length;

		// If course array is empty, makes and appends message to course list
		if (arrayLength <= 0) {
			courseList.innerHTML = `<li class="list-group-item" style="border: none;">
			No Courses Currently Active
		</li>`;
		} else {
			// sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(arr);
			let listItems = '';
			// Loops through array of courses, makes a string with info for each course, then appends new string to listItems string
			sortedCourses.forEach(item => {
				listItems += `<li class="course-list__list-item list-group-item list-group-item-action" id="${item.id}">
					${item.name}
				</li>`;
			});
			// After the forEach loop has finished, listItems contains html for each course. listItems is then added to html
			courseList.innerHTML = listItems;
		}
	},
	//*****************************************************************************
	// Gets state from Stopwatch. Renders timer HTML elements accordingly.
	// Uses current state of Stopwatch, Session and selected course.
	//
	// Params:
	//		- currentlyTiming - is timer currently running?
	//		- activeSession - is time session in progress?
	//		- selectedCourse - currently selected course
	//*****************************************************************************
	toggleTimerElements : function(
		currentlyTiming,
		activeSession,
		selectedCourse
	) {
		// Currently Selected Course
		// If there is a currently selected course - sets name of course "Currently Tracking: ..." button
		// No currently selected course - Sets btn text to "None", removes Active class from previously selected course
		if (selectedCourse) {
			currentlyTrackingCourse.innerText = selectedCourse.name;
		} else {
			currentlyTrackingCourse.innerText = 'None';
			const selectedCourseList = document.querySelector(
				'.course-list__list-item--active'
			);
			if (selectedCourseList) {
				selectedCourseList.classList.remove(
					'course-list__list-item--active'
				);
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
};

// Renders HTML Elements For Header
export const headerViews = {
	//*****************************************************************************
	// Renders Course List in Timer pop up.
	//
	// Params: Logged in user data
	//*****************************************************************************
	renderName : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById(
			'header__username'
		).innerText = `Hi, ${firstName}`;
	}
};

/**************************************************************
* Helper File
* Used to update HTML elements related to Stopwatch. This includes:
* - Nav Stopwatch Button 
* - Stopwatch Play, pause and reset buttons
* - The currently selected course
*
**************************************************************/

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
	stopwatchSaveBtn.style.display = 'none';
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
		stopwatchSaveBtn.style.display = 'flex';
	} else {
		// If no session active, don't show stopwatch "Reset" button
		stopwatchResetBtn.style.display = 'none';
		stopwatchSaveBtn.style.display = 'none';
	}
}
