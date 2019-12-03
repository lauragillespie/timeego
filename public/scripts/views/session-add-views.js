//*****************************************************************************
// Session Add Views
//*****************************************************************************
//
// This file renders HTML elements the Session Add Page.
// This functions are exported and called by the session add model.
//
//*****************************************************************************
import helpers from './helpers-views.js';

// Renders HTML Elements For Session Add Page
const sessionAddViews = {
	//*****************************************************************************
	// Renders Course select options on Add session page.
	//
	// Params: Array of Courses
	//*****************************************************************************
	renderCourseSelect : function(arr) {
		const sessionCourses = document.querySelector('#session--course');
		// Filters out Active courses
		const filteredCourses = helpers.filterArchivedCourses(arr);

		const arrayLength = filteredCourses.length;
		// If course array is empty, makes and appends option with message
		if (arrayLength <= 0) {
			sessionCourses.innerHTML =
				'<option selected disabled>No Active Courses</option>';
		} else {
			// sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(filteredCourses);
			let optionStr = '<option selected disabled>Select Course</option>';
			// Loops through course array, builds Course option and appends to course select
			sortedCourses.forEach(course => {
				optionStr += `<option value="${course.id}">${course.name}</option>`;
			});
			sessionCourses.innerHTML = optionStr;
		}
	}
};

export default sessionAddViews;
