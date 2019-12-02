const graphColors = [
	'#3127ca'
];
// Default Colors
// ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

// Days of Week as Strings
const daysOfWeek = {
	1 : 'Mon',
	2 : 'Tue',
	3 : 'Wed',
	4 : 'Thu',
	5 : 'Fri',
	6 : 'Sat',
	7 : 'Sun'
};

// Returns an Array of Strings with last 7 days of week
const getDaysOrder = () => {
	const daysArray = [];
	// Gets Current Day
	const today = new Date().getDay();

	for (let count = 1; count <= 7; count++) {
		const day = today + count;
		if (day < 8) {
			daysArray.push(daysOfWeek[day]);
		} else {
			daysArray.push(daysOfWeek[day - 7]);
		}
	}
	return daysArray;
};

// Array of Strings with last 7 days of week, passed in to graph render
const daysArray = getDaysOrder();

const graphOptions = {
	chart       : {
		type       : 'bar',
		toolbar    : {
			show : false
		},
		dropShadow : {
			enabled : true,
			top     : 2,
			left    : 2,
			blur    : 4,
			opacity : 0.15
		}
	},
	colors      : graphColors,
	plotOptions : {
		bar : {
			columnWidth : '50%',
			distributed : true
		}
	},
	dataLabels  : {
		enabled : false
	},
	series      : [
		{
			name : 'Minutes'
			// This is the study time, set by views form db
			// data : [
			// 	30,
			// 	40,
			// 	70,
			// 	35,
			// 	50,
			// 	49,
			// 	90
			// ]
		}
	],
	xaxis       : {
		categories : daysArray,
		labels     : {
			style : {
				fontSize : '14px'
			}
		}
	},
	yaxis       : {
		title : {
			text : 'Minutes Studied'
		}
	},
	tooltip     : {
		enabled : false
	},
	states      : {
		hover : {
			filter : {
				type : 'none'
			}
		}
	}
};

export default graphOptions;
