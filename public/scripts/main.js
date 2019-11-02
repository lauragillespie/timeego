// Timer element variables
const timerToggleBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerContainer = document.querySelector('.timer__container');

// Timer btn event listener
timerToggleBtn.addEventListener('click', e => {
	timerBackground.classList.toggle('timer__background--active');
	timerContainer.classList.toggle('timer__container--active');
});

// Timer background event listener
timerBackground.addEventListener('click', e => {
	timerBackground.classList.remove('timer__background--active');
	timerContainer.classList.remove('timer__container--active');
});
