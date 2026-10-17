/* =========================================
   SALLE DE SAUVEGARDE (POMODORO EN PIXEL ART)
========================================= */

(() => {
if (!document.getElementById('salle-sauvegarde')) return;

/* ---------- DÉCOR (dessiné une seule fois) ---------- */
const decorCanvas = document.createElement('canvas');
decorCanvas.width = 320; decorCanvas.height = 192;
let c = decorCanvas.getContext('2d');
const W = 150, D = 120, H = 50;
const OX = 150, OY = 56;
const P = (x, y, z = 0) => [OX + (x - y), OY + (x + y) / 2 - z];
const px = (x, y, col) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), 1, 1); };

// Bruit déterministe (pour que le dessin soit identique à chaque chargement)
let graine = 7;
const alea = () => (graine = (graine * 16807) % 2147483647) / 2147483647;

function poly(points, col) {
    const pts = points.map((p) => P(...p));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    c.fillStyle = col;
    for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++) {
        for (let x = Math.floor(Math.min(...xs)); x <= Math.ceil(Math.max(...xs)); x++) {
            const qx = x + 0.5, qy = y + 0.5;
            let dedans = false;
            for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
                const [xi, yi] = pts[i], [xj, yj] = pts[j];
                if ((yi > qy) !== (yj > qy) && qx < (xj - xi) * (qy - yi) / (yj - yi) + xi) dedans = !dedans;
            }
            if (dedans) c.fillRect(x, y, 1, 1);
        }
    }
}
const murD = (x, z, w, h, col) => poly([[x, 0, z], [x + w, 0, z], [x + w, 0, z + h], [x, 0, z + h]], col);   // mur droit (y = 0)
const murG = (y, z, d, h, col) => poly([[0, y, z], [0, y + d, z], [0, y + d, z + h], [0, y, z + h]], col);   // mur gauche (x = 0)
const sol = (x, y, w, d, col) => poly([[x, y], [x + w, y], [x + w, y + d], [x, y + d]], col);

function boite(x, y, z, w, d, h, [dessus, gauche, droite], contour = '#050403') {
    poly([[x - 1, y + d + 1, z - 1], [x + w + 1, y + d + 1, z - 1], [x + w + 1, y - 1, z - 1], [x + w + 1, y - 1, z + h + 1], [x - 1, y - 1, z + h + 1], [x - 1, y + d + 1, z + h + 1]], contour);
    poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], gauche);
    poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], droite);
    poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], dessus);
    poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + 1, z + h], [x, y + 1, z + h]], 'rgba(255,255,255,0.08)');
}
const ombreSol = (x, y, w, d) => sol(x + 2, y + 2, w + 3, d + 3, 'rgba(0,0,0,0.45)');

/* ======================= SOL ======================= */
const T = 15;
for (let i = 0; i < W / T; i++) for (let j = 0; j < D / T; j++) {
    sol(i * T, j * T, T, T, (i + j) % 2 ? '#24221d' : '#141310');
    sol(i * T, j * T, T, 0.6, 'rgba(255,255,255,0.03)');
}
// Carreaux fissurés
[[38, 98], [112, 50], [70, 20]].forEach(([x, y]) => {
    for (let k = 0; k < 9; k++) { const [sx, sy] = P(x + k, y + (k % 3) - 1); px(sx, sy, '#070605'); }
});
// Poussière / saleté
for (let k = 0; k < 260; k++) { const [sx, sy] = P(alea() * W, alea() * D); px(sx, sy, 'rgba(0,0,0,0.35)'); }

