const courseList = document.querySelector('.course-list__list');

export const timerViews = {
	renderCourseList : function(arr) {
		arr.forEach(item => {
			const listItem = document.createElement('li');
			listItem.innerText = item.name;
			courseList.appendChild(listItem);
		});
	}
};

export const headerViews = {};
