// Timer element variables
const toggleNavBtn = document.querySelector('#timer-toggle-btn');
const timerBackground = document.querySelector('.timer__background');
const timerCard = document.querySelector('.timer__card');
const timerCloseBtn = document.querySelector('.timer__close-btn');
const timerToggle = document.querySelector('.timer__toggle');
const timerToggleBlock = document.querySelector('.timer__toggle-block');
const timerToggleLeft = document.querySelector('#timer__toggle--left');
const timerToggleRight = document.querySelector('#timer__toggle--right');

timerToggle.addEventListener('click', e => {
	timerToggleBlock.classList.toggle('timer__toggle-block--right');
	timerToggleLeft.classList.toggle('timer__toggle-option--active');
	timerToggleRight.classList.toggle('timer__toggle-option--active');
});

// Timer btn event listener
toggleNavBtn.addEventListener('click', e => {
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
