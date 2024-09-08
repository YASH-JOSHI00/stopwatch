let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Get elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Format time (mm:ss:ms)
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start or pause the stopwatch
function startPauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
  }
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
  startPauseBtn.textContent = 'Start';
}

// Add a lap
function addLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

// Event listeners
startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
