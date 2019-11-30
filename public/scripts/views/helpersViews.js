//*****************************************************************************
// Helper Views
// This file contains helper functions for other views files.
// These functions are used by multiple other files. Having them here and
// exporting them helps reduce clutter and code in other files.
//*****************************************************************************

const helpers = {
	//*****************************************************************************
	// Take user data, pulls out and formats first name.
	//
	// Params: User data
	// Returns: User's capitalized first name
	//*****************************************************************************
	getFirstName          : function(currentUser) {
		// Current User's full name
		const name = currentUser.name;
		// First letter to upper case
		const upperCaseName = name[0].toUpperCase() + name.substring(1);
		// Splits name at first space
		const firstName = upperCaseName.split(' ')[0];
		return firstName;
	},
	// Params: Courses Array
	// Returns: Course Array sorted by name
	sortCoursesByName     : function(coursesArr) {
		// sorts courses by name
		coursesArr.sort((a, b) => {
			var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			// names must be equal
			return 0;
		});
		return coursesArr;
	},
	// Params: Courses Array
	// Returns: Only Current Courses Array (filters out archived courses)
	filterCurrentCourses  : function(coursesArr) {
		// Array of only current courses by filtering course array
		const filtered = coursesArr.filter(course => {
			// Checks if course is archived (Boolean)
			const archived = course.archived;
			// returns True if not archived, false if archived
			return !archived;
		});
		return filtered;
	},
	// Params: Courses Array
	// Returns: Only Archived Courses Array (filters out current courses)
	filterArchivedCourses : function(coursesArr) {
		// Array of only current courses by filtering course array
		const filtered = coursesArr.filter(course => {
			// Checks if course is archived (Boolean)
			const archived = course.archived;
			// returns true if archived, false if not archived
			return archived;
		});
		return filtered;
	},
	// Params: Array of sessions
	// Returns: Total time of all sessions in seconds, minutes and hours
	totalCourseTime       : function(sessArr) {
		let totalSeconds = 0;
		let totalMinutes = 0;
		let totalHours = 0;
		// Loops through each session ands time to total time
		sessArr.forEach(session => {
			const { seconds, minutes, hours } = session.time;
			totalSeconds += seconds;
			totalMinutes += minutes;
			totalHours += hours;
		});

		// Balances seconds and minutes to max of 59
		while (totalSeconds >= 60) {
			totalMinutes++;
			totalSeconds -= 60;
		}
		while (totalMinutes >= 60) {
			totalHours++;
			totalMinutes -= 60;
		}
		// Returns total time
		return {
			seconds : totalSeconds,
			minutes : totalMinutes,
			hours   : totalHours
		};
	},
	// Converts time (numbers) into strings with leading 0's and :'s as needed
	// Params: Takes Time Object (with seconds, minutes and hours)
	// Returns: time as formatted string
	timeToString          : function(time) {
		const { seconds, minutes, hours } = time;
		let hrs;
		let mins;
		let secs;
		if (hours < 10) {
			hrs = '0' + hours;
		} else {
			hrs = hours;
		}
		if (minutes < 10) {
			mins = '0' + minutes;
		} else {
			mins = minutes;
		}
		if (seconds < 10) {
			secs = '0' + seconds;
		} else {
			secs = seconds;
		}
		return `${hrs}:${mins}:${secs}`;
	},

	buildCourseListItem   : function(course) {
		// Course Variables from course param in forEach loop
		const courseId = course.id;
		const courseColor = course.color;
		const courseName = course.name;

		let totalCourseTime = null;
		// If current course has sessions, gets total course time
		if (course.sessions) {
			totalCourseTime = helpers.totalCourseTime(course.sessions);
		}
		// If current course has sessions, gets string of total time to display
		// in course list. Otherwise, display message.
		const courseTime = totalCourseTime
			? helpers.timeToString(totalCourseTime)
			: 'No Logged Sessions';

		// Creates main course container
		const courseContainer = document.createElement('div');
		courseContainer.classList.add('courseContainer');

		// Links to go to course details and settings pages
		const courseDetailsLink = document.createElement('a');
		const courseSettingsLink = document.createElement('a');
		courseDetailsLink.setAttribute(
			'href',
			`./course-details.html?courseid=${courseId}`
		);
		courseSettingsLink.setAttribute(
			'href',
			`./course-edit.html?courseid=${courseId}`
		);
		courseDetailsLink.classList.add('courseDetailsLink');
		courseSettingsLink.classList.add('courseSettingsLink');
		courseSettingsLink.innerHTML =
			'<i class="material-icons">more_vert</i>';
		courseContainer.appendChild(courseDetailsLink);
		courseContainer.appendChild(courseSettingsLink);

		// Div for course color
		var courseColorDiv = document.createElement('div');
		// assigns the course color
		courseColorDiv.style.backgroundColor = courseColor;
		courseColorDiv.classList.add('courseColorDiv');
		// appends color div to course details link
		courseDetailsLink.appendChild(courseColorDiv);

		// this div will hold the course name + any other course info
		var courseData = document.createElement('div');
		courseDetailsLink.appendChild(courseData);
		courseData.classList.add('courseDetails');

		// Creates, Sets classes and text and appends name and time HTML elements
		var nameElement = document.createElement('h3');
		var timeElement = document.createElement('span');
		nameElement.classList.add('courseName');
		timeElement.classList.add('courseTime');
		nameElement.innerText = courseName;
		timeElement.innerText = courseTime;
		courseData.appendChild(nameElement);
		courseData.appendChild(timeElement);

		// Returns Finished Course List Item
		return courseContainer;
	}
};

export default helpers;
