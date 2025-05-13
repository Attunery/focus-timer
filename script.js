let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let initialTime = 25 * 60;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const customTime = document.getElementById('customTime');

// Confetti function (simple burst)
function confettiBurst() {
    if (window.confetti) {
        window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Sound function
function playSound() {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleTimer() {
    if (!isRunning) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isRunning = false;
                startButton.textContent = 'Start';
                confettiBurst();
                playSound();
            }
        }, 1000);
        isRunning = true;
        startButton.textContent = 'Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        isRunning = false;
        startButton.textContent = 'Start';
    }
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    startButton.textContent = 'Start';
}

function resetTimer() {
    stopTimer();
    timeLeft = initialTime;
    updateDisplay();
}

customTime.addEventListener('change', function() {
    initialTime = parseInt(customTime.value, 10);
    resetTimer();
});

startButton.addEventListener('click', toggleTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();

// Confetti library (Canvas Confetti)
(function(){
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    document.head.appendChild(script);
})(); 