/* ======================= MURS ======================= */
murG(0, 0, D, H, '#1b2619');
murD(0, 0, W, H, '#223020');
for (let k = 5; k < D; k += 7) murG(k, 18, 1, H - 18, '#151f14');
for (let k = 5; k < W; k += 7) murD(k, 18, 1, H - 18, '#1a2618');
// Motif du papier peint
for (let k = 8; k < D; k += 14) for (let z = 24; z < H; z += 10) murG(k, z, 2, 2, '#25331f');
for (let k = 8; k < W; k += 14) for (let z = 24; z < H; z += 10) murD(k, z, 2, 2, '#2a3a24');
// Papier peint arraché (plâtre dessous)
murD(48, 30, 14, 9, '#5a5040'); murD(50, 32, 9, 5, '#6a6050'); murD(58, 27, 5, 4, '#5a5040');
murG(28, 34, 10, 8, '#4a4234'); murG(30, 36, 6, 4, '#5a5040');
// Lambris
murG(0, 0, D, 18, '#2a1c12'); murD(0, 0, W, 18, '#34241a');
for (let k = 4; k < D; k += 16) murG(k, 3, 12, 12, '#24180f');
for (let k = 4; k < W; k += 16) murD(k, 3, 12, 12, '#2c1e14');
murG(0, 18, D, 2, '#46331f'); murD(0, 18, W, 2, '#56402a');
// Fissures
const fissure = (pts) => pts.forEach(([x, y, z]) => { const [sx, sy] = P(x, y, z); px(sx, sy, '#070a06'); });
fissure([[0, 60, 49], [0, 61, 47], [0, 61, 46], [0, 62, 44], [0, 63, 43], [0, 63, 41], [0, 64, 39], [0, 66, 38], [0, 67, 36]]);
fissure([[118, 0, 49], [119, 0, 47], [119, 0, 45], [121, 0, 44], [122, 0, 42], [122, 0, 40], [124, 0, 39]]);
// Arête de coupe
poly([[-4, -4, H], [0, -4, H], [0, D, H], [-4, D, H]], '#0c0a08');
poly([[-4, -4, H], [W, -4, H], [W, 0, H], [-4, 0, H]], '#0c0a08');
poly([[-4, D, 0], [0, D, 0], [0, D, H], [-4, D, H]], '#0a0807');
poly([[W, -4, 0], [W, 0, 0], [W, 0, H], [W, -4, H]], '#0a0807');
// Toiles d'araignée dans l'angle
for (let k = 0; k < 10; k++) { const [sx, sy] = P(0, k, H - k); px(sx, sy, 'rgba(200,200,190,0.35)'); const [tx, ty] = P(k, 0, H - k); px(tx, ty, 'rgba(200,200,190,0.35)'); }
for (let k = 0; k < 6; k++) { const [sx, sy] = P(0, 0, H - 4 - k); px(sx + k, sy + 1, 'rgba(200,200,190,0.25)'); px(sx - k, sy + 1, 'rgba(200,200,190,0.25)'); }

/* ---------- FENÊTRE CONDAMNÉE + CLAIR DE LUNE (mur gauche) ---------- */
murG(68, 22, 26, 22, '#0c0a08');
murG(70, 24, 22, 18, '#1a2a3a');
murG(80, 24, 1, 18, '#0c0a08'); murG(70, 32, 22, 1, '#0c0a08');
murG(70, 24, 10, 8, '#2a4058');
poly([[0, 66, 30], [0, 96, 36], [0, 96, 33], [0, 66, 27]], '#4a3420');      // planches clouées
poly([[0, 68, 38], [0, 94, 26], [0, 94, 23], [0, 68, 35]], '#3a2818');
// Rayon de lune projeté au sol
poly([[2, 70], [2, 94], [46, 108], [46, 82]], 'rgba(120, 160, 210, 0.08)');

/* ---------- PORTE BARRICADÉE (mur droit) ---------- */
murD(80, 0, 18, 32, '#070504');
murD(81, 0, 16, 31, '#2e1c10');
murD(83, 3, 12, 11, '#26170d'); murD(83, 17, 12, 11, '#26170d');
murD(93, 14, 2, 3, '#a08030');
poly([[76, 0, 8], [102, 0, 24], [102, 0, 27], [76, 0, 11]], '#4a3420');
poly([[76, 0, 26], [102, 0, 12], [102, 0, 15], [76, 0, 29]], '#3e2a18');
// Empreinte de main en sang + coulures
[[104, 30], [105, 31], [106, 30], [107, 31], [105, 29], [106, 28], [104, 28], [103, 29], [107, 28]].forEach(([x, z]) => murD(x, z, 1, 1, '#5a0c0a'));
murD(105, 22, 1, 7, '#4a0a08'); murD(107, 24, 1, 5, '#4a0a08');

/* ======================= TAPIS + SANG ======================= */
sol(46, 40, 60, 46, '#050403');
sol(47, 41, 58, 44, '#4a1414');
sol(51, 45, 50, 36, '#3a0f0f');
sol(53, 47, 46, 32, '#4a1414');
for (let k = 48; k < 104; k += 4) { const [sx, sy] = P(k, 42); px(sx, sy, '#8a6a2a'); const [tx, ty] = P(k, 83); px(tx, ty, '#8a6a2a'); }
// Traînée de sang de la porte vers le tapis
[[90, 6, 4], [88, 12, 5], [86, 19, 4], [85, 26, 5], [84, 32, 3], [83, 37, 4]].forEach(([x, y, r]) => sol(x - r / 2, y, r, r * 0.7, '#3a0b09'));
sol(106, 92, 16, 8, '#340a08'); sol(110, 90, 8, 4, '#3a0b09');

