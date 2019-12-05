//*****************************************************************************
// Course Archived Views
//*****************************************************************************
//
// This file renders HTML elements for the Course Archive page.
// This functions are exported and called by the Course Archive model.
//
//*****************************************************************************

import helpers from './helpers-views.js';

// Renders HTML Elements For Course Arhived
const courseArchivedViews = {
	//*****************************************************************************
	// Renders Course List on Course Archive page.
	//
	// Params: Array of Courses
	//*****************************************************************************
	renderCourseList : function(arr) {
		const courseList = document.getElementById('course__list');

		const arrayLength = arr.length;

		// If course array is empty, makes and appends message
		if (arrayLength <= 0) {
			const span = document.createElement('span');
			span.classList.add('course__list--no-courses');
			span.innerHTML =
				'<p>No Courses Currently Archived</p><p>Archiving courses keeps your sessions saved, but hides the course on other parts of Timeego.</p>';
			// Removes Spinner
			courseList.innerHTML = '';
			courseList.appendChild(span);
		} else {
			// sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(arr);
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

export default courseArchivedViews;
