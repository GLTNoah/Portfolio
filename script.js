/* =========================================
   VARIABLES GLOBALES & POMODORO
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
   LOGIQUE POMODORO
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

btnMoinsTravail.addEventListener('click', () => { minutesTravail = Math.max(1, minutesTravail - 1); valTravail.textContent = minutesTravail; });
btnPlusTravail.addEventListener('click', () => { minutesTravail = Math.min(60, minutesTravail + 1); valTravail.textContent = minutesTravail; });
btnMoinsPause.addEventListener('click', () => { minutesPause = Math.max(1, minutesPause - 1); valPause.textContent = minutesPause; });
btnPlusPause.addEventListener('click', () => { minutesPause = Math.min(30, minutesPause + 1); valPause.textContent = minutesPause; });

boutonStart.addEventListener('click', () => { if (intervalleTimer === null) jouerSon(); demarrerTimer(); });
boutonPause.addEventListener('click', mettreEnPause);
boutonReset.addEventListener('click', reinitialiserTimer);

/* =========================================
   VARIABLES CARTE & AUDIO
========================================= */
const zonesCarte = document.querySelectorAll('.zone-carte');
const radiosExamen = document.querySelectorAll('input[name="examen"]');
const fondVideo = document.querySelector('.fond-video');
const bgMusic = document.getElementById('bg-music');
const audioFond = document.getElementById('audio-fond');
const themeAudioPreview = document.getElementById('theme-audio-preview');
const conteneurAudioPreview = document.querySelector('.theme-audio-lecteur');
const btnActiverTheme = document.getElementById('btn-activer-theme');
const customPlayBtn = document.getElementById('custom-play-btn');
const audioProgressBar = document.getElementById('audio-progress-bar');
const audioProgressContainer = document.querySelector('.audio-progress-container');
const audioTimeDisplay = document.getElementById('audio-time');
const btnSon = document.getElementById('btn-son');
const iconeSon = document.getElementById('icon_sound');
const titreMusiqueActuelle = document.getElementById('titre-musique-actuelle');
const themeTitre = document.getElementById('theme-titre');
const themeDesc = document.getElementById('theme-desc');
const themeImage = document.getElementById('theme-image');

let zoneSelectionnee = null;
if (themeAudioPreview) themeAudioPreview.volume = 0.03;

/* =========================================
   FONCTIONS AUDIO & FORMATAGE
========================================= */
function relancerMusiqueDeFond() {
    let srcFond = bgMusic.getAttribute('src') || audioFond.getAttribute('src');
    if (titreMusiqueActuelle) titreMusiqueActuelle.textContent = formaterTitreMusique(srcFond);

    if (iconeSon && iconeSon.src.includes('sound_off.png')) {
        return; 
    }

    if (bgMusic.getAttribute('src')) {
        bgMusic.play();
    } else if (audioFond) {
        audioFond.play();
    }
}

function formaterTitreMusique(chemin) {
    if (!chemin) return "AUCUNE";
    return chemin.split('/').pop().replace('.mp3', '').replace(/-/g, ' ').toUpperCase();
}

const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

/* =========================================
   INTERACTIONS CARTE
========================================= */
zonesCarte.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
        const myAudio = document.getElementById('myaudio');
        if (myAudio) myAudio.play();
    });

    zone.addEventListener('click', () => {
        zoneSelectionnee = {
            titre: zone.dataset.titre,
            desc: zone.dataset.desc ? zone.dataset.desc.replace(/\\n/g, '\n') : '',
            img: zone.dataset.img,
            audio: zone.dataset.audio,
            video: zone.dataset.video
        };

        if (themeTitre) themeTitre.textContent = zoneSelectionnee.titre;
        if (themeDesc) themeDesc.textContent = zoneSelectionnee.desc;
        if (themeImage) {
            themeImage.src = zoneSelectionnee.img;
            themeImage.style.display = "block";
        }
        if (themeAudioPreview) {
            themeAudioPreview.src = zoneSelectionnee.audio;
            conteneurAudioPreview.style.display = "block";
        }
        if (btnActiverTheme) btnActiverTheme.style.display = "block";

        if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
        if (audioProgressBar) audioProgressBar.style.width = "0%";
        if (audioTimeDisplay) audioTimeDisplay.textContent = "00:00 / 00:00";

        zonesCarte.forEach(c => c.classList.remove('zone-active'));
        zone.classList.add('zone-active');
    });
});