/* ======================= MEUBLES ======================= */
// Bureau + ordinateur
ombreSol(18, 2, 36, 16);
boite(18, 2, 0, 36, 16, 14, ['#4a3020', '#33210f', '#24170b']);
poly([[20, 18, 2], [52, 18, 2], [52, 18, 12], [20, 18, 12]], '#2a1b10');
poly([[34, 18, 6], [38, 18, 6], [38, 18, 7], [34, 18, 7]], '#8a7040');
boite(24, 4, 14, 16, 12, 12, ['#56564e', '#3e3e38', '#2c2c28']);
poly([[26, 16, 16], [38, 16, 16], [38, 16, 24], [26, 16, 24]], '#041008');
poly([[27, 16, 22], [33, 16, 22], [33, 16, 23], [27, 16, 23]], '#3cdc6a');
poly([[27, 16, 20], [36, 16, 20], [36, 16, 21], [27, 16, 21]], '#2aa04e');
poly([[27, 16, 18], [31, 16, 18], [31, 16, 19], [27, 16, 19]], '#2aa04e');
boite(42, 6, 14, 8, 9, 1, ['#c8c0a8', '#9a9280', '#7a7264']);
boite(43, 7, 15, 7, 7, 1, ['#d8d0bc', '#a8a090', '#8a8270']);
boite(26, 13, 14, 12, 3, 1, ['#2a2a26', '#1c1c18', '#141410']);

// Étagère : spray, munitions, rubans, bocaux
ombreSol(2, 26, 12, 44);
boite(2, 26, 0, 11, 44, 36, ['#3e2a1a', '#2e1f14', '#22170e']);
[0, 12, 24].forEach((z) => boite(2, 26, z, 11, 44, 1, ['#4a3220', '#3a281a', '#2a1c12']));
boite(4, 29, 13, 5, 5, 8, ['#d8d6d0', '#b8b4ac', '#9a968e']); boite(4, 29, 17, 5, 5, 1, ['#3c8a3c', '#2c6a2c', '#1f4f1f']);
boite(4, 37, 13, 6, 8, 4, ['#7a6a30', '#5a4c20', '#3e3416']); boite(4, 47, 13, 6, 8, 4, ['#7a6a30', '#5a4c20', '#3e3416']);
boite(4, 58, 13, 5, 5, 5, ['#1a1a1a', '#121212', '#0a0a0a']);
boite(4, 30, 1, 5, 10, 7, ['#b8b098', '#8a8270', '#6a6252']);
boite(4, 44, 1, 5, 5, 8, ['#4a5a3a', '#3a4a2a', '#2a3a1e']); boite(4, 52, 1, 5, 5, 6, ['#5a2420', '#4a1c1a', '#3a1412']);
boite(4, 61, 25, 5, 6, 6, ['#6a5a3a', '#4a3e28', '#3a3020']);

// Coffre à objets
ombreSol(118, 3, 28, 14);
boite(118, 3, 0, 28, 14, 14, ['#5e3e22', '#46301a', '#2e1f10']);
[122, 130, 138].forEach((x) => poly([[x, 17, 0], [x + 2, 17, 0], [x + 2, 17, 14], [x, 17, 14]], '#48484c'));
poly([[122, 3, 14], [124, 3, 14], [124, 17, 14], [122, 17, 14]], '#5a5a60');
poly([[130, 3, 14], [132, 3, 14], [132, 17, 14], [130, 17, 14]], '#5a5a60');
poly([[138, 3, 14], [140, 3, 14], [140, 17, 14], [138, 17, 14]], '#5a5a60');
poly([[130, 17, 7], [132, 17, 7], [132, 17, 10], [130, 17, 10]], '#c8a040');

// Table + machine à écrire
ombreSol(62, 52, 26, 18);
boite(62, 52, 0, 26, 18, 14, ['#5e4028', '#43301c', '#2e2012']);
boite(68, 56, 14, 14, 10, 5, ['#303034', '#222226', '#161618']);
for (let x = 69; x < 81; x += 2) for (let y = 60; y < 66; y += 2) { const [sx, sy] = P(x, y, 19); px(sx, sy, '#8a8a8e'); }
boite(66, 57, 16, 2, 3, 2, ['#6a6a6e', '#4a4a4e', '#3a3a3e']); boite(82, 57, 16, 2, 3, 2, ['#6a6a6e', '#4a4a4e', '#3a3a3e']);
boite(70, 56, 19, 10, 1, 9, ['#e8e0cc', '#d8d0bc', '#b8b09a']);
for (let z = 21; z < 27; z += 2) poly([[71, 57, z], [78, 57, z], [78, 57, z + 0.6], [71, 57, z + 0.6]], '#6a6254');
boite(83, 62, 14, 4, 4, 2, ['#1a1a1a', '#0e0e0e', '#080808']); boite(83, 66, 14, 4, 4, 2, ['#1a1a1a', '#0e0e0e', '#080808']);

// Ampoule nue suspendue au-dessus de la table
const [ax, ay] = P(75, 61, 46);
c.fillStyle = '#0a0a0a'; c.fillRect(ax, 0, 1, ay);
c.fillStyle = '#ffe8b0'; c.fillRect(ax - 1, ay, 3, 3); c.fillStyle = '#fff6dc'; c.fillRect(ax, ay + 1, 1, 1);

