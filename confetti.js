// Simple confetti animation using Canvas Confetti library
const confettiCanvas = document.getElementById("confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiActive = false;
let confettiParticles = [];

function startConfetti() {
  confettiActive = true;
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100 + 10,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0
    });
  }
  requestAnimationFrame(updateConfetti);
}

function stopConfetti() {
  confettiActive = false;
  confettiParticles = [];
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

function updateConfetti() {
  if (!confettiActive) return;

  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    confettiCtx.beginPath();
    confettiCtx.fillStyle = p.color;
    confettiCtx.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, Math.PI * 2);
    confettiCtx.fill();
    p.y += 2;
    p.tilt += 0.1;
    if (p.y > confettiCanvas.height) p.y = -20;
  });

  requestAnimationFrame(updateConfetti);
}
