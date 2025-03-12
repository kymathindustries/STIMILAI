var canvas = document.getElementById('test'),
    ctx = canvas.getContext('2d'),
    w = window.innerWidth,
    h = window.innerHeight,
    rate = 60,
    arc = 100,
    size = 7,
    speed = 20,
    parts = [],
    colors = ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'],
    mouse = { x: 0, y: 0 };

function resizeCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w; 
    canvas.height = h; 
    canvas.style.width = `${w}px`; 
    canvas.style.height = `${h}px`; 
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

function createParticles() {
    for (var i = 0; i < arc; i++) {
        parts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            toX: Math.random() * 5 - 2.5, // Balanced random motion
            toY: Math.random() * 2 - 1,
            c: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * size
        });
    }
}

function renderParticles() {
    ctx.clearRect(0, 0, w, h); 

    for (var i = 0; i < arc; i++) {
        var p = parts[i];

        var distanceFactor = Math.max(
            Math.min(15 - DistanceBetween(mouse, p) / 10, 10),
            1
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * distanceFactor, 0, Math.PI * 2, false);
        ctx.fillStyle = p.c;
        ctx.strokeStyle = p.c;

        if (i % 2 === 0) ctx.stroke();
        else ctx.fill();

        p.x += p.toX * 0.5;
        p.y += p.toY * 0.5;

        if (p.x > w) p.x = 0;
        if (p.y > h) p.y = 0;
        if (p.x < 0) p.x = w;
        if (p.y < 0) p.y = h;
    }

    requestAnimationFrame(renderParticles);
}

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function DistanceBetween(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

createParticles();
renderParticles();
