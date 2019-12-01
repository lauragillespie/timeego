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

import helpers from './helpersViews.js';

// Renders HTML Elements for Timer Pop-up
export const timerViews = {
	//*****************************************************************************
	// Renders Course List in Timer pop up.
	//
	// Params: Array of Courses
	//*****************************************************************************
	renderCourseList : function(arr) {
		// Gets Course list HTML element in timer pop up
		const courseList = document.querySelector('.course-list__list');

		// Filter our archived courses
		const filteredCourses = helpers.filterCurrentCourses(arr);
		const arrayLength = filteredCourses.length;

		// If course array is empty, makes and appends message to course list
		if (arrayLength <= 0) {
			courseList.innerHTML = `<li class="list-group-item" style="border: none;">
			No Courses Currently Active
		</li>`;
		} else {
			// sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(filteredCourses);
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