// Tabouret renversé
ombreSol(70, 76, 9, 6);
boite(70, 76, 0, 10, 6, 6, ['#4a3020', '#33210f', '#24170b']);

// Herbes vertes
function herbe(x, y) {
    ombreSol(x, y, 8, 8);
    boite(x, y, 0, 8, 8, 6, ['#6a4628', '#4a2e18', '#33200f']);
    sol(x + 1, y + 1, 6, 6, '#1e1208');
    const [sx, sy] = P(x + 4, y + 4, 8);
    const f = [[0, -5], [-1, -4], [1, -4], [-3, -3], [3, -3], [-2, -2], [2, -2], [-4, -1], [4, -1], [-1, -1], [1, -1], [0, -2], [-3, 0], [3, 0], [0, 0], [-1, -3], [1, -3], [-2, -4], [2, -4]];
    f.forEach(([dx, dy], i) => px(sx + dx, sy + dy, i % 4 === 0 ? '#2a5a22' : i % 3 ? '#4a8a36' : '#6ab04a'));
}
herbe(16, 84); herbe(16, 102);

// Corps sous un drap, taché de sang
ombreSol(100, 96, 30, 14);
boite(100, 98, 0, 30, 12, 3, ['#8a8a84', '#6a6a64', '#4e4e4a']);
boite(104, 99, 3, 10, 9, 2, ['#9a9a94', '#7a7a74', '#5a5a56']);
boite(122, 99, 3, 6, 8, 2, ['#8a8a84', '#6a6a64', '#4e4e4a']);
sol(110, 98, 6, 4, 'rgba(110, 10, 8, 0.7)'); sol(118, 104, 5, 3, 'rgba(110, 10, 8, 0.6)');
[[114, 99, 3], [112, 103, 3]].forEach(([x, y, z]) => { const [sx, sy] = P(x, y, z + 2); px(sx, sy, '#6a0c0a'); });

// Dossiers et douilles au sol
boite(116, 64, 0, 9, 7, 1, ['#c8c0a8', '#9a9280', '#7a7264']);
boite(126, 70, 0, 8, 6, 1, ['#b8b098', '#8a8270', '#6a6252']);
[[60, 96], [64, 99], [57, 101], [92, 88], [95, 92]].forEach(([x, y]) => { const [sx, sy] = P(x, y); px(sx, sy, '#c8a040'); px(sx + 1, sy, '#7a6020'); });


/* ---------- AMBIANCE (calque de lumière par-dessus Jill) ---------- */
const ambianceCanvas = document.createElement('canvas');
ambianceCanvas.width = 320; ambianceCanvas.height = 192;
c = ambianceCanvas.getContext('2d');
/* ======================= AMBIANCE ======================= */
// Teinte froide générale
c.fillStyle = 'rgba(10, 30, 28, 0.28)'; c.fillRect(0, 0, 320, 192);
// Lumière chaude de l'ampoule
const lampe = c.createRadialGradient(ax, ay + 18, 2, ax, ay + 18, 70);
lampe.addColorStop(0, 'rgba(255, 210, 140, 0.26)');
lampe.addColorStop(0.5, 'rgba(255, 180, 110, 0.06)');
lampe.addColorStop(1, 'rgba(0, 0, 0, 0)');
c.fillStyle = lampe; c.fillRect(0, 0, 320, 192);
// Lueur de l'écran
const [ex, ey] = P(32, 16, 20);
const ecran = c.createRadialGradient(ex, ey, 1, ex, ey, 20);
ecran.addColorStop(0, 'rgba(60, 220, 106, 0.14)'); ecran.addColorStop(1, 'rgba(60, 220, 106, 0)');
c.fillStyle = ecran; c.fillRect(0, 0, 320, 192);
// Vignettage lourd
const ombre = c.createRadialGradient(ax, 100, 40, ax, 100, 190);
ombre.addColorStop(0, 'rgba(0, 0, 0, 0)');
ombre.addColorStop(0.6, 'rgba(0, 0, 0, 0.45)');
ombre.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
c.fillStyle = ombre; c.fillRect(0, 0, 320, 192);
// Poussière dans la lumière
for (let k = 0; k < 40; k++) px(ax - 30 + alea() * 60, ay + 4 + alea() * 50, 'rgba(255, 230, 190, 0.25)');
// Grain
for (let k = 0; k < 1400; k++) px(alea() * 320, alea() * 192, alea() > 0.5 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.12)');

