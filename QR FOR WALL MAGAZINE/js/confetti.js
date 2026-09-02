/**
 * Technodiaz Confetti particle engine
 */
window.launchConfetti = function() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
    }
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var particles = [];
    var colors = ['#00ff87', '#60efff', '#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ffffff', '#38ef7d'];

    for (var i = 0; i < 150; i++) {
        particles.push({
            x: width * 0.5 + (Math.random() - 0.5) * 200,
            y: height * 0.5 + (Math.random() - 0.5) * 50,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 1.5) * 15,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
            opacity: 1,
            shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
    }

    var animationFrame;
    var startTime = Date.now();

    function render() {
        var elapsed = Date.now() - startTime;
        ctx.clearRect(0, 0, width, height);

        var activeCount = 0;
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.vx *= 0.98; // air resistance
            p.rotation += p.rotSpeed;
            p.opacity -= 0.008;

            if (p.opacity > 0 && p.y < height + 50) {
                activeCount++;
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                }
                ctx.restore();
            }
        }

        if (activeCount > 0 && elapsed < 4000) {
            animationFrame = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, width, height);
            if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        }
    }

    render();
};
