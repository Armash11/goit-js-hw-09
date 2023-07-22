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
      console.log(bodyColor);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
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
