// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector("button");
btn.disabled = true;

const daysLeft = document.querySelector("[data-days]");
const hoursLeft = document.querySelector("[data-hours]");
const minutesLeft = document.querySelector("[data-minutes]");
const secondsLeft = document.querySelector("[data-seconds]");

let deltaTime = null;
let currentDate = null;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates = selectedDates[0];
    const currentDate = new Date();

    if (selectedDates < currentDate) {
      userSelectedDate = null;
      btn.disabled = true;

      iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    } else {
      userSelectedDate = selectedDates;
      console.log("Обрана дата:", userSelectedDate);
      btn.disabled = false;
    }
  },
};

btn.addEventListener("click", handleClick);

function handleClick() {
  const timerID = setInterval(() => {
    currentDate = new Date();
    const deltaTime = userSelectedDate.getTime() - currentDate.getTime();
    const timeLeft = (convertMs(deltaTime));
    daysLeft.textContent = String(timeLeft.days).padStart(2, "0");
    hoursLeft.textContent = String(timeLeft.hours).padStart(2, "0");
    minutesLeft.textContent = String(timeLeft.minutes).padStart(2, "0");
    secondsLeft.textContent = String(timeLeft.seconds).padStart(2, "0");
    console.log(convertMs(deltaTime))
    btn.disabled = true;
    dataTimePicker.disabled = true;

    if (deltaTime <= 0) {
      clearInterval(timerID)
      daysLeft.textContent = "00";
      hoursLeft.textContent = "00";
      minutesLeft.textContent = "00";
      secondsLeft.textContent = "00";
      dataTimePicker.disabled = false;
      return;
    }
  }, 1000);
}

const dataTimePicker = document.querySelector("#datetime-picker")

flatpickr(dataTimePicker, options);

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



