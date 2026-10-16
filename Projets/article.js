/* =========================================
   PAGE ARTICLE (MODÈLE UNIQUE)
========================================= */

const wrapper = document.querySelector('.Document-Wrapper');
const conteneurContenu = document.getElementById('article-contenu');
const sommaireArticle = document.getElementById('sommaire-article');

/* =========================================
   VIDÉO DE FOND SAUVEGARDÉE
========================================= */

try {
    const video = JSON.parse(localStorage.getItem('donnees-survie'))?.video;
    const fondVideo = document.querySelector('.fond-video');
    if (video && fondVideo) fondVideo.src = '../' + video.replace(/^\.\//, '');
} catch (e) {}

/* =========================================
   MISE EN FORME DU CONTENU
========================================= */

function creer(balise, classe) {
    const element = document.createElement(balise);
    if (classe) element.className = classe;
    return element;
}

function ajouterTexte(element, texte) {
    texte.split(/(\*\*[^*]+\*\*)/).forEach((morceau) => {
        if (morceau.startsWith('**') && morceau.endsWith('**') && morceau.length > 4) {
            const gras = creer('strong');
            gras.textContent = morceau.slice(2, -2);
            element.append(gras);
        } else if (morceau) {
            element.append(morceau);
        }
    });
}

function rendreContenu(texte) {
    let section = null;
    let liste = null;
    let paragraphe = [];
    const cible = () => section ?? conteneurContenu;

    const fermerParagraphe = () => {
        if (!paragraphe.length) return;
        const p = creer('p', 'Article-Paragraphe');
        ajouterTexte(p, paragraphe.join(' '));
        cible().append(p);
        paragraphe = [];
    };

    texte.trim().split('\n').forEach((brute) => {
        const ligne = brute.trim();

        if (!ligne) {
            fermerParagraphe();
            liste = null;
            return;
        }

        if (ligne.startsWith('## ')) {
            fermerParagraphe();
            liste = null;
            section = creer('section', 'Article-Section');
            const titre = creer('h2', 'Article-Titre');
            titre.textContent = ligne.slice(3);
            section.append(titre);
            conteneurContenu.append(section);
            return;
        }

        const image = ligne.match(/^!\[(.*)\]\((.+)\)$/);
        if (image) {
            fermerParagraphe();
            liste = null;
            const figure = creer('figure', 'Article-Figure');
            const img = creer('img');
            img.src = image[2];
            img.alt = image[1];
            img.loading = 'lazy';
            figure.append(img);
            if (image[1]) {
                const legende = creer('figcaption');
                legende.textContent = image[1];
                figure.append(legende);
            }
            cible().append(figure);
            return;
        }

        if (ligne.startsWith('- ')) {
            fermerParagraphe();
            if (!liste) {
                liste = creer('ul', 'Article-Liste');
                cible().append(liste);
            }
            const element = creer('li');
            ajouterTexte(element, ligne.slice(2));
            liste.append(element);
            return;
        }

        liste = null;
        paragraphe.push(ligne);
    });

    fermerParagraphe();
}

/* =========================================
   INDEX DES SECTIONS
========================================= */

function positionDansPage(element) {
    return element.getBoundingClientRect().top - wrapper.getBoundingClientRect().top + wrapper.scrollTop;
}

function majSectionActive() {
    const boutons = sommaireArticle.querySelectorAll('button');
    const titres = conteneurContenu.querySelectorAll('.Article-Titre');
    const enBas = wrapper.scrollTop > 0 && wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 2;
    let indexActif = 0;
    titres.forEach((titre, i) => {
        if (positionDansPage(titre) - 120 <= wrapper.scrollTop) indexActif = i;
    });
    if (enBas) indexActif = titres.length - 1;
    boutons.forEach((bouton, i) => bouton.classList.toggle('actif', i === indexActif));
}

function construireSommaire() {
    conteneurContenu.querySelectorAll('.Article-Titre').forEach((titre, i) => {
        const bouton = creer('button');
        bouton.type = 'button';
        const numero = creer('span');
        numero.textContent = String(i + 1).padStart(2, '0');
        bouton.append(numero, titre.textContent);
        bouton.addEventListener('click', () => {
            wrapper.scrollTo({ top: positionDansPage(titre) - 40, behavior: 'smooth' });
        });
        const ligne = creer('li');
        ligne.append(bouton);
        sommaireArticle.append(ligne);
    });
    majSectionActive();
    wrapper.addEventListener('scroll', majSectionActive, { passive: true });
}

/* =========================================
   CHARGEMENT DE L'ARTICLE
========================================= */

const identifiant = new URLSearchParams(location.search).get('id');
const article = window.ARTICLES?.[identifiant];

if (article) {
    document.title = `${article.titre} - Archives`;
    document.getElementById('article-titre').textContent = article.titre;
    document.getElementById('article-dossier').textContent = article.dossier ?? '';
    document.getElementById('article-statut').textContent = article.statut ?? '';
    document.getElementById('article-auteur').textContent = article.auteur ?? '';
    rendreContenu(article.contenu ?? '');
    construireSommaire();
} else {
    document.title = 'Fichier introuvable - Archives';
    document.getElementById('article-titre').textContent = 'Fichier introuvable';
    document.querySelector('.Document-Meta').hidden = true;
    const message = creer('p', 'Article-Paragraphe');
    message.textContent = `> Aucun fichier ne correspond à l'identifiant « ${identifiant ?? ''} ». Retournez aux archives pour en choisir un.`;
    conteneurContenu.append(message);
}

/* =========================================
   OPTIONS DE LECTURE
========================================= */

let zoomFactor = 1;
const racine = document.documentElement;

document.getElementById('btn-zoom-in').addEventListener('click', () => {
    if (zoomFactor < 1.6) {
        zoomFactor += 0.1;
        racine.style.setProperty('--zoom-factor', zoomFactor);
    }
});

document.getElementById('btn-zoom-out').addEventListener('click', () => {
    if (zoomFactor > 0.8) {
        zoomFactor -= 0.1;
        racine.style.setProperty('--zoom-factor', zoomFactor);
    }
});

document.getElementById('btn-lecture').addEventListener('click', (e) => {
    const actif = document.body.classList.toggle('lecture-pure');
    e.currentTarget.classList.toggle('actif', actif);
});

document.getElementById('btn-print').addEventListener('click', () => window.print());

document.getElementById('btn-top').addEventListener('click', () => {
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('btn-bottom').addEventListener('click', () => {
    wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
});
