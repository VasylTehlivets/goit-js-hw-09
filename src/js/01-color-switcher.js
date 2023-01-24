const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;
const INTERVAL_DELAY = 1000;
startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

function setBodyBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick() {
  timerId = setInterval(setBodyBgColor, INTERVAL_DELAY);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
