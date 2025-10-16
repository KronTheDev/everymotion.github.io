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
    ctx.strokeStyle = `rgba(100,100,255,${p1.alpha-.2})`;
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    p1.alpha -= p1.decay;
    }
    requestAnimationFrame(animateTrail);
}

if (!detectMob()) {
    animateTrail();
}
else {
    document.getElementById('caption').style = "bottom: 5px; right: 20px; color: white;";
}

const adaptiveYou = document.getElementById('adaptiveYou');
const fonts = ["Inter", "Playfair Display", "Orbitron", "Pacifico", "Courier Prime"];
let fontIndex = 0;

function typeEffect(text, font) {
  adaptiveYou.style.fontFamily = font;
  adaptiveYou.textContent = "";
  let i = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      adaptiveYou.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

function eraseEffect() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      adaptiveYou.textContent = adaptiveYou.textContent.slice(0, -1);
      if (adaptiveYou.textContent.length === 0) {
        clearInterval(interval);
        resolve();
      }
    }, 60);
  });
}

async function loopTyping() {
  while (true) {
    const font = fonts[fontIndex];
    fontIndex = (fontIndex + 1) % fonts.length;
    await typeEffect("YOU", font);
    await new Promise(r => setTimeout(r, 1000));
    await eraseEffect();
    await new Promise(r => setTimeout(r, 200));
  }
}

if (adaptiveYou) {
  window.addEventListener("beforeunload", () => clearInterval());
  loopTyping();
}



const members = document.querySelectorAll(".member");
let current = 0;

document.getElementById("next").addEventListener("click", () => {
  members[current].classList.remove("active");
  current = (current + 1) % members.length;
  members[current].classList.add("active");
});

document.getElementById("prev").addEventListener("click", () => {
  members[current].classList.remove("active");
  current = (current - 1 + members.length) % members.length;
  members[current].classList.add("active");
});


const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach(btn => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
    const content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
})