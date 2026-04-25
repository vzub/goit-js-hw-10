import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let selectedDate = null;
let timerId = null;

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

startBtn.disabled = true;

// flatpickr
flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
  },
});

// запуск таймера
startBtn.addEventListener('click', () => {
  if (!selectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const diff = selectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
      updateUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    updateUI(convertMs(diff));
  }, 1000);
});

// оновлення DOM
function updateUI({ days, hours, minutes, seconds }) {
  daysEl.textContent = format(days);
  hoursEl.textContent = format(hours);
  minutesEl.textContent = format(minutes);
  secondsEl.textContent = format(seconds);
}

function format(value) {
  return String(value).padStart(2, '0');
}
    
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}







