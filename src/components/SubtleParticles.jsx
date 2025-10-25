import { useEffect, useRef } from "react";

const SubtleParticles = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array(100).fill().map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.3 + 0.4,
            dx: (Math.random() - 0.5) * 0.45,
            dy: (Math.random() - 0.5) * 0.45,
        }));

        function animate() {
            // 🧹 נקה את המסך בשחור חצי שקוף
            ctx.fillStyle = "rgba(10,10,15,0.35)";


            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ✨ חלקיקים
            ctx.fillStyle = "rgba(180, 220, 255, 0.35)";
            particles.forEach((p) => {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
};

export default SubtleParticles;
