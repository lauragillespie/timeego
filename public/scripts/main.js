// Timer element variables
const timerToggleBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerCard = document.querySelector('.timer__card');
const timerCloseBtn = document.querySelector('.timer__close-btn');
const timerToggle = document.querySelector('.timer__toggle');
const timerToggleBlock = document.querySelector('.timer__toggle-block');

timerToggle.addEventListener('click', e => {
	timerToggleBlock.classList.toggle('timer__toggle-block--right');
	if (timerToggleBlock.classList.contains('timer__toggle-block--right')) {
		timerToggleBlock.innerHTML = '<span>Timer</span>';
	} else {
		timerToggleBlock.innerHTML = '<span>Stopwatch</span>';
	}
});

// Timer btn event listener
timerToggleBtn.addEventListener('click', e => {
	timerBackground.classList.toggle('timer__background--active');
	timerCard.classList.toggle('timer__card--active');
	timerCloseBtn.classList.toggle('timer__close-btn--active');
});

// Timer background event listener
timerBackground.addEventListener('click', e => {
	closeTimer(e);
});

// Timer Close Btn event listener
timerCloseBtn.addEventListener('click', e => {
	closeTimer(e);
});

// Close Timer Function
function closeTimer(e) {
	timerBackground.classList.remove('timer__background--active');
	timerCard.classList.remove('timer__card--active');
	timerCloseBtn.classList.remove('timer__close-btn--active');
}
