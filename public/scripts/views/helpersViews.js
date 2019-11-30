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
	}
};

export default helpers;
