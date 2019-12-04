//*****************************************************************************
// Course Details Views
//*****************************************************************************
//
// This file renders HTML elements the Course Details Page.
// This functions are exported and called by the course details model.
//
//*****************************************************************************

import helpers from './helpers-views.js';

const courseDetailsViews = {
	//*****************************************************************************
	// Renders Elements on course details page for specific course
	//
	// Params: course details, sessions array
	//*****************************************************************************
	renderDetails : function(sessions, name, color) {
		// Updates Course Name in Heading
		document.querySelector('#heading__course-name').innerText = name;
		// Updates color element to match course
		document.querySelector(
			'.course-details__color'
		).style.background = color;

		const sessionsDiv = document.querySelector('.sessions');
		// Sets message if there are no sessions for the course
		if (!sessions) {
			sessionsDiv.innerHTML =
				'<p style="text-align: center; margin: 70px 0;">No Sessions For This Course</p>';
		} else {
			// Sets session heading and list
			sessionsDiv.innerHTML = `<h3 class="course-details__session-heading">Recent Sessions</h3>
            <ul class="course-details__session-list list-group"></ul`;
			// Grabs session list HTML element
			const sessionList = document.querySelector(
				'.course-details__session-list'
			);
			// Reverses Session array, makes newest sessions appear at top
			sessions = sessions.reverse();
			// String to hold rendered html
			let sessionListItems = '';
			// Builds HTML element for each session
			sessions.forEach(session => {
				sessionListItems += buildSessionListItem(session);
			});
			// Attached sessions html to list
			sessionList.innerHTML = sessionListItems;
		}
	}
};

//*****************************************************************************
// Builds HTML element for each session in course.
//
// Params: session object
// Returns: HTML element of session
//*****************************************************************************
const buildSessionListItem = session => {
	const date = new Date(session.date.seconds * 1000);
	const dayString = date.toDateString().substring(4);

	const time = helpers.timeToString(session.time);

	return `<li class="list-group-item"><span class="session-list__time">${time}</span><span class="session-list__date">${dayString}</span></li>`;
};

export default courseDetailsViews;
