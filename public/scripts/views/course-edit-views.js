//*****************************************************************************
// Course Edit Views
//*****************************************************************************
//
// This file renders HTML elements the Course Edit Page.
// This functions are exported and called by the course edit model.
//
//*****************************************************************************

const courseEditViews = {
	//*****************************************************************************
	// Renders Elements on course edit page for specific course
	//
	// Params: course details, sessions array
	//*****************************************************************************
	renderDetails : function(name, color) {
		// Updates Course Name in Heading
		document.querySelector('#heading__course-name').innerText = name;
		// Updates color element to match course
		document.querySelector(
			'.course-details__color'
		).style.background = color;
	},

	//*****************************************************************************
	// Fills edit form with Course's current name, color and archived status
	//
	// Params: course name, color and archived status
	//*****************************************************************************
	fillForm      : function(name, color, archived) {
		// Gets form elements, course name, color and archived checkbox
		const courseName = document.getElementById('course_name');
		const courseColorInput = document.getElementById(`color-${color}`);
		const courseColorListItem = document.querySelector(
			`[data-color='${color}']`
		);
		const archiveCourse = document.getElementById('archive_course');

		// Sets form elements with existing data from database
		courseName.value = name;
		courseColorInput.checked = true;
		courseColorListItem.classList.add('active');
		archiveCourse.checked = archived;
	}
};

//*****************************************************************************
// Builds HTML element for each session in course.
//
// Params: session object
// Returns: HTML element of session
//*****************************************************************************

export default courseEditViews;
