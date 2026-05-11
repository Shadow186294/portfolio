let buttons = document.querySelectorAll(".magic-btn");

let symbols = ["{ }", "</>", "const", "API", "JS", "CSS", "HTML", "()", "=>"];

buttons.forEach(button => {
  let interval;

  button.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      let span = document.createElement("span");
      span.className = "code-particle";

      span.innerText = symbols[Math.floor(Math.random() * symbols.length)];

      let rect = button.getBoundingClientRect();

      let offset = 5;
      let side = Math.floor(Math.random() * 4);

      let startX;
      let startY;
      let x;
      let y;

      if (side === 0) {
      
        startX = rect.left + Math.random() * rect.width;
        startY = rect.top - offset;

        x = (Math.random() - 0.5) * 100 + "px";
        y = -Math.random() * 150 + "px";
      }

      if (side === 1) {
       
        startX = rect.left + Math.random() * rect.width;
        startY = rect.bottom + offset;

        x = (Math.random() - 0.5) * 100 + "px";
        y = Math.random() * 150 + "px";
      }

      if (side === 2) {
       
        startX = rect.left - offset;
        startY = rect.top + Math.random() * rect.height;

        x = -Math.random() * 150 + "px";
        y = (Math.random() - 0.5) * 100 + "px";
      }

      if (side === 3) {
       
        startX = rect.right + offset;
        startY = rect.top + Math.random() * rect.height;

        x = Math.random() * 150 + "px";
        y = (Math.random() - 0.5) * 100 + "px";
      }

      span.style.left = startX + "px";
      span.style.top = startY + "px";

      span.style.setProperty("--x", x);
      span.style.setProperty("--y", y);

      span.style.fontSize = 10 + Math.random() * 6 + "px";

      document.body.appendChild(span);

      setTimeout(() => {
        span.remove();
      }, 800);
    }, 100);
  });

  button.addEventListener("mouseleave", () => {
    clearInterval(interval);
  });
});
const cm = document.getElementById("canvas-matrix");
const ctm = cm.getContext('2d');

const cw = document.getElementById("canvas-waves");
const ctw = cw.getContext('2d');

let matrixcols, matrixDrops;
function resize() {
  cm.width = window.innerWidth;
  cm.height = window.innerHeight;
  cw.width = window.innerWidth;
  cw.height = window.innerHeight;

  matrixcols = Math.floor(cm.width / 18);
  matrixDrops = Array(matrixcols).fill(0);
}

window.addEventListener('resize', resize);
const matrixChars = "01アイウカキABCDEF{}[]#!?$%";
function drawMatrix() {
  ctm.fillStyle = "rgba(12, 0, 39, 0.06)";
  ctm.fillRect(0, 0, cm.width, cm.height);

  for (let i = 0 ; i < matrixcols; i++) {
    const y = matrixDrops[i] * 18;
    const ch = matrixChars[Math.floor(Math.random()*matrixChars.length)];
    
    ctm.shadowColor = "#e040fb";
    ctm.shadowBlur = 20;
    ctm.fillStyle = "#ffffff";
    ctm.font = "13px monospace";
    ctm.fillText(ch, i * 18, y)

    ctm.shadowColor = "#e040fb";
    ctm.shadowBlur = 8;
    ctm.fillStyle = "rgba(199,125,255,0.5)";
    ctm.fillText(matrixChars[Math.floor(Math.random()*matrixChars.length)], i * 18, y - 18);
    
    ctm.shadowBlur = 0;
    
    if (y > cm.height && Math.random() > 0.975)matrixDrops[i] = 0;
    matrixDrops[i] += 0.65;
  }
}
const snippets = [
  'const auth = () =>', 'if (secure) {', 'import java.util.*',
  'git commit -m "fix"', 'sudo nmap -sV', 'def encrypt(data):',
  'ssh amir@server', 'docker-compose up', 'JWT.verify(token)',
  'bcrypt.hash(pwd,12)', 'chmod 600 id_rsa', 'python3 exploit.py',
];
const waveLines = Array.from({length: 22}, (_, i) => ({
  y: (i / 22) * window.innerHeight,
  x: Math.random() * window.innerWidth,
  speed: Math.random() * 0.5 + 0.15,
  snippet: snippets[Math.floor(Math.random() * snippets.length)],
  alpha: Math.random() * 0.25 + 0.07,
  wave: Math.random() * Math.PI * 2,
}));

let waveFrame = 0;
function drawWaves() {
  waveFrame++;
  ctw.clearRect(0, 0, cw.width, cw.height);

  waveLines.forEach(l => {
    l.x -= l.speed;
    l.wave += 0.011;

    const waveY=l.y + Math.sin(l.wave) * 20;
    if (l.x < -350) {
      l.x = cw.width + 80;
      l.snippet = snippets[Math.floor(Math.random() * snippets.length)];
      l.alpha = Math.random() * 0.25 + 0.07;
    }
    const pulse = Math.sin(waveFrame * 0.035 + l.wave) * 0.1 + l.alpha;
    ctw.font = "13px monospace";
    ctw.fillStyle = `rgba(199,125,255,${pulse})`;
    ctw.shadowColor = 'rgba(180,80,255,0.4)';
    ctw.shadowBlur = 6;
    ctw.fillText(l.snippet, l.x, waveY);
    ctw.shadowBlur = 0;
  });
}
resize();
function loop() {
  requestAnimationFrame(loop);
  drawMatrix();
  drawWaves();
}
loop();