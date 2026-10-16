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

const derniereLectureSon = new WeakMap();

function jouerSonCourt(audioEl, delaiMin = 0) {
    if (!audioEl) return;
    const maintenant = performance.now();
    if (maintenant - (derniereLectureSon.get(audioEl) ?? -Infinity) < delaiMin) return;
    derniereLectureSon.set(audioEl, maintenant);
    audioEl.currentTime = 0;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {});
    }
}

const TEXTE_LECTURE = '<span class="icone-bouton" aria-hidden="true">&#9654;</span>Lecture';
const TEXTE_PAUSE = '<span class="icone-bouton" aria-hidden="true">&#10074;&#10074;</span>Pause';

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

const DELAI_SON_SURVOL = 150;

emplacementsInventaire.forEach(slot => {
    slot.addEventListener('mouseenter', () => jouerSonCourt(myaudio, DELAI_SON_SURVOL));

    const actionInspecter = slot.nextElementSibling?.classList.contains('Icone-Examiner')
        ? slot.nextElementSibling.querySelector('a, label')
        : null;
    if (!actionInspecter) return;

    let etaitSelectionne = false;
    slot.addEventListener('pointerdown', () => {
        etaitSelectionne = document.activeElement === slot;
    });
    slot.addEventListener('click', () => {
        if (etaitSelectionne) actionInspecter.click();
    });
    slot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            actionInspecter.click();
        }
    });
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
                    if (customPlayBtn) customPlayBtn.innerHTML = TEXTE_LECTURE;
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
            customPlayBtn.innerHTML = TEXTE_PAUSE;
        } else {
            themeAudioPreview.pause();
            customPlayBtn.innerHTML = TEXTE_LECTURE;
            const etatPause = localStorage.getItem('music-pause-survie');
            if (audioActif && etatPause !== 'true') {
                audioActif.play().catch(() => {});
            }
        }
    });

    themeAudioPreview.addEventListener('ended', () => {
        customPlayBtn.innerHTML = TEXTE_LECTURE;
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
    btnActiverTheme.style.display = 'flex';
    
    customPlayBtn.innerHTML = TEXTE_LECTURE;
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
            if (customPlayBtn) customPlayBtn.innerHTML = TEXTE_LECTURE;
            
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
        if (e.target.id !== 'Btn-Carte' && themeAudioPreview && !themeAudioPreview.paused) {
            themeAudioPreview.pause();
            if (customPlayBtn) customPlayBtn.innerHTML = TEXTE_LECTURE;
            const audioActif = getAudioPrincipalActif();
            const etatPause = localStorage.getItem('music-pause-survie');
            if (audioActif && etatPause !== 'true') {
                audioActif.play().catch(() => {});
            }
        }

        if (['radio-cv', 'radio-veille', 'radio-ordi'].includes(e.target.id)) {
            if (fondVideo) fondVideo.pause();
        } else {
            if (fondVideo && fondVideo.paused && !document.hidden) {
                fondVideo.play().catch(() => {});
            }
        }
    });
});