const JILL = [[null, null, null, null, "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#543c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", null, null, null, null, null], [null, null, null, "#242424", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#543c0c", "#3c240c", "#3c240c", "#3c240c", "#0c0c0c", "#242424", null, null, null, null], [null, null, "#0c0c0c", "#0c0c0c", "#543c0c", "#3c240c", "#3c240c", "#3c240c", "#543c0c", "#3c240c", "#3c240c", "#3c240c", "#3c240c", "#0c0c0c", null, null, null, null], [null, "#0c0c0c", "#0c0c0c", "#6c6c24", "#543c0c", "#3c240c", "#240c0c", "#0c0c0c", "#3c240c", "#6c6c3c", "#543c0c", "#3c240c", "#3c240c", "#3c240c", "#0c0c0c", "#242424", null, null], [null, "#6c6c54", "#0c0c0c", "#6c6c24", "#3c240c", "#0c0c0c", "#0c0c0c", "#3c240c", "#3c240c", "#3c240c", "#6c6c24", "#6c6c24", "#543c0c", "#3c240c", "#3c240c", "#0c0c0c", "#0c0c0c", null], [null, "#0c0c0c", "#0c0c0c", "#3c240c", "#84543c", "#6c6c24", "#6c6c24", "#543c24", "#543c0c", "#0c0c0c", "#6c6c24", "#543c0c", "#543c0c", "#3c240c", "#3c240c", "#0c0c0c", "#0c0c0c", null], [null, "#546c6c", "#0c0c0c", "#3c240c", "#cc9c6c", "#cc9c54", "#cc9c54", "#543c0c", "#543c0c", "#0c0c0c", "#240c0c", "#543c0c", "#543c0c", "#3c240c", "#543c0c", "#3c240c", "#0c0c0c", "#cccccc"], [null, "#0c0c0c", "#0c0c0c", "#3c240c", "#cc9c6c", "#cc9c6c", "#e49c54", "#6c3c0c", "#543c0c", "#3c240c", "#0c0c0c", "#0c0c0c", "#543c0c", "#3c240c", "#543c0c", "#3c240c", "#3c240c", "#0c0c0c"], [null, "#6c6c6c", "#0c0c0c", "#543c0c", "#fcccb4", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#6c6c24", "#543c0c", "#0c0c0c", "#0c0c0c", "#543c0c", "#0c0c0c", "#543c0c", "#3c240c", "#3c240c", "#0c0c0c"], [null, "#6c6c6c", "#0c0c0c", "#543c0c", "#fcccb4", "#6cb49c", "#6cb49c", null, "#6c6c24", "#543c0c", "#3c240c", "#3c240c", "#3c240c", "#0c0c0c", "#6c6c24", "#3c240c", "#240c0c", "#0c0c0c"], [null, "#6c6c6c", "#0c0c0c", "#543c0c", "#fcccb4", "#ccccb4", "#6cb49c", null, "#fccc9c", "#0c0c0c", "#543c0c", "#3c240c", "#3c240c", "#0c0c0c", "#6c6c24", "#0c0c0c", "#0c0c0c", null], [null, null, "#0c0c0c", "#0c0c0c", "#fcccb4", "#ccccb4", "#fcccb4", "#fcccb4", "#6c3c24", "#0c0c0c", "#543c0c", "#3c240c", "#3c240c", "#0c0c0c", "#24240c", "#0c0c0c", null, null], [null, null, null, "#0c0c0c", "#fcccb4", "#fcccb4", "#fcccb4", "#fcccb4", "#3c240c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#3c240c", "#6c6c3c", "#0c0c0c", null, null, null], [null, null, null, null, "#0c0c0c", "#3c3c24", "#fcccb4", "#fccc9c", "#543c0c", "#543c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#243c3c", "#0c0c0c", null, null, null], [null, null, null, "#0c0c0c", "#6c849c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#b48454", "#0c0c0c", "#545454", "#545454", "#cc9c6c", "#cc9c54", "#0c0c0c", null, null, null], [null, null, null, "#0c0c0c", "#6c849c", "#546c9c", "#0c243c", "#243c6c", "#243c6c", "#243c6c", "#243c6c", "#545454", "#545454", "#fccc9c", "#cc9c6c", "#0c0c0c", "#0c0c0c", null], [null, null, "#0c0c0c", "#0c0c0c", "#3c549c", "#3c5484", "#243c6c", "#243c6c", "#243c6c", "#0c0c24", "#243c6c", "#545454", "#545454", "#fccc9c", "#cc9c6c", "#0c0c0c", "#0c0c0c", null], [null, "#0c0c0c", "#0c0c0c", "#0c0c0c", "#3c5484", "#3c5484", "#243c6c", "#cc3c24", "#e4cc84", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#545454", "#fcccb4", "#cc9c6c", "#0c0c0c", null, null], ["#0c0c0c", "#0c0c0c", "#545454", "#fccc9c", "#0c0c0c", "#545454", "#b49c6c", "#e4cc84", "#0c0c0c", "#fccc9c", "#ccb49c", "#9c846c", "#fccc9c", "#243c3c", "#0c0c0c", null, null, null], ["#0c0c0c", "#0c0c0c", "#545454", "#242424", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#545454", "#242424", "#3c2424", "#e49c54", "#242424", "#0c0c0c", null, null, null], [null, "#3c3c3c", "#0c0c0c", "#0c0c0c", null, "#0c0c0c", "#0c0c0c", "#242424", "#545454", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#0c0c0c", null, null, null, null], [null, null, "#0c0c0c", "#0c0c0c", null, "#0c0c0c", "#242424", "#242424", "#545454", "#0c0c0c", "#242424", "#0c0c0c", "#0c0c0c", "#0c0c0c", null, null, null, null], [null, null, null, null, null, "#0c0c0c", "#242424", "#242424", "#545454", "#848484", "#242424", "#242424", "#545454", "#0c0c0c", null, null, null, null], [null, null, null, null, null, "#0c0c0c", "#242424", "#242424", "#0c0c0c", "#242424", "#242424", "#242424", "#545454", "#0c0c0c", null, null, null, null], [null, null, null, null, null, "#0c0c0c", "#242424", "#242424", "#0c0c0c", "#242424", "#545454", "#545454", "#545454", "#0c0c0c", null, null, null, null], [null, null, null, null, null, "#0c0c0c", "#0c0c0c", "#545454", "#0c0c0c", "#545454", "#545454", "#242424", "#242424", "#0c0c0c", null, null, null, null], [null, null, null, null, "#6c6c6c", "#0c0c0c", "#545454", "#545454", "#0c0c0c", "#545454", "#0c0c0c", "#242424", "#242424", "#0c0c0c", "#6c6c6c", null, null, null], [null, null, null, null, "#0c0c0c", "#848484", "#848484", "#545454", "#0c0c0c", "#0c0c0c", "#0c0c0c", "#545454", "#545454", "#545454", "#0c0c0c", null, null, null], [null, null, null, null, "#0c0c0c", "#848484", "#848484", "#0c0c0c", "#848484", "#848484", "#545454", "#545454", "#545454", "#242424", "#0c0c0c", null, null, null], [null, null, null, null, null, null, "#6c6c6c", "#0c0c0c", "#848484", "#848484", "#242424", "#242424", "#242424", "#242424", "#0c0c0c", null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]];

/* =========================================
   SALLE DE SAUVEGARDE : MÉCANIQUE
========================================= */

const ecranJeu = document.getElementById('salle-sauvegarde');
const ctxJeu = ecranJeu.getContext('2d');
const infoSalle = document.getElementById('salle-info');
const panneauCoffre = document.getElementById('salle-coffre');
const conteneurPomo = document.querySelector('.Pomodoro-Container');
const controlesPomo = document.querySelector('.pomodoro-controls');

const OBJETS = [
    { id: 'machine', nom: 'Machine à écrire', action: 'Rédiger', type: 'travail', boite: [62, 52, 0, 26, 18, 28], place: [76, 82] },
    { id: 'bureau', nom: 'Ordinateur', action: 'Coder', type: 'travail', boite: [18, 2, 0, 36, 16, 28], place: [36, 30] },
    { id: 'etagere', nom: 'Étagère', action: 'Réviser', type: 'travail', boite: [2, 26, 0, 11, 44, 36], place: [24, 50] },
    { id: 'herbes', nom: 'Herbes vertes', action: 'Se soigner', type: 'pause', boite: [16, 84, 0, 8, 26, 14], place: [34, 98] },
    { id: 'coffre', nom: 'Coffre', action: 'Ouvrir', type: 'coffre', boite: [118, 3, 0, 28, 14, 14], place: [132, 30] },
];
OBJETS.forEach((o) => {
    const [x, y, z, w, d, h] = o.boite;
    const coins = [];
    [x, x + w].forEach((cx) => [y, y + d].forEach((cy) => [z, z + h].forEach((cz) => coins.push(P(cx, cy, cz)))));
    o.zone = {
        x0: Math.min(...coins.map((p) => p[0])), x1: Math.max(...coins.map((p) => p[0])),
        y0: Math.min(...coins.map((p) => p[1])), y1: Math.max(...coins.map((p) => p[1])),
    };
});
const objet = (id) => OBJETS.find((o) => o.id === id);

const CLE_RUBANS = 'salle-rubans';
let rubans = 0;
try { rubans = parseInt(localStorage.getItem(CLE_RUBANS) || '0', 10) || 0; } catch (e) {}

const jill = { x: 90, y: 90, cible: null, objet: null, lancer: false, etat: 'repos', regard: -1 };
let dernierTravail = objet('machine');
let survol = null;
let sessionsVues = sessionsCompletees;
let messageJusqua = 0;

function message(texte, duree = 4000) {
    infoSalle.textContent = texte;
    messageJusqua = performance.now() + duree;
}

function aller(o, lancer) {
    jill.objet = o;
    jill.cible = { x: o.place[0], y: o.place[1] };
    jill.lancer = lancer;
    jill.etat = 'marche';
}

function arreterChrono() {
    clearInterval(intervalId);
    intervalId = null;
    finCibleTimestamp = null;
}

function basculerMode(versPause) {
    enPause = versPause;
    tempsRestant = (enPause ? tempsPause : tempsTravail) * 60;
    if (affichageMode) affichageMode.textContent = enPause ? 'MODE: PAUSE' : 'MODE: TRAVAIL';
    conteneurPomo.classList.toggle('pause-mode', enPause);
    controlesPomo.classList.toggle('pause-mode', enPause);
}

function demarrerAction(o) {
    const versPause = o.type === 'pause';
    arreterChrono();
    if (versPause !== enPause) basculerMode(versPause);
    majAffichagePomodoro();
    btnPomodoroStart.click();
}

function arrivee() {
    const o = jill.objet;
    jill.cible = null;
    if (o.type === 'coffre') {
        jill.etat = 'repos';
        ouvrirCoffre();
        return;
    }
    if (jill.lancer) demarrerAction(o);
    jill.lancer = false;
    jill.etat = intervalId ? 'action' : 'repos';
}

function ouvrirCoffre() {
    panneauCoffre.replaceChildren();
    const titre = document.createElement('h3');
    titre.textContent = 'Coffre';
    const ligne = document.createElement('p');
    ligne.textContent = `Rubans d'encre : ${rubans}`;
    const sous = document.createElement('p');
    sous.className = 'salle-coffre-note';
    sous.textContent = "Un ruban par séance de travail terminée.";
    const grille = document.createElement('div');
    grille.className = 'salle-coffre-grille';
    for (let i = 0; i < Math.max(8, rubans); i++) {
        const case_ = document.createElement('span');
        if (i < rubans) case_.className = 'plein';
        grille.append(case_);
    }
    panneauCoffre.append(titre, grille, ligne, sous);
    panneauCoffre.hidden = false;
}

/* ---------- SOURIS ---------- */
function versScene(ev) {
    const r = ecranJeu.getBoundingClientRect();
    const echelle = Math.min(r.width / 320, r.height / 192);
    const decalX = (r.width - 320 * echelle) / 2, decalY = (r.height - 192 * echelle) / 2;
    return [(ev.clientX - r.left - decalX) / echelle, (ev.clientY - r.top - decalY) / echelle];
}
// Plus un objet est proche du joueur (x + y grands), plus il passe devant
const profondeur = (o) => o.boite[0] + o.boite[3] + o.boite[1] + o.boite[4];
function objetSous([x, y]) {
    return OBJETS.filter((o) => x >= o.zone.x0 && x <= o.zone.x1 && y >= o.zone.y0 && y <= o.zone.y1)
        .sort((a, b) => profondeur(b) - profondeur(a))[0] || null;
}
function texteObjet(o) {
    if (o.type === 'coffre') return `${o.nom.toUpperCase()} — ${rubans} ruban(s) d'encre`;
    const duree = o.type === 'pause' ? tempsPause : tempsTravail;
    return `${o.nom.toUpperCase()} — ${o.action} (${duree} min)`;
}

ecranJeu.addEventListener('mousemove', (ev) => {
    survol = objetSous(versScene(ev));
    ecranJeu.style.cursor = survol ? 'pointer' : '';
});
ecranJeu.addEventListener('mouseleave', () => { survol = null; });
ecranJeu.addEventListener('click', (ev) => {
    if (!panneauCoffre.hidden) { panneauCoffre.hidden = true; return; }
    const o = objetSous(versScene(ev));
    if (!o) return;
    jouerSonCourt(myaudio);
    if (o.type !== 'coffre') {
        arreterChrono();
        if (o.type === 'travail') dernierTravail = o;
    }
    aller(o, o.type !== 'coffre');
    message(`${o.action}...`, 1500);
});
panneauCoffre.addEventListener('click', () => { panneauCoffre.hidden = true; });

/* ---------- LOGIQUE ---------- */
let dernierInstant = performance.now();
function miseAJour(dt) {
    // Séance terminée : récompense
    if (sessionsCompletees > sessionsVues) {
        sessionsVues = sessionsCompletees;
        rubans++;
        try { localStorage.setItem(CLE_RUBANS, rubans); } catch (e) {}
        message("Séance terminée. +1 ruban d'encre dans le coffre.", 5000);
    }

    // Quand le chrono tourne, Jill va d'elle-même au bon endroit
    if (intervalId && !jill.cible) {
        const voulu = enPause ? objet('herbes') : dernierTravail;
        if (jill.objet !== voulu) aller(voulu, false);
    }

    if (jill.cible) {
        const dx = jill.cible.x - jill.x, dy = jill.cible.y - jill.y;
        const dist = Math.hypot(dx, dy);
        const pas = 42 * dt;
        if (dist <= pas) { jill.x = jill.cible.x; jill.y = jill.cible.y; arrivee(); }
        else {
            jill.x += dx / dist * pas; jill.y += dy / dist * pas;
            const ecranDx = dx - dy;
            if (Math.abs(ecranDx) > 0.5) jill.regard = ecranDx > 0 ? 1 : -1;
        }
    } else if (jill.objet && jill.objet.type !== 'coffre') {
        jill.etat = intervalId ? 'action' : 'repos';
    }

    if (performance.now() > messageJusqua) {
        if (survol) infoSalle.textContent = texteObjet(survol);
        else if (jill.etat === 'action') infoSalle.textContent = `${jill.objet.action}... ${enPause ? 'Récupération en cours.' : 'Concentration.'}`;
        else infoSalle.textContent = 'Cliquez sur un objet de la salle pour agir.';
    }
}

/* ---------- RENDU ---------- */
function dessinerJillScene(t) {
    const [sx, sy] = P(jill.x, jill.y, 0);
    let saut = 0;
    if (jill.etat === 'marche') saut = Math.floor(t / 120) % 2;
    else if (jill.etat === 'action') saut = Math.floor(t / 420) % 2;
    ctxJeu.fillStyle = 'rgba(0,0,0,0.5)';
    ctxJeu.fillRect(Math.round(sx) - 6, Math.round(sy) - 1, 13, 2);
    JILL.forEach((l, j) => l.forEach((col, i) => {
        if (!col) return;
        const xi = jill.regard > 0 ? l.length - 1 - i : i;
        ctxJeu.fillStyle = col;
        ctxJeu.fillRect(Math.round(sx) - 9 + xi, Math.round(sy) - 30 + j - saut, 1, 1);
    }));
}

function effets(t) {
    if (jill.etat !== 'action') return;
    const id = jill.objet.id;
    const tempsTotal = (enPause ? tempsPause : tempsTravail) * 60;
    const avance = 1 - tempsRestant / tempsTotal;
    if (id === 'machine') {
        // La feuille se remplit de texte au fil de la séance
        const lignesTexte = Math.floor(avance * 4);
        for (let k = 0; k < lignesTexte; k++) {
            const [lx, ly] = P(71, 57, 26 - k * 2);
            ctxJeu.fillStyle = '#4a4438'; ctxJeu.fillRect(Math.round(lx), Math.round(ly), 6, 1);
        }
        if (Math.floor(t / 150) % 2) { const [kx, ky] = P(70 + (Math.floor(t / 150) % 10), 62, 19); ctxJeu.fillStyle = '#ffffff'; ctxJeu.fillRect(Math.round(kx), Math.round(ky), 1, 1); }
    } else if (id === 'bureau') {
        for (let k = 0; k < 4; k++) {
            const l = (Math.floor(t / 200) + k * 3) % 9 + 2;
            const [lx, ly] = P(27, 16, 18 + k * 1.5);
            ctxJeu.fillStyle = k === 0 ? '#7cff9a' : '#2aa04e'; ctxJeu.fillRect(Math.round(lx), Math.round(ly), l, 1);
        }
    } else if (id === 'herbes') {
        const [hx, hy] = P(jill.x, jill.y, 0);
        for (let k = 0; k < 6; k++) {
            const phase = ((t / 900) + k / 6) % 1;
            ctxJeu.fillStyle = `rgba(110, 230, 120, ${1 - phase})`;
            ctxJeu.fillRect(Math.round(hx - 7 + (k * 5) % 14), Math.round(hy - 4 - phase * 30), 1, 2);
        }
    }
}

function marqueur(t) {
    const o = survol;
    if (!o) return;
    const cx = Math.round((o.zone.x0 + o.zone.x1) / 2);
    const cy = o.zone.y0 - 5 - (Math.floor(t / 300) % 2);
    ctxJeu.fillStyle = '#050403';
    ctxJeu.fillRect(cx - 3, cy - 1, 7, 1); ctxJeu.fillRect(cx - 2, cy, 5, 1); ctxJeu.fillRect(cx - 1, cy + 1, 3, 1); ctxJeu.fillRect(cx, cy + 2, 1, 1);
    ctxJeu.fillStyle = '#f0d070';
    ctxJeu.fillRect(cx - 2, cy - 1, 5, 1); ctxJeu.fillRect(cx - 1, cy, 3, 1); ctxJeu.fillRect(cx, cy + 1, 1, 1);
}

// Logique : minuteur régulier (continue même onglet en arrière-plan)
setInterval(() => {
    const t = performance.now();
    const dt = Math.min(1, (t - dernierInstant) / 1000);
    dernierInstant = t;
    miseAJour(dt);
}, 50);

// Dessin : seulement quand l'écran est visible
function boucle(t) {
    if (conteneurPomo.offsetParent !== null) {
        ctxJeu.clearRect(0, 0, 320, 192);
        ctxJeu.drawImage(decorCanvas, 0, 0);
        effets(t);
        dessinerJillScene(t);
        ctxJeu.drawImage(ambianceCanvas, 0, 0);
        marqueur(t);
    }
    requestAnimationFrame(boucle);
}
requestAnimationFrame(boucle);

})();
