/* =========================================
   VARIABLES GLOBALES
========================================= */
const myaudio = document.getElementById('myaudio');
const pomodoroSound = document.getElementById('pomodoro-sound');
const audioFond = document.getElementById('audio-fond');
const bgMusic = document.getElementById('bg-music');
const barreVolume = document.getElementById('barre-volume');
const iconeSon = document.getElementById('icon_sound');
const btnSon = document.getElementById('btn-son');
const btnActiverTheme = document.getElementById('btn-activer-theme');
const themeAudioPreview = document.getElementById('theme-audio-preview');
const customPlayBtn = document.getElementById('custom-play-btn');
const fondVideo = document.querySelector('.fond-video');
const titreMusiqueActuelle = document.getElementById('titre-musique-actuelle');
const nomContact = document.getElementById('nom-contact');
const dialogueJill = document.querySelector('.Texte-Jill');
const zonesCarte = document.querySelectorAll('.zone-carte');
const emplacementsInventaire = document.querySelectorAll('.Emplacement-Inventaire');
const audioProgressContainer = document.querySelector('.audio-progress-container');
const audioProgressBar = document.getElementById('audio-progress-bar');
const audioTime = document.getElementById('audio-time');
const tousLesRadiosExamen = document.querySelectorAll('input[name="examen"]');

let zoneSelectionnee = null;
let themeActuel = {};
let personnageActif = "";

const dialoguesPersonnages = {
    "JILL VALENTINE": {
        "carte-bibliotheque": "C'est ici que je suis. Il y a beaucoup d'archives."
    },
    "ADA WONG": {
        "carte-usine": "Ne te mets pas en travers de mon chemin."
    },
    "LEON S. KENNEDY / CLAIRE REDFIELD": {
        "carte-police": "On sécurise le périmètre. Reste sur tes gardes."
    },
    "GRACE ASHCROFT": {
        "carte-eglise": "Puisse la grâce vous guider..."
    }
};

/* =========================================
   UTILITAIRES AUDIO
========================================= */

function getAudioPrincipalActif() {
    return bgMusic && bgMusic.getAttribute('src') ? bgMusic : audioFond;
}

function jouerSonCourt(audioEl) {
    if (!audioEl) return;
    audioEl.currentTime = 0;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {});
    }
}

/* =========================================
   INITIALISATION (THÈMES ET AUDIO)
========================================= */

function appliquerThemeSauvegarde() {
    const sauvegarde = localStorage.getItem('donnees-survie');
    if (sauvegarde) {
        try {
            const donnees = JSON.parse(sauvegarde);
            document.body.dataset.theme = donnees.theme;
            
            if (fondVideo && donnees.video) fondVideo.src = donnees.video;
            if (bgMusic && donnees.audio) bgMusic.src = donnees.audio;
            if (audioFond) audioFond.pause();
            
            if (titreMusiqueActuelle) titreMusiqueActuelle.textContent = formaterTitreMusique(donnees.audio);
            if (nomContact) nomContact.textContent = donnees.contact;
            if (dialogueJill) dialogueJill.textContent = donnees.dialogue;
            
            document.addEventListener('click', () => {
                const etatPause = localStorage.getItem('music-pause-survie');
                if (bgMusic && bgMusic.paused && etatPause !== 'true' && (!themeAudioPreview || themeAudioPreview.paused)) {
                    bgMusic.play().catch(() => {});
                }
            }, { once: true });
        } catch (e) {
            localStorage.removeItem('donnees-survie');
        }
    }
}

