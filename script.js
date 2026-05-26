/* =========================================
   01. ÉLÉMENTS DU DOM ET VARIABLES POMODORO
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
    if (intervalleTimer !== null) return;
    intervalleTimer = setInterval(() => {
        tempsRestant--;
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
    affichageSessions.textContent = "Sessions complétées: 0";
    conteneurPomodoro.classList.remove('pause-mode');
    conteneurControles.classList.remove('pause-mode');
    majAffichage();
}

/* =========================================
   04. PARAMÉTRAGES ET ÉCOUTEURS
========================================= */

btnMoinsTravail.addEventListener('click', () => { minutesTravail = Math.max(1, minutesTravail - 1); valTravail.textContent = minutesTravail; });
btnPlusTravail.addEventListener('click', () => { minutesTravail = Math.min(60, minutesTravail + 1); valTravail.textContent = minutesTravail; });
btnMoinsPause.addEventListener('click', () => { minutesPause = Math.max(1, minutesPause - 1); valPause.textContent = minutesPause; });
btnPlusPause.addEventListener('click', () => { minutesPause = Math.min(30, minutesPause + 1); valPause.textContent = minutesPause; });

boutonStart.addEventListener('click', () => { if (intervalleTimer === null) jouerSon(); demarrerTimer(); });
boutonPause.addEventListener('click', mettreEnPause);
boutonReset.addEventListener('click', reinitialiserTimer);

/* =========================================
   05. INTERACTIONS DE LA CARTE (SVG)
========================================= */

const dialogueJill = document.querySelector('.Texte-Jill');
const zonesCarte = document.querySelectorAll('.zone-carte');
const btnCarte = document.getElementById('Btn-Carte');
const radiosExamen = document.querySelectorAll('input[name="examen"]');

const fondVideo = document.querySelector('.fond-video');
const bgMusic = document.getElementById('bg-music');
const themeTitre = document.getElementById('theme-titre');
const themeImage = document.getElementById('theme-image');
const themeDesc = document.getElementById('theme-desc');
const themeAudioPreview = document.getElementById('theme-audio-preview');
const conteneurAudioPreview = document.querySelector('.theme-audio-lecteur');
const btnActiverTheme = document.getElementById('btn-activer-theme');

let zoneSelectionnee = null;

zonesCarte.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
        if (zone.dataset.titre) dialogueJill.textContent = "C'est " + zone.dataset.titre + "...";
        document.getElementById('myaudio').play();
    });

    zone.addEventListener('mouseleave', () => {
        if (btnCarte.checked) dialogueJill.textContent = "Ca craint ici ... Je me demande comment s'en sortent les autres ?";
    });

    zone.addEventListener('click', () => {
        zoneSelectionnee = {
            titre: zone.dataset.titre,
            desc: zone.dataset.desc.replace(/\\n/g, '\n'),
            img: zone.dataset.img,
            audio: zone.dataset.audio,
            video: zone.dataset.video
        };

        themeTitre.textContent = zoneSelectionnee.titre;
        themeDesc.textContent = zoneSelectionnee.desc;
        themeImage.src = zoneSelectionnee.img;
        themeImage.style.display = "block";
        themeAudioPreview.src = zoneSelectionnee.audio;
        conteneurAudioPreview.style.display = "block";
        btnActiverTheme.style.display = "block";

        zonesCarte.forEach(c => c.classList.remove('zone-active'));
        zone.classList.add('zone-active');
    });
});

btnActiverTheme.addEventListener('click', () => {
    if (zoneSelectionnee) {
        fondVideo.src = zoneSelectionnee.video;
        bgMusic.src = zoneSelectionnee.audio;
        bgMusic.volume = 0.02;
        bgMusic.play();
    }
});

radiosExamen.forEach(radio => {
    radio.addEventListener('change', () => themeAudioPreview.pause());
});

majAffichage();