// Renders HTML Elements for Timer Pop-up
export const timerViews = {
	renderCourseList : function(arr) {
		const courseList = document.querySelector('.course-list__list');
		// Sorts courses by name using helper function
		const sortedCourses = helpers.sortCoursesByName(arr);

		sortedCourses.forEach(item => {
			const listItem = document.createElement('li');
			listItem.innerText = item.name;
			courseList.appendChild(listItem);
		});
	}
};

// Renders HTML Elements For Header
export const headerViews = {
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
	renderHeading : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById('page-heading__username').innerText = firstName;
	}
};

// Functions used by multiple views
const helpers = {
	// Params: User data
	// Returns: User's capitalized first name
	getFirstName      : function(currentUser) {
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
	sortCoursesByName : function(coursesArr) {
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
	}
};