function appliquerVolumeInitial() {
    if (!barreVolume) return;

    const volumeSauvegarde = localStorage.getItem('volume-survie');
    if (volumeSauvegarde !== null) {
        barreVolume.value = volumeSauvegarde;
    }
    
    const volumeDemarrage = parseFloat(barreVolume.value);
    if (myaudio) myaudio.volume = Math.min(1, volumeDemarrage * 0.25);
    if (pomodoroSound) pomodoroSound.volume = Math.min(1, volumeDemarrage * 0.4);
    if (audioFond) audioFond.volume = volumeDemarrage;
    if (bgMusic) bgMusic.volume = volumeDemarrage;
    if (themeAudioPreview) themeAudioPreview.volume = volumeDemarrage;
    
    const etatPause = localStorage.getItem('music-pause-survie');
    const audioActif = getAudioPrincipalActif();
    
    if (etatPause === 'true') {
        if (audioActif) audioActif.pause();
        if (iconeSon) {
            iconeSon.src = "./Image/sound_off.png";
            iconeSon.alt = "Activer le son";
        }
    } else if (iconeSon) {
        if (volumeDemarrage === 0) {
            iconeSon.src = "./Image/sound_off.png";
            iconeSon.alt = "Activer le son";
        } else {
            iconeSon.src = "./Image/sound_on.png";
            iconeSon.alt = "Couper le son";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    appliquerThemeSauvegarde();
    appliquerVolumeInitial(); 
});

/* =========================================
   SONS D'INVENTAIRE SANS LATENCE
========================================= */

emplacementsInventaire.forEach(slot => {
    slot.addEventListener('mouseenter', () => jouerSonCourt(myaudio));
});

/* =========================================
   GESTION AUDIO ET VOLUME
========================================= */

if (barreVolume) {
    barreVolume.addEventListener('input', (e) => {
        const volumeActuel = parseFloat(e.target.value);
        
        if (myaudio) myaudio.volume = Math.min(1, volumeActuel * 0.25);
        if (pomodoroSound) pomodoroSound.volume = Math.min(1, volumeActuel * 0.4);
        if (audioFond) audioFond.volume = volumeActuel;
        if (bgMusic) bgMusic.volume = volumeActuel;
        if (themeAudioPreview) themeAudioPreview.volume = volumeActuel;

        localStorage.setItem('volume-survie', volumeActuel);

        if (iconeSon) {
            if (volumeActuel === 0) {
                iconeSon.src = "./Image/sound_off.png";
                iconeSon.alt = "Activer le son";
            } else {
                const audioActif = getAudioPrincipalActif();
                if (audioActif && !audioActif.paused) {
                    iconeSon.src = "./Image/sound_on.png";
                    iconeSon.alt = "Couper le son";
                }
            }
        }
    });
}

if (btnSon) {
    btnSon.addEventListener('click', () => {
        const audioActif = getAudioPrincipalActif();
        if (audioActif) {
            if (audioActif.paused) {
                if (themeAudioPreview && !themeAudioPreview.paused) {
                    themeAudioPreview.pause();
                    if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
                }
                audioActif.play().catch(() => {});
                iconeSon.src = "./Image/sound_on.png";
                iconeSon.alt = "Couper le son";
                localStorage.setItem('music-pause-survie', 'false');
            } else {
                audioActif.pause();
                iconeSon.src = "./Image/sound_off.png";
                iconeSon.alt = "Activer le son";
                localStorage.setItem('music-pause-survie', 'true');
            }
        }
    });
}

function formaterTemps(secondes) {
    const min = Math.floor(secondes / 60) || 0;
    const sec = Math.floor(secondes % 60) || 0;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function formaterTitreMusique(src) {
    if (!src) return "INCONNU";
    const nomFichier = src.split('/').pop().split('.')[0];
    return nomFichier.replace(/-/g, ' ').toUpperCase();
}

if (customPlayBtn && themeAudioPreview) {
    customPlayBtn.addEventListener('click', () => {
        const audioActif = getAudioPrincipalActif();
        if (themeAudioPreview.paused) {
            if (audioActif && !audioActif.paused) {
                audioActif.pause();
            }
            themeAudioPreview.volume = barreVolume ? parseFloat(barreVolume.value) : 0.05;
            themeAudioPreview.play().catch(() => {});
            customPlayBtn.innerHTML = "[ &#10074;&#10074; PAUSE ]";
        } else {
            themeAudioPreview.pause();
            customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
            const etatPause = localStorage.getItem('music-pause-survie');
            if (audioActif && etatPause !== 'true') {
                audioActif.play().catch(() => {});
            }
        }
    });

    themeAudioPreview.addEventListener('ended', () => {
        customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
        const audioActif = getAudioPrincipalActif();
        const etatPause = localStorage.getItem('music-pause-survie');
        if (audioActif && etatPause !== 'true') {
            audioActif.play().catch(() => {});
        }
    });
}

if (themeAudioPreview) {
    themeAudioPreview.addEventListener('loadedmetadata', () => {
        if (audioTime && themeAudioPreview.duration) {
            audioTime.textContent = `00:00 / ${formaterTemps(themeAudioPreview.duration)}`;
        }
    });

    themeAudioPreview.addEventListener('timeupdate', () => {
        const act = themeAudioPreview.currentTime;
        const dur = themeAudioPreview.duration;
        if (dur) {
            const pourcent = (act / dur) * 100;
            if (audioProgressBar) audioProgressBar.style.width = pourcent + '%';
            if (audioTime) audioTime.textContent = `${formaterTemps(act)} / ${formaterTemps(dur)}`;
        }
    });
}

if (audioProgressContainer && themeAudioPreview) {
    audioProgressContainer.addEventListener('click', (e) => {
        if (!themeAudioPreview.duration) return;
        const rect = audioProgressContainer.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        themeAudioPreview.currentTime = pos * themeAudioPreview.duration;
    });
}

/* =========================================
   CARTE INTERACTIVE ET THÈMES
========================================= */

function selectionnerZoneCarte(zone) {
    zonesCarte.forEach(z => z.classList.remove('zone-active'));
    zone.classList.add('zone-active');

    const titre = zone.dataset.titre;
    const desc = zone.dataset.desc;
    const img = zone.dataset.img;
    const audioSrc = zone.dataset.audio;

    document.getElementById('theme-titre').textContent = titre;
    document.getElementById('theme-desc').textContent = desc.replace(/\\n/g, '\n');
    
    const themeImage = document.getElementById('theme-image');
    themeImage.src = img;
    themeImage.style.display = 'block';

    zoneSelectionnee = {
        id: zone.id,
        theme: zone.dataset.theme,
        titre: titre,
        desc: desc,
        img: img,
        audio: audioSrc,
        video: zone.dataset.video,
        contact: zone.dataset.contact,
        dialogueActif: ""
    };

    if (themeAudioPreview && !themeAudioPreview.paused) {
        themeAudioPreview.pause();
        const audioActif = getAudioPrincipalActif();
        const etatPause = localStorage.getItem('music-pause-survie');
        if (audioActif && etatPause !== 'true') {
            audioActif.play().catch(() => {});
        }
    }

    themeAudioPreview.src = audioSrc;
    document.querySelector('.theme-audio-lecteur').style.display = 'block';
    btnActiverTheme.style.display = 'block';
    
    customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
    if (audioProgressBar) audioProgressBar.style.width = '0%';
    if (audioTime) audioTime.textContent = "00:00 / 00:00";
}

zonesCarte.forEach(zone => {
    zone.addEventListener('click', () => selectionnerZoneCarte(zone));
    zone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectionnerZoneCarte(zone);
        }
    });
});

