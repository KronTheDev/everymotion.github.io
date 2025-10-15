function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth, height = window.innerHeight;
canvas.width = width; canvas.height = height;
const trail = []; let maxTrail = 50; let mouseX = 0, mouseY = 0, lastX = 0, lastY = 0, speed = 0;

window.addEventListener('resize', () => {width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height;});
document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    const dx = mouseX - lastX, dy = mouseY - lastY; speed = Math.sqrt(dx*dx + dy*dy);
    lastX = mouseX; lastY = mouseY;
    maxTrail = Math.min(45, 15 + speed * 0.7);
    const alphaDecay = 0.14 + speed / 600;
    for (let i = 0; i < 2; i++) trail.push({x: mouseX, y: mouseY, alpha: 1, decay: alphaDecay});
    if (trail.length > maxTrail) trail.splice(0, trail.length - maxTrail);
});

function animateTrail() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 35;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'square';
    for (let i = 0; i < trail.length - 1; i++) {
    const p1 = trail[i]; const p2 = trail[i + 1];
    ctx.strokeStyle = `rgba(100,100,255,${p1.alpha})`;
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    p1.alpha -= p1.decay;
    }
    requestAnimationFrame(animateTrail);
}

if (!detectMob()) {
    animateTrail();
}

const adaptiveYou = document.getElementById('adaptiveYou');
const fonts = ["Inter", "Playfair Display", "Orbitron", "Pacifico", "Courier Prime"];
let fontIndex = 0;
let typing = false;

function typeEffect(text, font) {
    adaptiveYou.style.fontFamily = font;
    adaptiveYou.textContent = '';
    let i = 0;
    typing = true;
    const interval = setInterval(() => {
    adaptiveYou.textContent += text[i];
    i++;
    if (i >= text.length) {
        clearInterval(interval);
        typing = false;
    }
    }, 190);
}

function eraseEffect() {
    const text = adaptiveYou.textContent;
    let i = text.length;
    const interval = setInterval(() => {
    adaptiveYou.textContent = text.substring(0, i);
    i--;
    if (i < 0) {
        clearInterval(interval);
        fontIndex = (fontIndex + 1) % fonts.length;
        setTimeout(() => typeEffect('YOU', fonts[fontIndex]), 100);
    }
    }, 115);
}

typeEffect('YOU', fonts[0]);
setInterval(() => {
    if (!typing) eraseEffect();
}, 2200);