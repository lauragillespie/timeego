//*****************************************************************************
// Dashboard Views
//*****************************************************************************
//
// This file renders HTML elements for the Dashboard page.
// This functions are exported and called by the Dashboard controller or
// the Dashboard model.
//
//*****************************************************************************

import graphOptions from '../config/graphConfig.js';
import helpers from './helpers-views.js';

// Renders HTML Elements For Dashboard
const dashboardViews = {
	//*****************************************************************************
	// Renders The users first name in the dashboard page heading.
	//
	// Params: Logged in user data
	//*****************************************************************************
	renderHeading : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById('page-heading__username').innerText = firstName;
	},

	//*****************************************************************************
	// Renders Graph or Welcome message on Dashboard page.
	//
	// Params: Array of sessions
	//*****************************************************************************
	renderGraph   : function(sessionsArr) {
		// Gets required HTML elements
		const chartElement = document.querySelector('#chart');
		const chartHeading = document.querySelector('.graph__heading');

		// Converts session into an array of the total study time
		// for each of the last 7 days
		const times = calculateGraphTimes(sessionsArr);

		// Reduces All 7 days in array into a total time
		const totalMinutes = times.reduce((total, curVal) => total + curVal);

		// If there has been no study sessions in the last 7 minutes, displays a welcome message for the user. Otherwise graph is rendered.
		if (totalMinutes === 0) {
			chartHeading.innerText = 'Welcome to Timeego!';
			chartElement.innerHTML = `<p>Yo! This is a dope study app.</p><p>Click that timer button at the bottom of your screen to get going.</p>`;
		} else {
			// Sets graph data to be sorted session array
			graphOptions.series[0].data = times;
			// Makes a new chart object
			const chart = new ApexCharts(chartElement, graphOptions);
			// Hides Graph Loading Spinner
			chartElement.innerHTML = '';
			// calls render method of chart object, displays chart
			chart.render();
		}
	},

	//*****************************************************************************
	// Renders The current study streak on Dashboard page.
	//
	// Params: Array of sessions
	//*****************************************************************************
	currentStreak : function(sessionsArr) {
		const studyStreak = document.querySelector('#study_streak');
		// Gets a set of all days where a study session was logged.
		// See getStudyDataSet function below for more info about sets.
		const dateSet = getStudyDateSet(sessionsArr);

		// Gets current day as a Unix day.
		const today = convertUnixDay(new Date().getTime());

		// Streak variable. If user has studied today, it starts at 1. Otherwise it starts at 0.
		let streak = dateSet.has(today) ? 1 : 0;

		// Loop starts at yesterday. Checks if the current date is in the set (meaning the user logged a session). Continues until no session are found for that day.
		for (let day = today - 1; dateSet.has(day); day--) {
			// If the user logged a session, the streak is incremented
			streak++;
		}

		// Sets streak message based on streak length.
		if (streak === 0) {
			studyStreak.innerText = 'Start a Streak!';
		} else if (streak === 1) {
			studyStreak.innerText = `${streak} Day`;
		} else {
			studyStreak.innerText = `${streak} Days`;
		}
	}
};

//*****************************************************************************
// Calculates total time of study sessions in the last 7 days
//
// Params: array of all study sessions
// Returns: array of total study time in each of the last 7 days
//*****************************************************************************
const calculateGraphTimes = sessionsArr => {
	// Get today as a unix day (Days since Jan 1st, 1970)
	const today = convertUnixDay(new Date().getTime());
	// Gets first date on graph (6 days ago).
	const minDate = today - 6;

	// Creates an array with 0 for each day on graph
	const sessionTimes = [
		0,
		0,
		0,
		0,
		0,
		0,
		0
	];

	// Loops through each session in the sessionsArr
	sessionsArr.forEach(session => {
		// Gets date of the session as a unix date
		const unixDate = convertUnixDay(session.date.getTime());
		// Checks if date of this session is within graph range
		if (unixDate >= minDate && unixDate <= today) {
			// Uses destructuring to pull out seconds, minutes and hours
			const { seconds, minutes, hours } = session.time;
			// adds number of minutes to appropriate index of sessionTimes array
			sessionTimes[unixDate - minDate] +=
				seconds / 60 + minutes + hours * 60;
		}
	});

	// Loops through sessionTime array and rounds every index up to the nearest whole minute
	return sessionTimes.map(session => {
		return Math.ceil(session);
	});
};

//*****************************************************************************
// Reduces all study sessions to a list of dates that studying happened.
//
// Params: Array of all study sessions
// Returns: A set of days that studying happened
//          A set is like an array, but with no duplicate data.
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
//*****************************************************************************
const getStudyDateSet = sessionsArr => {
	// Converts sessions to an array of just the date the session occurred (as Unix days).
	const dateArray = sessionsArr.map(session => {
		return convertUnixDay(session.date.getTime());
	});
	// Convert date Array into a set (like an array, but automatically removes all duplicate days)
	return new Set(dateArray.sort());
};

//*****************************************************************************
// Converts passed in day to Unix day in PST.
// Using Unix days makes it much easier to track streaks and sort days. Since
// we don't need to worry about months and years.
//
// Params: The date to convert in ms since Jan 1st, 1970.
// Returns: The date as a unix day (Days since Jan 1st, 1970).
//*****************************************************************************
const convertUnixDay = dateInMs => {
	// number of MS in one day
	const msPerDay = 86400000;
	// Time difference ratio between UTC and PST
	const timeZoneDiff = 8 / 24;
	// Converts passed in MS by MS in a day, subtracts timezone difference and rounds down to get current day.
	return Math.floor(dateInMs / msPerDay - timeZoneDiff);
};

export default dashboardViews;
