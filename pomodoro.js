const timerDisplay = document.getElementById('pomodoro-timer');
const modeDisplay = document.getElementById('pomodoro-mode');
const startBtn = document.getElementById('pomodoro-start');
const pauseBtn = document.getElementById('pomodoro-pause');
const resetBtn = document.getElementById('pomodoro-reset');
const sessionDisplay = document.getElementById('pomodoro-sessions');
const container = document.querySelector('.Pomodoro-Container');
const controlsContainer = document.querySelector('.pomodoro-controls'); // Ajout pour les boutons
const progressBar = document.getElementById('pomodoro-progress');

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let timeLeft = WORK_TIME;
let isWorkMode = true;
let timerInterval = null;
let sessionsCompleted = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const totalTime = isWorkMode ? WORK_TIME : BREAK_TIME;
    const progressPercentage = (timeLeft / totalTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function switchMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    
    if (isWorkMode) {
        modeDisplay.textContent = "MODE: TRAVAIL";
        container.classList.remove('pause-mode');
        controlsContainer.classList.remove('pause-mode'); // Remet les boutons en vert
    } else {
        modeDisplay.textContent = "MODE: PAUSE";
        container.classList.add('pause-mode');
        controlsContainer.classList.add('pause-mode'); // Passe les boutons en cyan
        sessionsCompleted++;
        sessionDisplay.textContent = `Sessions complétées: ${sessionsCompleted}`;
    }
    
    updateDisplay();
}

function startTimer() {
    if (timerInterval !== null) return;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            switchMode();
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();