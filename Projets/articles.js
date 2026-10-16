/* =========================================
   ARTICLES DES PROJETS
   
   Pour ajouter un article : copier un bloc ci-dessous, lui donner un
   identifiant unique (ex. « monprojet »), puis le lier depuis
   Projets.html avec : Projets/Article.html?id=monprojet

   Format du champ « contenu » :
     ## Titre de section        -> nouvelle section
     (ligne vide)               -> sépare deux paragraphes
     - élément                  -> liste à puces
     ![Légende](../Image/x.png) -> image (chemin depuis le dossier Projets)
   Le texte est affiché tel quel : pas besoin d'échapper les accents
   ni les apostrophes. Seul le caractère ` (accent grave) est interdit.
========================================= */

window.ARTICLES = {
    portfolio: {
        titre: "Portfolio Terminal",
        dossier: "SYS.DOSSIER // PORTFOLIO_TERMINAL",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## Le point de départ : pourquoi ce projet ?

Lorsque l'on débute dans le domaine du développement web, on se rend très vite compte que le marché est vaste et qu'il regorge de profils compétents. Dès le départ, mon objectif principal était extrêmement clair : je devais absolument trouver un moyen de me démarquer. Je ne voulais pas me contenter de créer un site classique, lisse, blanc et minimaliste, semblable à des milliers d'autres portfolios que l'on peut croiser sur internet. Je souhaitais concevoir une véritable expérience immersive, un univers unique qui reflète non seulement ma personnalité et mes goûts, mais qui prouve également ma capacité à mener à bien une vision créative complexe.

J'ai donc fait le choix audacieux de m'inspirer de l'esthétique si particulière des vieux terminaux informatiques des années 90, en y mêlant l'ambiance sombre et intrigante des jeux vidéo de la saga Resident Evil. C'était un pari risqué car ce type de design demande beaucoup de précision, mais c'était surtout le moyen idéal d'avoir un projet personnel profondément motivant. Dans l'apprentissage de la programmation, la théorie ne suffit pas : on apprend toujours beaucoup plus vite, et de manière beaucoup plus durable, lorsque l'on est passionné par ce que l'on est en train de construire. Ce portfolio est ma vitrine professionnelle. Il ne se contente pas d'afficher une liste de compétences, il prouve concrètement que je maîtrise les bases fondamentales du développement, que je suis capable de structurer un projet de A à Z, d'imaginer une direction artistique cohérente, et surtout, de trouver les solutions techniques nécessaires pour que cette vision prenne vie à l'écran.

## La fondation visuelle : maîtriser HTML et CSS

La première grande étape de mon apprentissage s'est concentrée sur la maîtrise absolue de la structure de la page avec le langage HTML, puis sur son habillage complet avec le CSS. Pour réussir à donner cet aspect authentique de vieil écran d'ordinateur à mon interface, j'ai dû étudier en profondeur la manière dont on peut manipuler la lumière, les ombres et les couleurs directement dans le code. J'ai par exemple appris à utiliser de manière avancée les propriétés "box-shadow" pour créer l'illusion d'une lueur verte et néon qui émane des fenêtres et des textes. Mais le design ne s'arrête pas à des images fixes : j'ai passé énormément de temps à travailler sur des animations CSS complexes pour recréer virtuellement l'effet d'un tube cathodique. Cela implique de coder un léger clignotement permanent de l'écran, ainsi que le défilement de lignes de balayage subtiles qui parcourent l'image de haut en bas, caractéristiques des moniteurs de l'époque.

C'est un travail d'une très grande précision où chaque pixel et chaque opacité comptent pour que l'illusion soit parfaite et ne fatigue pas les yeux de l'utilisateur. Au-delà de ces effets visuels, j'ai également mis en place une architecture CSS moderne basée sur un système de "variables". Cette technique m'a permis de concevoir plusieurs thèmes de couleurs différents, comme le vert classique, un rouge d'alerte ou un bleu industriel. L'énorme avantage de cette méthode est que je n'ai pas besoin de réécrire des centaines de lignes de code pour changer l'apparence du site : il me suffit de modifier une seule de ces variables principales pour que l'intégralité de l'interface, des bordures jusqu'aux textes, s'adapte instantanément à la nouvelle ambiance choisie.

## L'interactivité et l'exploration du format SVG

Pour pousser l'immersion encore plus loin et ajouter une véritable dimension interactive à mon portfolio, j'ai voulu intégrer une carte dynamique permettant de naviguer entre les différentes sections. C'est à ce moment-là que j'ai dû me pencher sur l'étude du format SVG. Contrairement à une image classique de type JPEG ou PNG, qui est composée de minuscules carrés de couleurs et qui devient irrémédiablement floue dès qu'on essaie de zoomer dessus, le SVG est une image dessinée par l'ordinateur à l'aide de formules mathématiques. Cela signifie qu'il reste toujours d'une netteté absolue, peu importe la taille de l'écran.

Mais la véritable force du SVG, et la raison pour laquelle je tenais à l'utiliser, c'est que l'on peut interagir avec ses éléments internes directement grâce au code. En étudiant son fonctionnement, j'ai été capable de tracer des zones cliquables très spécifiques sur ma carte, correspondant à des lieux comme l'église ou le commissariat. Ensuite, j'ai pu lier ces zones mathématiques à mon code CSS pour leur demander de se mettre en surbrillance, de changer de couleur ou d'afficher un ciblage rouge lorsque la souris de l'utilisateur passe au-dessus. C'est une technique particulièrement puissante et très utilisée dans la création d'interfaces modernes, que j'ai pris énormément de plaisir à découvrir et à maîtriser pour donner un côté "radar tactique" à ma navigation.

## Le défi du JavaScript et l'optimisation des performances

C'est indiscutablement avec le langage JavaScript que j'ai rencontré le plus de difficultés lors de la création de ce projet, mais c'est également dans ce domaine que j'ai réalisé mes plus grands progrès d'apprentissage. Dans un premier temps, j'avais eu l'idée de tout faire fonctionner uniquement avec du CSS, en utilisant des astuces complexes pour ouvrir les dossiers et naviguer dans les menus. Si le résultat visuel était au rendez-vous, la réalité technique était toute autre : cela demandait beaucoup trop de calculs à l'ordinateur. Entre la vidéo haute définition qui tournait en boucle en arrière-plan, les filtres de lumière superposés et les animations cathodiques constantes, le processeur graphique saturait et le site se mettait à subir de gros ralentissements. J'ai très vite compris qu'il était indispensable d'utiliser le JavaScript, qui agit comme le "cerveau" de la page, pour optimiser les performances de manière intelligente.

Le concept que j'ai dû mettre en place était logique mais complexe à coder : il fallait ordonner au navigateur de mettre physiquement la vidéo en pause et de désactiver totalement les effets visuels les plus lourds au moment exact où j'ouvrais un grand dossier textuel, puis de tout relancer de manière invisible à la fermeture de celui-ci. Le JavaScript m'a également été indispensable pour concevoir la partie audio du site, qui est particulièrement riche. J'ai dû coder une barre de volume générale qui contrôle plusieurs pistes sonores en même temps, gérer le changement des musiques en fonction de la zone de la carte sélectionnée, et synchroniser des bruitages spécifiques lors des interactions avec l'interface. Pour réussir à écrire toute cette logique algorithmique sans me perdre, j'ai dû faire preuve de beaucoup de résilience. Je ne compte plus les heures passées à chercher des solutions sur internet, à lire des dizaines de discussions sur des forums de développeurs, ou encore à analyser des tutoriels sur YouTube pour décortiquer le code d'autres programmeurs et comprendre comment ils avaient contourné des problèmes similaires. C'est ce travail de recherche acharné qui m'a permis d'assembler les pièces du puzzle et d'obtenir un site parfaitement fluide.

## La persistance des données avec le localStorage

Au fil du développement, un nouveau problème majeur s'est présenté à moi : la persistance des données. Sur un site web traditionnel, dès que vous cliquez sur un lien pour changer de page, le navigateur efface tout et recharge une nouvelle page à partir de zéro. Cependant, dans mon univers immersif, ce comportement détruisait totalement l'expérience utilisateur. Si un visiteur avait pris le temps de sélectionner le thème rouge sur la carte et de baisser le volume de la musique parce qu'il le trouvait trop fort, il était inacceptable que ces réglages soient oubliés et que la musique lui hurle à nouveau dans les oreilles en arrivant sur la page de mes projets.

Pour contourner cette contrainte technique, j'ai étudié le fonctionnement du "localStorage". Il s'agit d'une petite mémoire intégrée directement dans le navigateur internet de l'utilisateur, qui permet aux développeurs de sauvegarder des informations spécifiques. En apprenant à manipuler cet outil avec JavaScript, j'ai réussi à créer un système de sauvegarde automatique. Désormais, chaque fois que l'utilisateur modifie le volume, choisit une nouvelle ambiance sonore, change la vidéo de fond ou sélectionne un personnage, mon code écrit ces informations dans cette petite mémoire. Ainsi, lors de la transition vers une autre page du portfolio, le site va immédiatement lire ce fichier de sauvegarde avant même d'afficher quoi que ce soit, et va réappliquer instantanément les paramètres choisis. C'est un détail technique qui ne se voit pas à l'écran, mais qui fait toute la différence entre un simple prototype d'étudiant et une application web aboutie, fluide et professionnelle.

## Bilan et compétences acquises

Aujourd'hui, lorsque je regarde ce portfolio terminé, je vois bien plus qu'une simple page web regroupant mes travaux ; j'y vois la preuve concrète de ma détermination et de mon évolution. Ce projet démontre de manière indiscutable que je suis capable de m'auto-former face à l'inconnu, de chercher des solutions pertinentes par moi-même lorsqu'un bug complexe me bloque, et surtout, d'avoir le recul nécessaire pour repenser complètement la structure de mon code afin d'en améliorer les performances globales.

Je ressors de cette expérience fondatrice avec des bases extrêmement solides en intégration web, une maîtrise approfondie des mécaniques de l'HTML et du CSS, et une très bonne compréhension de la logique algorithmique grâce à la manipulation du JavaScript. Mais l'apprentissage le plus précieux que je tire de ces semaines de travail, c'est la certitude que je suis fait pour ce métier. J'ai découvert qu'en programmation, il existe toujours une solution technique pour contourner un obstacle. Il suffit d'avoir la patience de chercher, la curiosité de comprendre le fonctionnement des technologies, et l'envie constante de s'améliorer.
`
    },

    pomodoro: {
        titre: "Pomodoro",
        dossier: "SYS.DOSSIER // POMODORO PROJET",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## L'origine : d'un projet scolaire à une intégration complète

À l'origine, la création de ce chronomètre Pomodoro était un exercice donné dans le cadre de ma formation. L'objectif initial était relativement classique : concevoir une application web capable de gérer des cycles de travail et de pause pour améliorer la productivité. Cependant, une fois le code de base fonctionnel, j'ai pris la décision de ne pas le laisser de côté comme un simple exercice d'école. J'ai voulu pousser la démarche plus loin en l'intégrant directement au cœur de mon portfolio interactif. Cette démarche m'a permis de transformer un projet d'apprentissage standard en une fonctionnalité concrète et utile, tout en me forçant à adapter mon code pour qu'il cohabite parfaitement avec l'environnement complexe de mon terminal des années 90.

## L'adaptation graphique et l'interface unique

L'intégration de ce chronomètre nécessitait une refonte visuelle totale. La plupart des applications Pomodoro que l'on trouve sur internet utilisent des designs très doux, souvent accompagnés de dessins de tomates pour rappeler le minuteur de cuisine original. Pour mon portfolio, il fallait casser ces codes. J'ai donc entièrement repensé l'interface en utilisant le CSS pour qu'elle s'aligne sur la direction artistique de mon univers. J'ai opté pour une typographie brute de type console, des compteurs numériques imposants et des boutons de contrôle minimalistes. Le défi était de garder l'outil parfaitement lisible et intuitif à utiliser, tout en conservant cette atmosphère sombre, militaire et confidentielle propre au reste de mon site.

## La logique algorithmique et le JavaScript

Le développement du mécanisme interne du chronomètre a été un excellent entraînement pour renforcer ma logique de programmation en JavaScript. Créer un minuteur demande une grande rigueur dans la manipulation du temps. J'ai dû apprendre à utiliser des fonctions spécifiques comme les intervalles pour demander au navigateur de déduire une seconde de manière régulière et précise. Mais la complexité ne s'arrête pas au simple décompte : il fallait coder toute la logique de transition. Le programme doit savoir exactement quand le temps de travail de vingt-cinq minutes est écoulé, arrêter le compteur, basculer automatiquement sur le temps de pause de cinq minutes, et modifier l'affichage pour prévenir l'utilisateur. La gestion des boutons pour mettre en pause, reprendre ou réinitialiser le cycle complet m'a demandé de structurer mon code proprement pour éviter les bugs.

## Les défis de l'intégration dans l'écosystème

Insérer ce projet scolaire dans le portfolio existant a soulevé de nouveaux défis techniques très intéressants. Sur une page web isolée, un minuteur fonctionne sans aucune contrainte extérieure. Mais ici, le chronomètre devait tourner en même temps que la vidéo d'arrière-plan, la musique d'ambiance et les filtres visuels cathodiques de mon interface. J'ai dû veiller à ce que l'exécution de mon code JavaScript n'alourdisse pas la page et ne provoque pas de ralentissements. J'ai également dû m'assurer que le script du Pomodoro n'entre pas en conflit avec les autres scripts du site, comme celui de la sauvegarde des thèmes de couleurs ou du panneau de contrôle latéral. C'était un véritable exercice d'architecture logicielle à mon échelle.

## Bilan de l'opération

Ce qui ne devait être qu'un exercice d'école s'est transformé en une véritable leçon de développement web global. J'ai pu constater la différence entre coder une petite application isolée et l'intégrer dans un environnement de production plus large. J'ai consolidé mes acquis sur la manipulation du temps en JavaScript, l'utilisation des événements liés aux boutons, et l'adaptation d'un design strict via le CSS. Au final, cette démarche illustre parfaitement ma vision de l'apprentissage : ne jamais se contenter du strict minimum, chercher constamment à réutiliser ses connaissances, et transformer des exercices théoriques en outils pratiques et personnalisés.
`
    },

    svg: {
        titre: "Apprentissage SVG",
        dossier: "SYS.DOSSIER // SVG APPRENTISSAGE",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## L'idée de base : donner vie à une carte statique

Pour rendre l'expérience de mon portfolio vraiment mémorable, je savais que la navigation classique avec un simple menu textuel en haut de l'écran ne suffirait pas. Je voulais que l'utilisateur soit plongé dans mon univers dès la première seconde. L'idée m'est alors venue d'utiliser une carte de ville isométrique sombre, rappelant une cité en proie au chaos comme dans les jeux Resident Evil, et de m'en servir comme point central de navigation. Cependant, je faisais face à un problème technique majeur : une image classique au format JPEG ou PNG est complètement plate et inerte. Il m'était impossible de dire au navigateur internet de réagir uniquement quand la souris de l'utilisateur passait précisément sur le toit de l'hôpital, sur l'église ou sur le commissariat. Il me fallait une technologie capable de superposer des zones interactives sur-mesure par-dessus mon image de fond de ville ruinée, et c'est là que j'ai découvert toute la puissance du format SVG.

## La compréhension du format SVG

Avant de me lancer dans l'écriture du code, j'ai dû étudier ce qu'est réellement un fichier SVG (Scalable Vector Graphics). Contrairement à une photographie classique qui est composée de millions de petits carrés de couleur minuscules appelés pixels, le SVG est en fait un dessin généré par des mathématiques et du texte. C'est littéralement du code qui explique au navigateur web comment tracer des lignes, des cercles ou des formes géométriques complexes. Le premier énorme avantage de ce format vectoriel, c'est qu'il ne devient jamais flou ou pixelisé, peu importe à quel point on zoome dessus. Mais l'avantage le plus crucial pour mon projet interactif, c'est que chaque forme dessinée en SVG est considérée par le navigateur internet comme un véritable élément HTML à part entière. Cela signifie que je pouvais interagir avec ces formes géométriques de la même manière que j'interagis avec un lien ou un bouton classique sur une page web.

## Le travail d'orfèvre : tracer les zones tactiques

La phase de réalisation de la carte a été un véritable travail de précision. J'ai importé mon image de la ville en arrière-plan, puis j'ai dû coder manuellement une surcouche invisible en SVG par-dessus. L'objectif était de créer des polygones mathématiques qui épousent parfaitement les contours des bâtiments importants de la carte. Comme la ville est dessinée avec une perspective isométrique (vue de trois quarts et légèrement de biais), je ne pouvais pas me contenter de tracer de simples rectangles bien droits. J'ai dû placer une par une les coordonnées X et Y de chaque point de mes polygones pour qu'ils suivent les angles des toits, les façades et les murs de l'hôpital ou du poste de police avec une très grande exactitude. C'était une tâche particulièrement minutieuse et répétitive, mais absolument nécessaire pour que l'illusion soit parfaite et que l'utilisateur ait réellement l'impression de manipuler un radar de ciblage tactique de haute précision.

## L'habillage visuel et l'immersion avec le CSS

Une fois mes zones invisibles correctement placées sur la carte de la ville, il fallait les rendre visuellement intéressantes et réactives pour l'utilisateur. J'ai donc relié mon code SVG géométrique à mon code CSS pour l'habillage visuel. L'idée de conception était de simuler un système informatique de ciblage ou de scanner. J'ai programmé le CSS pour que, lorsque le curseur de la souris survole un bâtiment spécifique, le polygone invisible s'allume instantanément. J'y ai ajouté des effets de lueur colorée, des bordures vives qui se détachent de la pénombre de la ville, et de légers changements d'opacité. Grâce à ces manipulations visuelles, la carte statique de base a soudainement pris vie. Le simple fait de glisser son curseur sur les différents quartiers de la ville donne une sensation immédiate de contrôle et d'exploration, transformant un simple menu de navigation web en une véritable interface de jeu vidéo.

## JavaScript : connecter la carte aux fonctionnalités

L'étape finale, et de loin la plus complexe sur le plan algorithmique, a consisté à rendre ces zones vectorielles SVG réellement interactives au clic. Il ne suffisait pas qu'elles s'allument au survol, il fallait impérativement qu'elles déclenchent des actions concrètes dans le reste du portfolio. J'ai dû utiliser le JavaScript pour "écouter" et capter les clics de l'utilisateur sur ces bâtiments. Par exemple, le fait de cliquer sur une zone spécifique devait pouvoir changer le thème de couleur global du terminal, lancer une nouvelle piste audio d'ambiance en fond, et mettre à jour dynamiquement les informations textuelles affichées sur le moniteur de contrôle. La manipulation du format SVG via le JavaScript n'est pas évidente quand on débute, car le code réagit parfois de manière très différente des éléments HTML classiques. Pour surmonter ces obstacles techniques et éviter les bugs de collision de clics, j'ai passé de nombreuses heures à faire des recherches sur internet et à décortiquer des tutoriels sur YouTube. J'ai analysé des exemples de code complexes pour comprendre la logique sous-jacente et l'adapter de manière sécurisée à mon propre projet de carte.

## Bilan et compétences techniques acquises

L'intégration et la manipulation avancée de cette carte SVG interactive a été l'un des défis techniques les plus stimulants de la création de ce portfolio. Ce composant spécifique m'a permis de démystifier complètement l'utilisation des images vectorielles dans le développement web moderne. J'ai concrètement appris qu'une image ne doit pas forcément être un élément passif et décoratif sur une page, mais qu'elle peut devenir le cœur même de la navigation et de l'interactivité d'une application web. Ce travail méticuleux m'a demandé de la rigueur mathématique pour le tracé exact des zones géométriques, de la créativité pour concevoir l'habillage visuel réactif en CSS, et une forte logique de programmation pour gérer la synchronisation des événements en JavaScript. Au final, le résultat dépasse mes attentes de départ : j'ai réussi à construire une interface de navigation atypique, totalement immersive, et techniquement très robuste, qui démontre ma capacité à lier un design ambitieux à un développement front-end exigeant.
`
    }
};
