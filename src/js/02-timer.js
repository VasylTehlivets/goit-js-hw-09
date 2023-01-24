import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDateTime = document.querySelector('#datetime-picker');
const startTimer = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

const currentTime = Date.now();
startTimer.disabled = true;
let selectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please, choose date in future!');
    } else {
      startTimer.disabled = false;
      Notiflix.Notify.success('Your date has been accepted');
      selectedDate = selectedDates[0];
    }
  },
};

startTimer.addEventListener('click', onStartTimerClick);

function onStartTimerClick() {
  Notiflix.Notify.success('Your timer is running');
  startTimer.disabled = true;
  let deltaTime = selectedDate - currentTime;

  intervalId = setInterval(() => {
    deltaTime -= 1000;
    if (deltaTime < 0) {
      Notiflix.Notify.success('Your timer is stoping');
      clearInterval(intervalId);
      return;
    }
    const convertedTime = convertMs(deltaTime);
    daysCounter.textContent = convertedTime.days;
    hoursCounter.textContent = convertedTime.hours;
    minutesCounter.textContent = convertedTime.minutes;
    secondsCounter.textContent = convertedTime.seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

flatpickr(inputDateTime, options);