btnActiverTheme.addEventListener('click', () => {
    if (zoneSelectionnee) {
        if (audioFond) audioFond.pause();
        if (themeAudioPreview) themeAudioPreview.pause();
        if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
        
        if (fondVideo) fondVideo.src = zoneSelectionnee.video;
        if (bgMusic) {
            bgMusic.src = zoneSelectionnee.audio;
            bgMusic.volume = 0.05;
            bgMusic.play();
        }
        if (titreMusiqueActuelle) titreMusiqueActuelle.textContent = formaterTitreMusique(zoneSelectionnee.audio);

        if (iconeSon) {
            iconeSon.src = "./Image/sound_on.png";
            iconeSon.alt = "Couper le son";
        }
    }
});

radiosExamen.forEach(radio => {
    radio.addEventListener('change', () => {
        if (themeAudioPreview && !themeAudioPreview.paused) {
            themeAudioPreview.pause();
            if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
            relancerMusiqueDeFond();
        }
    });
});

/* =========================================
   LECTEUR AUDIO PERSONNALISÉ
========================================= */
customPlayBtn.addEventListener('click', () => {
    if (themeAudioPreview.paused) {
        const previewFile = themeAudioPreview.getAttribute('src');
        const bgFile = bgMusic.getAttribute('src');
        const fondFile = audioFond.getAttribute('src');

        const isBgPlaying = !bgMusic.paused && previewFile === bgFile;
        const isFondPlaying = !audioFond.paused && previewFile === fondFile;

        if (isBgPlaying || isFondPlaying) {
            return;
        }

        if (audioFond) audioFond.pause();
        if (bgMusic) bgMusic.pause();

        themeAudioPreview.play();
        customPlayBtn.innerHTML = "[ &#10074;&#10074; PAUSE ]";
    } else {
        themeAudioPreview.pause();
        customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
        relancerMusiqueDeFond();
    }
});

themeAudioPreview.addEventListener('loadedmetadata', () => {
    if (audioTimeDisplay) audioTimeDisplay.textContent = `00:00 / ${formatTime(themeAudioPreview.duration)}`;
});

themeAudioPreview.addEventListener('timeupdate', () => {
    const current = themeAudioPreview.currentTime;
    const duration = themeAudioPreview.duration;
    if (audioProgressBar) audioProgressBar.style.width = (current / duration) * 100 + "%";
    if (audioTimeDisplay) audioTimeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
});

themeAudioPreview.addEventListener('ended', () => {
    if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
    if (audioProgressBar) audioProgressBar.style.width = "0%";
    if (audioTimeDisplay) audioTimeDisplay.textContent = `00:00 / ${formatTime(themeAudioPreview.duration)}`;
    relancerMusiqueDeFond();
});

audioProgressContainer.addEventListener('click', (e) => {
    const rect = audioProgressContainer.getBoundingClientRect();
    themeAudioPreview.currentTime = ((e.clientX - rect.left) / rect.width) * themeAudioPreview.duration;
});

/* =========================================
   BOUTON SON GLOBAL
========================================= */
if (btnSon) {
    btnSon.addEventListener('click', () => {
        let audioActif = bgMusic.getAttribute('src') ? bgMusic : audioFond;

        if (audioActif.paused) {
            audioActif.play();
            if (iconeSon) {
                iconeSon.src = "./Image/sound_on.png";
                iconeSon.alt = "Couper le son";
            }
        } else {
            audioActif.pause();
            if (iconeSon) {
                iconeSon.src = "./Image/sound_off.png";
                iconeSon.alt = "Activer le son";
            }
        }
    });
}

/* =========================================
   INITIALISATION
========================================= */
majAffichage();