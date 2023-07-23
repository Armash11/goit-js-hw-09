const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');

const colorChanger = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    stopBtn.disabled = true;
    startBtn.disabled = false;
  },
};

startBtn.addEventListener('click', () => {
  colorChanger.start();
});

stopBtn.addEventListener('click', () => {
  colorChanger.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
