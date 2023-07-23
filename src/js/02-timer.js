import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
refs.start.disabled = true; // початковий стан кнопки - вимкнено

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedTime = selectedDates[0];

    if (selectedTime <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      refs.start.disabled = true;
    } else {
      refs.start.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

refs.start.addEventListener('click', onStartTimer);

function onStartTimer() {
  refs.start.disabled = true;
  setTheInterval();
}
function setTheInterval() {
  intervalId = setInterval(() => {
    const choosenDate = new Date(refs.input.value);
    const deltaTime = choosenDate - Date.now();

    if (deltaTime < 0) {
      clearInterval(intervalId);
      refs.input.disabled = false;
      return Notiflix.Notify.success('Time is up');
    }
    const result = convertMs(deltaTime);
    updateClockFace(result);
  }, 1000);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
