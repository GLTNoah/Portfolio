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
        titre: "Pomodoro : la salle de sauvegarde",
        dossier: "SYS.DOSSIER // POMODORO_SALLE_DE_SAUVEGARDE",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## Le point de départ : un exercice d'école

À l'origine, ce Pomodoro était un exercice de ma formation : un minuteur qui alterne des phases de travail et de pause pour aider à rester concentré. La méthode est simple et efficace, mais l'outil lui-même était banal : un gros chiffre, trois boutons, et rien qui donne envie d'y revenir. Je l'avais d'abord intégré tel quel à mon portfolio, habillé aux couleurs du terminal. Il fonctionnait, mais il restait un corps étranger dans un site entièrement pensé comme un jeu vidéo.

Je me suis donc posé une question : et si le Pomodoro n'était pas une application qu'on regarde, mais un endroit où l'on se rend ? Dans la saga Resident Evil, il existe un lieu que tous les joueurs connaissent : la salle de sauvegarde. C'est la pièce calme, éclairée par une seule lampe, où l'on souffle entre deux zones dangereuses, où l'on range ses objets dans un coffre et où l'on enregistre sa progression à la machine à écrire. C'est exactement l'esprit du Pomodoro : un sas de concentration.

## Le principe : chaque objet est une activité

Le minuteur s'est transformé en une petite scène en pixel art que l'on pilote à la souris. On clique sur un objet de la pièce, le personnage marche jusqu'à lui, et l'action lance le chronomètre. Chaque objet correspond à une activité, avec sa propre durée :

- la machine à écrire pour rédiger, pendant 25 minutes ;
- l'ordinateur pour coder, pendant 45 minutes ;
- l'étagère pour réviser, pendant 15 minutes ;
- les herbes vertes pour faire une pause de 5 minutes, comme lorsqu'on se soigne dans le jeu.

Cliquer sur le sol arrête la séance, et le personnage s'y déplace. Recliquer ensuite sur la même activité reprend le chronomètre là où il s'était arrêté. À la fin d'une séance de travail, le personnage part de lui-même se soigner aux herbes, et un ruban d'encre est ajouté dans le coffre : c'est la récompense, qui reste enregistrée d'une visite à l'autre.

## Un décor dessiné entièrement en code

Je n'utilise aucune image pour la pièce : tout est dessiné par le navigateur, pixel par pixel, dans un élément appelé canvas. Les murs, le parquet, le coffre cerclé de métal, la fenêtre condamnée ou la traînée de sang sont décrits par de petites fonctions qui tracent des volumes. Le rendu est ensuite agrandi sans lissage pour garder l'aspect pixel art. L'ambiance compte autant que la mécanique : une seule ampoule éclaire la machine à écrire, le reste de la pièce plonge dans la pénombre, et la couleur du lieu choisi sur la carte teinte légèrement la lumière.

Le personnage change lui aussi selon le lieu : Jill à la bibliothèque, Leon au commissariat (avec Claire qui attend dans la salle), Ada dans la zone industrielle et Grace à l'église. Leurs sprites ont été convertis en grilles de couleurs à partir de références, puis je génère leur animation de marche automatiquement en déplaçant les jambes pixel par pixel.

## Ce que ce projet m'a appris

Transformer un minuteur en mini-jeu m'a obligé à aborder des notions que je n'aurais jamais rencontrées autrement. Il a fallu comprendre la projection isométrique pour placer des objets en fausse 3D, écrire un algorithme de recherche de chemin pour que le personnage contourne les meubles au lieu de les traverser, et séparer la logique du jeu de son affichage pour garder un chronomètre juste même quand l'onglet n'est pas visible. Chacune de ces notions fait l'objet d'une fiche technique dans les archives.

## Bilan de l'opération

