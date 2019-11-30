import helpers from './helpersViews.js';

// Renders HTML Elements for Timer Pop-up
export const timerViews = {
	// Params: Array of Courses
	// Renders: Course list in timer pop up
	renderCourseList : function(arr) {
		// Gets Course list in timer
		const courseList = document.querySelector('.course-list__list');

		const filteredCourses = helpers.filterCurrentCourses(arr);
		const arrayLength = filteredCourses;

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
	// Params: Logged in user data
	// Renders: Users first name in header
	renderName : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById(
			'header__username'
		).innerText = `Hi, ${firstName}`;
	}
};

// Renders HTML Elements For Course Home
export const courseHomeViews = {
	// Params: Array of Courses
	// Renders: Course list on course home page
	renderCourseList : function(arr) {
		const courseList = document.getElementById('course__list');
		// Filters out archived courses
		const filteredCourses = helpers.filterCurrentCourses(arr);

		const arrayLength = filteredCourses;
		// TODO: Render Course List into separate method(s)

		// If course array is empty, makes and appends message
		if (arrayLength <= 0) {
			const span = document.createElement('span');
			span.classList.add('course__list--no-courses');
			span.innerText = 'No Courses Currently Active';
			// Removes Spinner
			courseList.innerHTML = '';
			courseList.appendChild(span);
		} else {
			// sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(filteredCourses);
			// Removes Spinner
			courseList.innerHTML = '';
			sortedCourses.forEach(function(course) {
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
				courseContainer.setAttribute('class', 'courseContainer');

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
				courseColorDiv.setAttribute('class', 'courseColorDiv');
				// appends color div to course details link
				courseDetailsLink.appendChild(courseColorDiv);

				// this div will hold the course name + any other course info
				var courseData = document.createElement('div');
				courseDetailsLink.appendChild(courseData);
				courseData.setAttribute('class', 'courseDetails');

				// Creates, Sets classes and text and appends name and time HTML elements
				var nameElement = document.createElement('h3');
				var timeElement = document.createElement('span');
				nameElement.setAttribute('class', 'courseName');
				timeElement.setAttribute('class', 'courseTime');
				nameElement.innerText = courseName;
				timeElement.innerText = courseTime;
				courseData.appendChild(nameElement);
				courseData.appendChild(timeElement);

				// Attaches Finished Course Container to Parent Element
				courseList.appendChild(courseContainer);
			});
		}
	}
};

// Renders HTML Elements For Course Home
export const courseArchivedViews = {
	// Params: Array of Courses
	// Renders: Course list on course home page
	renderCourseList : function(arr) {
		const courseList = document.getElementById('course__list');
		// Filters out archived courses
		const filteredCourses = helpers.filterArchivedCourses(arr);

		const arrayLength = filteredCourses;
		// TODO: Render Course List into separate method(s)

		// If course array is empty, makes and appends message
		if (arrayLength <= 0) {
			const span = document.createElement('span');
			span.classList.add('course__list--no-courses');
			span.innerText = 'No Courses Currently Active';
			// Removes Spinner
			courseList.innerHTML = '';
			courseList.appendChild(span);
		} else {
			// sorts course array alphabetically
			const sortedCourses = helpers.sortCoursesByName(filteredCourses);
			// Removes Spinner
			courseList.innerHTML = '';
			sortedCourses.forEach(function(course) {
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
				courseContainer.setAttribute('class', 'courseContainer');

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
				courseColorDiv.setAttribute('class', 'courseColorDiv');
				// appends color div to course details link
				courseDetailsLink.appendChild(courseColorDiv);

				// this div will hold the course name + any other course info
				var courseData = document.createElement('div');
				courseDetailsLink.appendChild(courseData);
				courseData.setAttribute('class', 'courseDetails');

				// Creates, Sets classes and text and appends name and time HTML elements
				var nameElement = document.createElement('h3');
				var timeElement = document.createElement('span');
				nameElement.setAttribute('class', 'courseName');
				timeElement.setAttribute('class', 'courseTime');
				nameElement.innerText = courseName;
				timeElement.innerText = courseTime;
				courseData.appendChild(nameElement);
				courseData.appendChild(timeElement);

				// Attaches Finished Course Container to Parent Element
				courseList.appendChild(courseContainer);
			});
		}
	}
};