if (btnActiverTheme) {
    btnActiverTheme.addEventListener('click', () => {
        if (zoneSelectionnee) {
            document.body.dataset.theme = zoneSelectionnee.theme;

            if (audioFond) audioFond.pause();
            if (themeAudioPreview) themeAudioPreview.pause();
            if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
            
            if (fondVideo) fondVideo.src = zoneSelectionnee.video;
            
            if (bgMusic) {
                bgMusic.src = zoneSelectionnee.audio;
                bgMusic.volume = barreVolume ? parseFloat(barreVolume.value) : 0.05;
                
                const etatPause = localStorage.getItem('music-pause-survie');
                if (etatPause !== 'true') {
                    bgMusic.play().catch(() => {});
                }
            }
            
            if (titreMusiqueActuelle) titreMusiqueActuelle.textContent = formaterTitreMusique(zoneSelectionnee.audio);
            
            personnageActif = zoneSelectionnee.contact;
            const dialogueSecours = dialoguesPersonnages[personnageActif] && dialoguesPersonnages[personnageActif][zoneSelectionnee.id] 
                                  ? dialoguesPersonnages[personnageActif][zoneSelectionnee.id] 
                                  : "Il faut que je continue l'exploration...";

            themeActuel = {
                contact: personnageActif,
                dialogue: zoneSelectionnee.dialogueActif !== "" ? zoneSelectionnee.dialogueActif : dialogueSecours
            };

            const donneesSauvegarde = {
                theme: zoneSelectionnee.theme,
                video: zoneSelectionnee.video,
                audio: zoneSelectionnee.audio,
                contact: themeActuel.contact,
                dialogue: themeActuel.dialogue
            };
            localStorage.setItem('donnees-survie', JSON.stringify(donneesSauvegarde));

            if (nomContact) nomContact.textContent = themeActuel.contact;
            if (dialogueJill) dialogueJill.textContent = themeActuel.dialogue;

            if (iconeSon && barreVolume && parseFloat(barreVolume.value) > 0) {
                const etatPause = localStorage.getItem('music-pause-survie');
                if (etatPause !== 'true') {
                    iconeSon.src = "./Image/sound_on.png";
                    iconeSon.alt = "Couper le son";
                } else {
                    iconeSon.src = "./Image/sound_off.png";
                    iconeSon.alt = "Activer le son";
                }
            }
        }
    });
}

/* =========================================
   ANTI-LAG & GESTION DES ÉTATS
========================================= */