document.addEventListener('visibilitychange', () => {
    if (!fondVideo) return;
    const enExamen = ['radio-cv', 'radio-veille', 'radio-ordi'].some(id => document.getElementById(id)?.checked);
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
        const radioOrdi = document.getElementById('radio-ordi');
        const fermerExamen = document.getElementById('fermer-examen');
        const btnCarte = document.getElementById('Btn-Carte');
        const btnPomodoro = document.getElementById('Btn-Pomodoro');
        const etatInitial = document.getElementById('etat-initial');

        if ([radioCv, radioVeille, radioOrdi].some(radio => radio?.checked)) {
            fermerExamen.checked = true;
            fermerExamen.dispatchEvent(new Event('change'));
        } else if ((btnCarte && btnCarte.checked) || (btnPomodoro && btnPomodoro.checked)) {
            etatInitial.checked = true;
            etatInitial.dispatchEvent(new Event('change'));
        }
        return;
    }

    const touche = e.key.toLowerCase();
    if ((touche === 'a' || touche === 'e') && !(dialogueTheme && dialogueTheme.open)) {
        const onglets = ['Btn-Carte', 'etat-initial', 'Btn-Pomodoro'].map(id => document.getElementById(id));
        const indexOnglet = onglets.findIndex(onglet => onglet && onglet.checked);
        const ongletSuivant = onglets[indexOnglet + (touche === 'e' ? 1 : -1)];
        if (indexOnglet !== -1 && ongletSuivant) {
            ongletSuivant.checked = true;
            ongletSuivant.dispatchEvent(new Event('change'));
            jouerSonCourt(myaudio);
        }
        return;
    }

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
/* =========================================
   PANNEAU SYS.STATUT (HORLOGE, SESSION, ECG)
========================================= */

const horlogeSys = document.getElementById('horloge-sys');
const sessionSys = document.getElementById('session-sys');
const ecgBpm = document.getElementById('ecg-bpm');

const deuxChiffres = (n) => String(n).padStart(2, '0');

function majPanneauStatut() {
    const maintenant = new Date();
    if (horlogeSys) {
        horlogeSys.textContent = `${deuxChiffres(maintenant.getHours())}:${deuxChiffres(maintenant.getMinutes())}:${deuxChiffres(maintenant.getSeconds())}`;
    }
    if (sessionSys) {
        const secondes = Math.floor(performance.now() / 1000);
        sessionSys.textContent = `${deuxChiffres(Math.floor(secondes / 3600))}:${deuxChiffres(Math.floor(secondes / 60) % 60)}:${deuxChiffres(secondes % 60)}`;
    }
}

if (horlogeSys || sessionSys) {
    majPanneauStatut();
    setInterval(majPanneauStatut, 1000);
}

if (ecgBpm) {
    setInterval(() => {
        ecgBpm.textContent = 70 + Math.floor(Math.random() * 5);
    }, 2500);
}

/* =========================================
   INDEX DU DOCUMENT OUVERT (CV / VEILLE)
========================================= */

const sommaireDoc = document.getElementById('sommaire-doc');
const documentsInspectables = {
    'radio-cv': document.querySelector('.CV-Agrandi'),
    'radio-veille': document.querySelector('.Veille-Agrandi'),
    'radio-ordi': document.querySelector('.Contact-Agrandi')
};

function positionDansDoc(titre, doc) {
    return titre.getBoundingClientRect().top - doc.getBoundingClientRect().top + doc.scrollTop;
}

function marquerSectionActive(indexActif) {
    sommaireDoc.querySelectorAll('button').forEach((bouton, i) => bouton.classList.toggle('actif', i === indexActif));
}

function majSectionActive(doc) {
    const titres = doc.querySelectorAll('h3');
    const enBas = doc.scrollTop > 0 && doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 2;
    let indexActif = 0;
    titres.forEach((titre, i) => {
        if (positionDansDoc(titre, doc) - 60 <= doc.scrollTop) indexActif = i;
    });
    if (enBas) indexActif = titres.length - 1;
    marquerSectionActive(indexActif);
}

function construireSommaire(doc) {
    sommaireDoc.replaceChildren();
    doc.querySelectorAll('h3').forEach((titre, i) => {
        const bouton = document.createElement('button');
        bouton.type = 'button';
        const numero = document.createElement('span');
        numero.textContent = deuxChiffres(i + 1);
        bouton.append(numero, titre.textContent.trim());
        bouton.addEventListener('click', () => {
            doc.scrollTo({ top: positionDansDoc(titre, doc) - 20, behavior: 'smooth' });
        });
        const ligne = document.createElement('li');
        ligne.append(bouton);
        sommaireDoc.append(ligne);
    });
    doc.scrollTop = 0;
    marquerSectionActive(0);
}

if (sommaireDoc) {
    Object.entries(documentsInspectables).forEach(([idRadio, doc]) => {
        const radio = document.getElementById(idRadio);
        if (!radio || !doc) return;
        radio.addEventListener('change', () => {
            if (radio.checked) construireSommaire(doc);
        });
        doc.addEventListener('scroll', () => majSectionActive(doc), { passive: true });
    });
}
