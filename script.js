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
const dialogueJill = document.querySelector('.Texte-Jill');
const zonesCarte = document.querySelectorAll('.zone-carte');
const btnCarte = document.getElementById('Btn-Carte');
const radiosExamen = document.querySelectorAll('input[name="examen"]');

const fondVideo = document.querySelector('.fond-video');
const bgMusic = document.getElementById('bg-music');
const audioFond = document.getElementById('audio-fond');
const themeTitre = document.getElementById('theme-titre');
const themeImage = document.getElementById('theme-image');
const themeDesc = document.getElementById('theme-desc');
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
const nomContact = document.getElementById('nom-contact');

let zoneSelectionnee = null;
if (themeAudioPreview) themeAudioPreview.volume = 0.05;

let personnageActif = "> JILL VALENTINE";
let themeActuel = {
    contact: "> JILL VALENTINE",
    dialogue: "Avant de continuer, je devrais inspecter tout ce que j'ai eu ici. Je pourrais y trouver des éléments importants..."
};

// Dictionnaire des dialogues selon le personnage actif
const dialoguesPersonnages = {
    "> JILL VALENTINE": {
        "carte-eglise": "Une vieille église... L'ambiance y est glaciale. Je ferais bien de rester sur mes gardes.",
        "carte-police": "Le commissariat... Leon doit sûrement être à l'intérieur. C'est l'endroit le plus sûr pour le moment.",
        "carte-usine": "Une usine abandonnée. Le niveau de danger biologique est critique ici. Je dois avancer prudemment.",
        "carte-bibliotheque": "La bibliothèque. Un bon endroit pour trouver des informations et planifier la prochaine étape."
    },
    "> EMILY GRACE": {
        "carte-eglise": "Notre sanctuaire. La foi est la seule chose qui nous sauvera de la pourriture de ce monde.",
        "carte-police": "Ces prétendues forces de l'ordre... Leurs armes ne peuvent rien contre la volonté divine.",
        "carte-usine": "L'industrie des hommes périra. Seule la chair sanctifiée restera.",
        "carte-bibliotheque": "Des mots vides de sens. La vraie connaissance s'écrit dans le sang."
    },
    "> LEON S. KENNEDY": {
        "carte-eglise": "Un culte qui traîne dans le coin ? Ça me rappelle de très mauvais souvenirs...",
        "carte-police": "Le R.P.D. C'était censé être mon premier jour de boulot... Quel cauchemar.",
        "carte-usine": "Si Umbrella est derrière ça, cette usine est l'endroit parfait pour cacher un labo.",
        "carte-bibliotheque": "Si Claire est dans les parages, elle cherchera sûrement des infos ici."
    },
    "> ADA WONG": {
        "carte-eglise": "La ferveur religieuse fait d'excellents cobayes, mais de très mauvais associés.",
        "carte-police": "Leon s'en sort bien. Je vais le laisser faire le sale boulot pendant que je cherche ma cible.",
        "carte-usine": "Une façade idéale. L'échantillon doit se trouver dans les sous-sols de ce complexe.",
        "carte-bibliotheque": "Trop exposé. Je préfère opérer dans l'ombre et laisser les autres fouiller la paperasse."
    }
};

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
   DIALOGUES JILL & INTERACTIONS CARTE
========================================= */
zonesCarte.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
        if (nomContact) nomContact.textContent = personnageActif;

        // Cherche le dialogue dans le dictionnaire, sinon utilise celui par défaut
        if (dialoguesPersonnages[personnageActif] && dialoguesPersonnages[personnageActif][zone.id]) {
            if (dialogueJill) dialogueJill.textContent = dialoguesPersonnages[personnageActif][zone.id];
        } else if (dialogueJill && zone.dataset.dialogue) {
            if (dialogueJill) dialogueJill.textContent = zone.dataset.dialogue;
        }
        
        const myAudio = document.getElementById('myaudio');
        if (myAudio) myAudio.play();
    });

    zone.addEventListener('mouseleave', () => {
        if (btnCarte && btnCarte.checked) {
            if (nomContact) nomContact.textContent = personnageActif;
            if (dialogueJill) dialogueJill.textContent = themeActuel.dialogue;
        }
    });

    zone.addEventListener('click', () => {
        zoneSelectionnee = {
            titre: zone.dataset.titre,
            desc: zone.dataset.desc ? zone.dataset.desc.replace(/\\n/g, '\n') : '',
            img: zone.dataset.img,
            audio: zone.dataset.audio,
            video: zone.dataset.video,
            contact: zone.dataset.contact || "> JILL VALENTINE",
            dialogueActif: zone.dataset.dialogueActif || ""
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

        // Mise à jour du personnage aux commandes !
        personnageActif = zoneSelectionnee.contact;
        themeActuel = {
            contact: personnageActif,
            dialogue: zoneSelectionnee.dialogueActif
        };

        if (nomContact) nomContact.textContent = themeActuel.contact;
        if (dialogueJill) dialogueJill.textContent = themeActuel.dialogue;

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