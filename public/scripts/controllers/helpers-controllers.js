//*****************************************************************************
// Controller Helpers
//*****************************************************************************
//
// This file contains helper functions for other controller files.
//
// These functions are used by multiple other files. Having them here and
// exporting them helps reduce clutter and code in other files.
//
//*****************************************************************************

const helpers = {
	//*****************************************************************************
	// Parses URL for course ID.
	//
	// Returns: Course ID
	//*****************************************************************************
	parseURL    : function() {
		// Parses Course ID from URL
		const urlString = window.location.href;
		const url = new URL(urlString);
		const courseID = url.searchParams.get('courseid');

		return courseID;
	},

	//*****************************************************************************
	// Sets On Click Events on course detail/edit tabs to redirect to correct
	// URL (containing course ID) when clicked
	//
	// Params: Course ID
	//*****************************************************************************
	setNavTabs  : function(courseID) {
		const detailsLink = document.getElementById('details_link');
		const editLink = document.getElementById('edit_link');

		const idString = 'courseid=' + courseID;

		// Adds Course ID to url when nav tabs are clicked
		detailsLink.addEventListener('click', function(e) {
			e.preventDefault();
			window.location.href = `./course-details.html?${idString}`;
		});
		editLink.addEventListener('click', function(e) {
			e.preventDefault();
			window.location.href = `./course-edit.html?${idString}`;
		});
	},

	//*****************************************************************************
	// Sets color picker background on load, changes active color when clicked
	//
	//*****************************************************************************
	colorPicker : function() {
		// Sets Color of each color
		$(document).ready(function() {
			var selector = '.color-list .color';
			$('.color').css('background', function() {
				return $(this).data('color');
			});

			$(selector).on('click', function() {
				$(selector).removeClass('active');
				$(this).addClass('active');
			});
		});

		// Toggles classes of active color for color selector
		$(document).ready(function() {
			var selector = '.color-list .color';
			$('.color').css('background', function() {
				return $(this).data('color');
			});

			$(selector).on('click', function() {
				$(selector).removeClass('active');
				$(this).addClass('active');
			});
		});
	}
};

export default helpers;
