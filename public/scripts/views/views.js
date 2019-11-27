import graphOptions from '../config/graphConfig.js';

// Renders HTML Elements for Timer Pop-up
export const timerViews = {
	// Params: Array of Courses
	// Renders: Course list in timer pop up
	renderCourseList : function(arr) {
		const courseList = document.querySelector('.course-list__list');
		// Sorts courses by name using helper function
		const sortedCourses = helpers.sortCoursesByName(arr);
		// Makes empty string
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

// Renders HTML Elements For Dashboard
export const dashboardViews = {
	// Params: Logged in user data
	// Renders: Users first name in dashboard page heading
	renderHeading : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById('page-heading__username').innerText = firstName;
	},
	// Params: ......
	// Renders: Graph on Dashboard
	renderGraph   : function() {
		// Place holder data. This should set the time spend studying for last 7 days getting the data from the db
		graphOptions.series[0].data = [
			10,
			20,
			30,
			60,
			50,
			90,
			60
		];

		var chart = new ApexCharts(
			document.querySelector('#chart'),
			graphOptions
		);

		chart.render();
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
				// Placeholder - need to get from DB
				const courseTime = '12:34:55';

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

// Functions used by multiple views
const helpers = {
	// Params: User data
	// Returns: User's capitalized first name
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
	}
};
