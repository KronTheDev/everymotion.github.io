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
canvas.width = width;
canvas.height = height;

let trail = [];
let maxTrail = 50;
let mouseX = 0, mouseY = 0, lastX = 0, lastY = 0, speed = 0;

let currentColor = { r: 100, g: 100, b: 255 }; 
let targetColor = { r: 100, g: 100, b: 255 }; 

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  speed = Math.sqrt(dx * dx + dy * dy);
  lastX = mouseX;
  lastY = mouseY;

  maxTrail = Math.min(45, 15 + speed * 0.7);
  const alphaDecay = 0.14 + speed / 600;

  for (let i = 0; i < 2; i++) {
    trail.push({ x: mouseX, y: mouseY, alpha: 1, decay: alphaDecay });
  }

  if (trail.length > maxTrail) trail.splice(0, trail.length - maxTrail);
});

document.addEventListener("scroll", () => {
  const personnelSection = document.getElementById("personnel");
  if (!personnelSection) return;

  const rect = personnelSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;

  if (inView) {
    targetColor = { r: 255, g: 255, b: 255 };
  } else {
    targetColor = { r: 100, g: 100, b: 255 };
  }
});

function animateTrail() {
  ctx.clearRect(0, 0, width, height);

  currentColor.r += (targetColor.r - currentColor.r) * 0.08;
  currentColor.g += (targetColor.g - currentColor.g) * 0.08;
  currentColor.b += (targetColor.b - currentColor.b) * 0.08;

  ctx.lineWidth = 35;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'square';

  for (let i = 0; i < trail.length - 1; i++) {
    const p1 = trail[i];
    const p2 = trail[i + 1];
    const color = `rgba(${Math.round(currentColor.r)}, ${Math.round(currentColor.g)}, ${Math.round(currentColor.b)}, ${p1.alpha})`;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    p1.alpha -= p1.decay;
  }

  trail = trail.filter(p => p.alpha > 0);

  requestAnimationFrame(animateTrail);
}


if (!detectMob()) {
  animateTrail();
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