Ce projet résume bien ma façon d'apprendre : partir d'un exercice simple, puis le pousser jusqu'à ce qu'il pose de vrais problèmes à résoudre. Le Pomodoro est toujours un outil de concentration utilisable au quotidien, mais il est devenu la partie la plus vivante du portfolio, et celle qui m'a fait le plus progresser en JavaScript.
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
    },

    theme: {
        titre: "Fiche : les variables CSS et les thèmes",
        dossier: "SYS.FICHE // VARIABLES_CSS",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## Le problème : une couleur répétée partout

Sur ce portfolio, chaque lieu de la carte change la couleur de toute l'interface : vert pour la bibliothèque, ambre pour le commissariat, bleu pour la zone industrielle, rouge pour l'église. Au début, chaque couleur était écrite directement dans des dizaines de règles CSS. Changer de thème aurait voulu dire réécrire toutes ces règles, une par une.

## La solution : nommer ses couleurs une seule fois

Le CSS permet de créer des variables, aussi appelées propriétés personnalisées. On donne un nom à une valeur, par exemple --color-primary, et partout dans le code on écrit var(--color-primary) au lieu de la couleur elle-même. Le jour où l'on change la valeur de la variable, toutes les règles qui l'utilisent suivent automatiquement.

Pour les thèmes, je redéfinis simplement ces variables selon un attribut posé sur la page. Quand on choisit l'église sur la carte, le JavaScript écrit data-theme="rouge" sur la balise body, et une règle CSS dit : pour un body rouge, la couleur principale vaut tel rouge. Il n'y a rien d'autre à faire : boutons, bordures, chronomètre et lueurs changent tous ensemble.

## Des variables pour les couleurs semi-transparentes

Une couleur seule ne suffit pas toujours. Pour les halos et les fondus, j'ai besoin de la même teinte avec plus ou moins de transparence. J'ai donc aussi stocké les trois composantes rouge, vert et bleu dans une variable, par exemple --rgb-primary, que j'utilise dans rgba(var(--rgb-primary), 0.3). La même teinte peut ainsi être pleine sur un bouton et presque invisible dans un reflet.

## Aller plus loin : une variable peut en remplacer une autre

En pause, l'interface du Pomodoro prend une couleur différente. Plutôt que de réécrire toutes ses règles, je redéfinis localement la couleur principale pour qu'elle pointe vers la couleur de pause. Tous les éléments à l'intérieur basculent d'un coup. C'est ce qui rend le système si puissant : on ne touche jamais aux composants, seulement aux valeurs qu'ils consultent.

## Ce qu'il faut retenir

- une variable CSS se déclare avec deux tirets et se lit avec var() ;
- elle se transmet aux éléments enfants, et peut être redéfinie localement ;
- changer un thème revient à changer quelques valeurs, pas des centaines de règles.
`
    },

    pixelart: {
        titre: "Fiche : dessiner en pixel art avec le canvas",
        dossier: "SYS.FICHE // CANVAS_ISOMETRIE",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## Le canvas : une feuille blanche programmable

L'élément canvas est une zone de la page dans laquelle on peut dessiner pixel par pixel avec du JavaScript. Contrairement au HTML, il n'y a pas d'éléments à styliser : on donne des ordres comme « remplis ce rectangle de telle couleur ». La salle de sauvegarde du Pomodoro est dessinée ainsi, dans une image de seulement 320 pixels de large, ensuite agrandie à l'écran.

## Garder les pixels nets

Agrandir une petite image la rend normalement floue, car le navigateur lisse les transitions entre les couleurs. Pour le pixel art, on veut l'inverse : des carrés bien nets. Une seule règle CSS suffit, image-rendering: pixelated, qui demande au navigateur d'agrandir chaque pixel en un bloc franc, sans lissage.

## La fausse 3D : la projection isométrique

La pièce est vue en diagonale, comme dans beaucoup de jeux de gestion. On appelle cela la vue isométrique. Le principe est de décrire chaque objet dans un petit monde en trois dimensions, avec une largeur, une profondeur et une hauteur, puis de le convertir en position sur l'écran avec une formule très simple. Avancer vers la droite dans le monde déplace le point vers la droite et un peu vers le bas à l'écran ; avancer en profondeur le déplace vers la gauche et vers le bas ; monter le fait remonter.

Avec cette formule, dessiner un meuble revient à dessiner trois faces : le dessus le plus clair, une face moyenne et une face sombre. Ces trois nuances suffisent à donner l'impression de volume et d'éclairage.

## Des personnages en grilles de couleurs

Chaque personnage est stocké comme une grille de couleurs : une liste de lignes, chaque case contenant une couleur ou rien. Pour l'afficher, il suffit de parcourir la grille et de dessiner un carré par case. Le même principe permet de le retourner pour qu'il regarde dans le sens de sa marche, ou de créer son animation en décalant les pixels de ses jambes d'une image à l'autre.

## Ce qu'il faut retenir

- le canvas dessine des pixels avec du JavaScript, sans éléments HTML ;
- image-rendering: pixelated garde le pixel art net à l'agrandissement ;
- la vue isométrique transforme des coordonnées 3D en position à l'écran ;
- un sprite peut n'être qu'un tableau de couleurs.
`
    },

    chemin: {
        titre: "Fiche : trouver son chemin avec l'algorithme A*",
        dossier: "SYS.FICHE // PATHFINDING",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## Le problème : le personnage traversait les meubles

Dans la première version de la salle de sauvegarde, le personnage marchait en ligne droite vers l'objet cliqué. C'était simple, mais il passait à travers l'ordinateur ou la table de la machine à écrire. Pour qu'il les contourne, il fallait qu'il sache planifier un trajet : c'est ce qu'on appelle la recherche de chemin.

## Découper le sol en cases

La première étape consiste à transformer la pièce en quadrillage, un peu comme une feuille à petits carreaux. Chaque case est soit libre, soit occupée par un meuble. Pour éviter que le personnage frôle les objets, chaque meuble est légèrement élargi : une marge invisible l'entoure.

## L'idée d'A* : explorer d'abord les pistes prometteuses

L'algorithme A* (prononcé « A étoile ») part de la case du personnage et explore ses voisines, puis les voisines de ses voisines, jusqu'à atteindre la destination. Son astuce est de ne pas explorer au hasard. Pour chaque case, il additionne deux choses : la distance déjà parcourue depuis le départ, et une estimation de la distance qui reste jusqu'à l'arrivée, à vol d'oiseau. Il explore toujours en priorité la case dont ce total est le plus petit.

Résultat : il avance naturellement vers la destination, et ne s'écarte que lorsqu'un obstacle l'y oblige. Quand il atteint enfin la case d'arrivée, il remonte le chemin à l'envers, case par case, pour reconstituer le trajet complet.

## Rendre la marche naturelle

Un trajet case par case donne une marche en escalier, peu naturelle. J'ai donc ajouté une étape de simplification : tant que la ligne droite entre deux points du trajet ne traverse aucun meuble, on supprime les points intermédiaires. Le personnage marche ainsi en ligne droite dès que c'est possible, et ne change de direction qu'aux coins des obstacles. Si l'on clique directement sur un meuble, la destination est ramenée au point libre le plus proche.

## Ce qu'il faut retenir

- la recherche de chemin commence par découper l'espace en cases libres ou occupées ;
- A* explore en priorité les cases qui semblent le plus proches du but ;
- on simplifie ensuite le trajet pour une marche fluide.
`
    },

    boucle: {
        titre: "Fiche : la boucle de jeu et la mesure du temps",
        dossier: "SYS.FICHE // BOUCLE_DE_JEU",
        statut: "DÉCLASSIFIÉ",
        auteur: "N. GUILLOT",
        contenu: `
## Un minuteur qui dérive

Pour compter le temps, le réflexe de débutant est d'enlever une seconde à chaque tic d'un minuteur JavaScript. Le problème, c'est que ces tics ne sont pas garantis : si l'ordinateur est occupé ou si l'onglet passe en arrière-plan, le navigateur les retarde ou les espace. Au bout de vingt-cinq minutes, le chronomètre peut avoir plusieurs secondes de retard.

## La solution : se fier à l'horloge, pas aux tics

Au lieu de compter les tics, je note l'heure exacte à laquelle la séance doit se terminer. À chaque mise à jour, je calcule simplement le temps restant entre maintenant et cette heure de fin. Même si une mise à jour arrive en retard, l'affichage reste juste, car il repose sur l'horloge de l'ordinateur.

## Séparer la logique et l'affichage

La salle de sauvegarde est un petit jeu, et comme tous les jeux elle tourne en boucle : à chaque instant, on met à jour l'état du monde (où est le personnage, combien de temps reste-t-il), puis on le dessine. J'ai séparé ces deux étapes.

- la logique tourne avec un minuteur régulier, environ soixante fois par seconde, et continue même quand l'onglet est caché : une séance qui se termine en arrière-plan est bien comptée ;
- le dessin utilise requestAnimationFrame, une fonction du navigateur qui affiche une image juste avant chaque rafraîchissement de l'écran. Elle se met automatiquement en pause quand la page n'est pas visible, ce qui économise la batterie.

## Le temps écoulé entre deux images

Pour que le personnage marche à la même vitesse sur un ordinateur rapide et sur un ordinateur lent, je ne le déplace pas d'une distance fixe à chaque image. Je mesure le temps écoulé depuis la mise à jour précédente et je multiplie la vitesse par ce temps. C'est la notion de delta time, utilisée dans tous les moteurs de jeu.

## Ce qu'il faut retenir

- pour mesurer le temps, on compare des heures plutôt que de compter des tics ;
- la logique et l'affichage d'un jeu gagnent à être séparés ;
- requestAnimationFrame dessine au rythme de l'écran ;
- multiplier la vitesse par le temps écoulé rend le mouvement indépendant de la machine.
`
    },
};
