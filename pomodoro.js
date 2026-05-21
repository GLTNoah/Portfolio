/* =========================================
   01. ÉLÉMENTS DU DOM ET VARIABLES
========================================= */

const ecranTimer = document.getElementById('pomodoro-timer');
const texteMode = document.getElementById('pomodoro-mode');
const boutonStart = document.getElementById('pomodoro-start');
const boutonPause = document.getElementById('pomodoro-pause');
const boutonReset = document.getElementById('pomodoro-reset');
const affichageSessions = document.getElementById('pomodoro-sessions');
const conteneurPomodoro = document.querySelector('.Pomodoro-Container');
const conteneurControles = document.querySelector('.pomodoro-controls');
const barreProgression = document.getElementById('pomodoro-progress');
const sonPomodoro = document.getElementById('pomodoro-sound');

const valTravail = document.getElementById('val-work');
const valPause = document.getElementById('val-break');
const btnMoinsTravail = document.getElementById('btn-minus-work');
const btnPlusTravail = document.getElementById('btn-plus-work');
const btnMoinsPause = document.getElementById('btn-minus-break');
const btnPlusPause = document.getElementById('btn-plus-break');

let minutesTravail = 25;
let minutesPause = 5;

let tempsRestant = minutesTravail * 60;
let modeTravailActif = true;
let intervalleTimer = null;
let sessionsTerminees = 0;

/* =========================================
   02. GESTION DU SON ET DE L'AFFICHAGE
========================================= */

function jouerSon() {
    if (sonPomodoro) {
        sonPomodoro.currentTime = 0;
        sonPomodoro.play();
    }
}

function majAffichage() {
    let minutes = Math.floor(tempsRestant / 60);
    let secondes = tempsRestant % 60;

    let affichageMin = minutes < 10 ? "0" + minutes : minutes;
    let affichageSec = secondes < 10 ? "0" + secondes : secondes;

    ecranTimer.textContent = affichageMin + ":" + affichageSec;

    let tempsTotal = modeTravailActif ? minutesTravail * 60 : minutesPause * 60;
    let pourcentageProgression = (tempsRestant / tempsTotal) * 100;
    
    barreProgression.style.width = pourcentageProgression + "%";
}

function changerMode() {
    modeTravailActif = !modeTravailActif;

    if (modeTravailActif) {
        tempsRestant = minutesTravail * 60;
        texteMode.textContent = "MODE: TRAVAIL";
        conteneurPomodoro.classList.remove('pause-mode');
        conteneurControles.classList.remove('pause-mode');
    } else {
        tempsRestant = minutesPause * 60;
        texteMode.textContent = "MODE: PAUSE";
        conteneurPomodoro.classList.add('pause-mode');
        conteneurControles.classList.add('pause-mode');
        sessionsTerminees = sessionsTerminees + 1;
        affichageSessions.textContent = "Sessions complétées: " + sessionsTerminees;
    }
    
    majAffichage();
}

/* =========================================
   03. LOGIQUE DU CHRONOMÈTRE
========================================= */

function demarrerTimer() {
    if (intervalleTimer !== null) {
        return;
    }
    
    intervalleTimer = setInterval(() => {
        tempsRestant = tempsRestant - 1;
        majAffichage();
        
        if (tempsRestant === 0) {
            jouerSon();
            clearInterval(intervalleTimer);
            intervalleTimer = null;
            changerMode();
            demarrerTimer();
        }
    }, 1000);
}

function mettreEnPause() {
    clearInterval(intervalleTimer);
    intervalleTimer = null;
}

function reinitialiserTimer() {
    mettreEnPause();
    
    modeTravailActif = true;
    tempsRestant = minutesTravail * 60;
    sessionsTerminees = 0;
    
    texteMode.textContent = "MODE: TRAVAIL";
    affichageSessions.textContent = "Sessions complétées: " + sessionsTerminees;
    
    conteneurPomodoro.classList.remove('pause-mode');
    conteneurControles.classList.remove('pause-mode');
    
    majAffichage();
}

/* =========================================
   04. PARAMÉTRAGES DES TEMPS
========================================= */

function changerTempsTravail(changement) {
    minutesTravail = minutesTravail + changement;
    
    if (minutesTravail < 1) {
        minutesTravail = 1;
    }
    if (minutesTravail > 60) {
        minutesTravail = 60;
    }
    
    valTravail.textContent = minutesTravail;
    
    if (modeTravailActif && intervalleTimer === null) {
        tempsRestant = minutesTravail * 60;
        majAffichage();
    }
}

/* =========================================
   05. ÉCOUTEURS D'ÉVÉNEMENTS ET INITIALISATION
========================================= */

function changerTempsPause(changement) {
    minutesPause = minutesPause + changement;
    
    if (minutesPause < 1) {
        minutesPause = 1;
    }
    if (minutesPause > 30) {
        minutesPause = 30;
    }
    
    valPause.textContent = minutesPause;
    
    if (!modeTravailActif && intervalleTimer === null) {
        tempsRestant = minutesPause * 60;
        majAffichage();
    }
}

btnMoinsTravail.addEventListener('click', () => changerTempsTravail(-1));
btnPlusTravail.addEventListener('click', () => changerTempsTravail(1));
btnMoinsPause.addEventListener('click', () => changerTempsPause(-1));
btnPlusPause.addEventListener('click', () => changerTempsPause(1));

boutonStart.addEventListener('click', () => {
    if (intervalleTimer === null) {
        jouerSon();
    }
    demarrerTimer();
});

boutonPause.addEventListener('click', mettreEnPause);
boutonReset.addEventListener('click', reinitialiserTimer);

majAffichage();