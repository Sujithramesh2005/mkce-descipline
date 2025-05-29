
  // Disable right-click
  document.addEventListener("contextmenu", function (e) {
    alert("⚠️ Copying is not allowed!");
    e.preventDefault();
  });

  // Disable Ctrl+U (view source), Ctrl+C (copy), Ctrl+S (save), and F12 (developer tools)
  document.addEventListener("keydown", function (e) {
    if (
      (e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 's')) ||
      e.key === 'F12'
    ) {
      alert("⚠️ This action is disabled to protect the source code.");
      e.preventDefault();
    }
  });
function openReportForm(issue) {
    document.getElementById('reportModal').style.display = 'flex';
    document.getElementById('reportIssue').value = issue;
    document.getElementById('reportIssueDisplay').value = issue;
    document.getElementById('reportForm').reset();
    document.getElementById('reportIssueDisplay').value = issue;
}
function closeReportForm() {
    document.getElementById('reportModal').style.display = 'none';
}
function submitReport(e) {
    e.preventDefault();
    // Collect form data
    const name = document.getElementById('reportName').value;
    const regno = document.getElementById('reportRegno').value;
    const email = document.getElementById('reportEmail').value;
    const issue = document.getElementById('reportIssue').value;
    const details = document.getElementById('reportDetails').value;

    // Prepare mailto link
    const subject = encodeURIComponent('Discipline Issue Report: ' + issue);
    const body = encodeURIComponent(
        `Name: ${name}\nReg. No: ${regno}\nEmail: ${email}\nIssue: ${issue}\nDetails: ${details}`
    );
    // Change the email address below to your receiving email
    const mailto = `mailto:discipline@mkce.ac.in?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    closeReportForm();
}
// Optional: Close modal on background click
document.getElementById('reportModal').addEventListener('click', function(e) {
    if (e.target === this) closeReportForm();
});

const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
    w = window.innerWidth;
    // Use full document height for canvas
    h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
        window.innerHeight
    );
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
}
window.addEventListener('resize', resize);
window.addEventListener('scroll', () => {
    // Keep canvas fixed as background
    canvas.style.top = window.scrollY + 'px';
});
resize();

// Generate stars
const stars = [];
const numStars = 300;
function randomY() {
    // Spread stars over the full canvas height
    return Math.random() * canvas.height;
}
function createStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: randomY(),
            r: Math.random() * 1.5 + 0.2,
            speed: Math.random() * 0.3 + 0.05,
            alpha: Math.random() * 0.5 + 0.5
        });
    }
}
createStars();
window.addEventListener('resize', createStars);

function drawMoon() {
    // Draw a glowing moon at top right
    const moonX = w - 120;
    const moonY = 120;
    const moonRadius = 60;
    // Outer glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius + 18, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(200,220,255,0.13)';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 40;
    ctx.fill();
    ctx.restore();
    // Main moon
    ctx.save();
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f8f8ff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();
    // Craters
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(moonX - 20, moonY - 10, 10, 0, 2 * Math.PI);
    ctx.arc(moonX + 15, moonY + 12, 7, 0, 2 * Math.PI);
    ctx.arc(moonX + 25, moonY - 18, 5, 0, 2 * Math.PI);
    ctx.arc(moonX - 10, moonY + 20, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#b0b0c0';
    ctx.fill();
    ctx.restore();
}

function drawStars() {
    ctx.clearRect(0, 0, w, h);
    drawMoon();
    for (let star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Move star
        star.y += star.speed;
        if (star.y > h) {
            star.x = Math.random() * w;
            star.y = 0;
        }
    }
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}
animate();