tousLesRadiosExamen.forEach(radio => {
    radio.addEventListener('change', (e) => {
        // Si on quitte la carte alors qu'un aperçu musical jouait, on le coupe et on relance la musique principale
        if (e.target.id !== 'Btn-Carte' && themeAudioPreview && !themeAudioPreview.paused) {
            themeAudioPreview.pause();
            if (customPlayBtn) customPlayBtn.innerHTML = "[ &#9658; LECTURE ]";
            const audioActif = getAudioPrincipalActif();
            const etatPause = localStorage.getItem('music-pause-survie');
            if (audioActif && etatPause !== 'true') {
                audioActif.play().catch(() => {});
            }
        }

        // Pause de la vidéo de fond pendant l'inspection plein écran pour économiser le GPU
        if (e.target.id === 'radio-cv' || e.target.id === 'radio-veille') {
            if (fondVideo) fondVideo.pause();
        } else {
            if (fondVideo && fondVideo.paused && !document.hidden) {
                fondVideo.play().catch(() => {});
            }
        }
    });
});

// Économie de ressources lorsque l'onglet du navigateur est en arrière-plan
document.addEventListener('visibilitychange', () => {
    if (!fondVideo) return;
    const enExamen = document.getElementById('radio-cv')?.checked || document.getElementById('radio-veille')?.checked;
    if (document.hidden) {
        fondVideo.pause();
    } else if (!enExamen) {
        fondVideo.play().catch(() => {});
    }
});

/* =========================================
   CONFORT CLAVIER (ÉCHAP & FLÈCHES)
========================================= */

document.addEventListener('keydown', (e) => {
    const dialogueTheme = document.getElementById('dialogue-theme');
    if (e.key === 'Escape') {
        if (dialogueTheme && dialogueTheme.open) {
            dialogueTheme.close();
            return;
        }

        const radioCv = document.getElementById('radio-cv');
        const radioVeille = document.getElementById('radio-veille');
        const fermerExamen = document.getElementById('fermer-examen');
        const btnCarte = document.getElementById('Btn-Carte');
        const btnPomodoro = document.getElementById('Btn-Pomodoro');
        const etatInitial = document.getElementById('etat-initial');

        if ((radioCv && radioCv.checked) || (radioVeille && radioVeille.checked)) {
            fermerExamen.checked = true;
            fermerExamen.dispatchEvent(new Event('change'));
        } else if ((btnCarte && btnCarte.checked) || (btnPomodoro && btnPomodoro.checked)) {
            etatInitial.checked = true;
            etatInitial.dispatchEvent(new Event('change'));
        }
        return;
    }

    // Navigation dans la grille d'inventaire avec les flèches du clavier
    const slots = Array.from(emplacementsInventaire);
    const indexActuel = slots.indexOf(document.activeElement);
    if (indexActuel !== -1) {
        let nouvelIndex = indexActuel;
        if (e.key === 'ArrowRight') nouvelIndex = (indexActuel + 1) % slots.length;
        if (e.key === 'ArrowLeft') nouvelIndex = (indexActuel - 1 + slots.length) % slots.length;
        if (e.key === 'ArrowDown') nouvelIndex = Math.min(indexActuel + 3, slots.length - 1);
        if (e.key === 'ArrowUp') nouvelIndex = Math.max(indexActuel - 3, 0);

        if (nouvelIndex !== indexActuel) {
            e.preventDefault();
            slots[nouvelIndex].focus();
            jouerSonCourt(myaudio);
        }
    }
});

/* =========================================
   LOGIQUE POMODORO (SANS DÉRIVE HORAIRE)
========================================= */

let tempsTravail = 25;
let tempsPause = 5;
let tempsRestant = tempsTravail * 60;
let intervalId = null;
let finCibleTimestamp = null;
let enPause = false;
let sessionsCompletees = 0;

const valWork = document.getElementById('val-work');
const valBreak = document.getElementById('val-break');
const affichageTimer = document.getElementById('pomodoro-timer');
const affichageMode = document.getElementById('pomodoro-mode');
const barreProgression = document.getElementById('pomodoro-progress');
const affichageSessions = document.getElementById('pomodoro-sessions');

function majAffichagePomodoro() {
    if (affichageTimer) affichageTimer.textContent = formaterTemps(tempsRestant);
    if (barreProgression) {
        const tempsTotal = (enPause ? tempsPause : tempsTravail) * 60;
        const pourcentage = ((tempsTotal - tempsRestant) / tempsTotal) * 100;
        barreProgression.style.width = Math.max(0, Math.min(100, pourcentage)) + '%';
    }
}

