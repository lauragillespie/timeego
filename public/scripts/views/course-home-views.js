//*****************************************************************************
// Course Home Views
//*****************************************************************************
//
// This file renders HTML elements for the Course Home page.
// This functions are exported and called by the Course Home model.
//
//*****************************************************************************

import helpers from './helpers-views.js';

// Renders HTML Elements For Course Home
const courseHomeViews = {
	//*****************************************************************************
	// Renders Course List on Course Home page.
	//
	// Params: Array of Courses
	//*****************************************************************************
	renderCourseList : function(arr) {
		const courseList = document.getElementById('course__list');
		// Filters out Archived courses
		const filteredCourses = helpers.filterCurrentCourses(arr);

		const arrayLength = filteredCourses.length;

		// If course array is empty, makes and appends message
		if (arrayLength <= 0) {
			const span = document.createElement('span');
			span.classList.add('course__list--no-courses');
			span.innerText = 'No Courses Currently Active';
			// Removes Spinner
			courseList.innerHTML = '';
			courseList.appendChild(span);
		} else {
			// Sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(filteredCourses);
			// Removes Spinner
			courseList.innerHTML = '';
			// Loops through course array, builds HTML element and appends to course list
			sortedCourses.forEach(course => {
				// Attaches Finished Course List Item to Parent Element
				courseList.appendChild(helpers.buildCourseListItem(course));
			});
		}
	}
};

export default courseHomeViews;
