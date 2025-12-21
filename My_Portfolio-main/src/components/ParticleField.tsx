import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastShootingStarTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

    const createShootingStar = (): ShootingStar => {
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6); // 30-60 degrees
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4),
        length: 80 + Math.random() * 60,
        speed: 15 + Math.random() * 10,
        opacity: 1,
        angle,
        active: true,
      };
    };

    const drawParticle = (particle: Particle, time: number) => {
      const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinkleOffset) * 0.3 + 0.7;
      const finalOpacity = particle.opacity * twinkle;

      // Draw glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, `hsla(274, 68%, 59%, ${finalOpacity})`);
      gradient.addColorStop(0.5, `hsla(274, 100%, 74%, ${finalOpacity * 0.5})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw core
      ctx.beginPath();
      ctx.fillStyle = `hsla(277, 100%, 83%, ${finalOpacity})`;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawShootingStar = (star: ShootingStar) => {
      if (!star.active) return;

      const tailX = star.x - Math.cos(star.angle) * star.length;
      const tailY = star.y - Math.sin(star.angle) * star.length;

      // Create gradient for the tail
      const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
      gradient.addColorStop(0, `hsla(277, 100%, 95%, ${star.opacity})`);
      gradient.addColorStop(0.3, `hsla(274, 68%, 59%, ${star.opacity * 0.6})`);
      gradient.addColorStop(1, "transparent");

      // Draw tail
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      // Draw head glow
      const headGradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, 8
      );
      headGradient.addColorStop(0, `hsla(277, 100%, 95%, ${star.opacity})`);
      headGradient.addColorStop(0.5, `hsla(274, 68%, 59%, ${star.opacity * 0.5})`);
      headGradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = headGradient;
      ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw bright core
      ctx.beginPath();
      ctx.fillStyle = `hsla(277, 100%, 95%, ${star.opacity})`;
      ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const updateShootingStar = (star: ShootingStar) => {
      if (!star.active) return;

      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;

      // Fade out as it travels
      star.opacity -= 0.015;

      // Deactivate if off screen or faded
      if (star.x > canvas.width + 100 || star.y > canvas.height + 100 || star.opacity <= 0) {
        star.active = false;
      }
    };

    const connectParticles = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(274, 68%, 59%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn shooting stars randomly (every 2-5 seconds)
      if (time - lastShootingStarTime.current > 2000 + Math.random() * 3000) {
        if (Math.random() > 0.3) {
          shootingStarsRef.current.push(createShootingStar());
        }
        lastShootingStarTime.current = time;
      }

      // Update and draw shooting stars
      shootingStarsRef.current.forEach((star) => {
        updateShootingStar(star);
        drawShootingStar(star);
      });

      // Clean up inactive shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => star.active);

      particlesRef.current.forEach((particle) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 0.5;
          particle.y -= (dy / distance) * force * 0.5;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawParticle(particle, time);
      });

      connectParticles(particlesRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField;