const btnPlusWork = document.getElementById('btn-plus-work');
if (btnPlusWork) {
    btnPlusWork.addEventListener('click', () => {
        if (tempsTravail < 60 && !intervalId && !enPause) {
            tempsTravail++;
            valWork.textContent = tempsTravail;
            tempsRestant = tempsTravail * 60;
            majAffichagePomodoro();
        }
    });
}

const btnMinusWork = document.getElementById('btn-minus-work');
if (btnMinusWork) {
    btnMinusWork.addEventListener('click', () => {
        if (tempsTravail > 1 && !intervalId && !enPause) {
            tempsTravail--;
            valWork.textContent = tempsTravail;
            tempsRestant = tempsTravail * 60;
            majAffichagePomodoro();
        }
    });
}

const btnPlusBreak = document.getElementById('btn-plus-break');
if (btnPlusBreak) {
    btnPlusBreak.addEventListener('click', () => {
        if (tempsPause < 30 && !intervalId && enPause) {
            tempsPause++;
            valBreak.textContent = tempsPause;
            tempsRestant = tempsPause * 60;
            majAffichagePomodoro();
        } else if (tempsPause < 30) {
            tempsPause++;
            valBreak.textContent = tempsPause;
        }
    });
}

const btnMinusBreak = document.getElementById('btn-minus-break');
if (btnMinusBreak) {
    btnMinusBreak.addEventListener('click', () => {
        if (tempsPause > 1 && !intervalId && enPause) {
            tempsPause--;
            valBreak.textContent = tempsPause;
            tempsRestant = tempsPause * 60;
            majAffichagePomodoro();
        } else if (tempsPause > 1) {
            tempsPause--;
            valBreak.textContent = tempsPause;
        }
    });
}

const btnPomodoroStart = document.getElementById('pomodoro-start');
if (btnPomodoroStart) {
    btnPomodoroStart.addEventListener('click', () => {
        if (intervalId) return;
        finCibleTimestamp = Date.now() + tempsRestant * 1000;

        intervalId = setInterval(() => {
            const secondesEcoulees = Math.round((finCibleTimestamp - Date.now()) / 1000);
            tempsRestant = Math.max(0, secondesEcoulees);
            majAffichagePomodoro();

            if (tempsRestant <= 0) {
                jouerSonCourt(pomodoroSound);
                
                if (!enPause) {
                    enPause = true;
                    tempsRestant = tempsPause * 60;
                    if (affichageMode) affichageMode.textContent = "MODE: PAUSE";
                    document.querySelector('.Pomodoro-Container').classList.add('pause-mode');
                    document.querySelector('.pomodoro-controls').classList.add('pause-mode');
                    sessionsCompletees++;
                    if (affichageSessions) affichageSessions.textContent = "Sessions complétées: " + sessionsCompletees;
                } else {
                    enPause = false;
                    tempsRestant = tempsTravail * 60;
                    if (affichageMode) affichageMode.textContent = "MODE: TRAVAIL";
                    document.querySelector('.Pomodoro-Container').classList.remove('pause-mode');
                    document.querySelector('.pomodoro-controls').classList.remove('pause-mode');
                }
                finCibleTimestamp = Date.now() + tempsRestant * 1000;
                majAffichagePomodoro();
            }
        }, 250);
    });
}

const btnPomodoroPause = document.getElementById('pomodoro-pause');
if (btnPomodoroPause) {
    btnPomodoroPause.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        finCibleTimestamp = null;
    });
}

const btnPomodoroReset = document.getElementById('pomodoro-reset');
if (btnPomodoroReset) {
    btnPomodoroReset.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        finCibleTimestamp = null;
        enPause = false;
        tempsRestant = tempsTravail * 60;
        if (affichageMode) affichageMode.textContent = "MODE: TRAVAIL";
        document.querySelector('.Pomodoro-Container').classList.remove('pause-mode');
        document.querySelector('.pomodoro-controls').classList.remove('pause-mode');
        majAffichagePomodoro();
    });
}

/* =========================================
   POP UP D'INFORMATION
========================================= */

const dialogueTheme = document.getElementById('dialogue-theme');
const typeNavigation = performance.getEntriesByType('navigation')[0]?.type;

if (dialogueTheme) {
    if (typeNavigation === 'reload' || !sessionStorage.getItem('popup-vue')) {
        dialogueTheme.showModal();
        sessionStorage.setItem('popup-vue', 'oui');
    }

    document.getElementById('dialogue-close')?.addEventListener('click', () => dialogueTheme.close());
}

majAffichagePomodoro();