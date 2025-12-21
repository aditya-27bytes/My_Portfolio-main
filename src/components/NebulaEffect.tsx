import { useEffect, useRef } from "react";

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  hue: number;
  opacity: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const NebulaEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const cloudsRef = useRef<NebulaCloud[]>([]);
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createClouds();
    };

    const createClouds = () => {
      const clouds: NebulaCloud[] = [];
      const cloudCount = 12;

      for (let i = 0; i < cloudCount; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 150 + Math.random() * 250,
          hue: 260 + Math.random() * 40, // Purple to blue range
          opacity: 0.03 + Math.random() * 0.04,
          driftX: (Math.random() - 0.5) * 0.1,
          driftY: (Math.random() - 0.5) * 0.1,
          pulseSpeed: 0.0005 + Math.random() * 0.001,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }

      cloudsRef.current = clouds;
    };

    const drawCloud = (cloud: NebulaCloud, elapsed: number) => {
      const pulse = Math.sin(elapsed * cloud.pulseSpeed * 1000 + cloud.pulseOffset) * 0.3 + 0.7;
      const currentOpacity = cloud.opacity * pulse;
      const currentRadius = cloud.radius * (0.9 + pulse * 0.2);

      // Create multi-layered gradient for depth
      const gradient = ctx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, currentRadius
      );

      gradient.addColorStop(0, `hsla(${cloud.hue}, 70%, 60%, ${currentOpacity * 1.5})`);
      gradient.addColorStop(0.2, `hsla(${cloud.hue + 10}, 60%, 50%, ${currentOpacity})`);
      gradient.addColorStop(0.5, `hsla(${cloud.hue - 10}, 50%, 40%, ${currentOpacity * 0.6})`);
      gradient.addColorStop(0.8, `hsla(${cloud.hue + 20}, 40%, 30%, ${currentOpacity * 0.3})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(cloud.x, cloud.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCosmicDust = (elapsed: number) => {
      // Draw scattered dust particles
      const dustCount = 50;
      for (let i = 0; i < dustCount; i++) {
        const baseX = (canvas.width / dustCount) * i;
        const baseY = canvas.height * 0.3 + Math.sin(i * 0.5 + elapsed * 0.1) * 100;
        const x = baseX + Math.sin(elapsed * 0.05 + i) * 20;
        const y = baseY + Math.cos(elapsed * 0.03 + i * 0.7) * 30;
        const size = 1 + Math.sin(elapsed * 0.2 + i) * 0.5;
        const opacity = 0.1 + Math.sin(elapsed * 0.1 + i * 0.3) * 0.05;

        ctx.beginPath();
        ctx.fillStyle = `hsla(277, 80%, 75%, ${opacity})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawGasStreaks = (elapsed: number) => {
      // Subtle gas/dust streaks across the canvas
      ctx.globalCompositeOperation = "screen";
      
      for (let i = 0; i < 3; i++) {
        const startX = Math.sin(elapsed * 0.02 + i * 2) * 200;
        const startY = canvas.height * 0.2 + i * 150;
        const endX = canvas.width + Math.cos(elapsed * 0.015 + i) * 100;
        const endY = startY + Math.sin(elapsed * 0.01 + i) * 100;

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.3, `hsla(${270 + i * 15}, 60%, 50%, 0.02)`);
        gradient.addColorStop(0.5, `hsla(${280 + i * 10}, 70%, 55%, 0.03)`);
        gradient.addColorStop(0.7, `hsla(${265 + i * 20}, 60%, 45%, 0.02)`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 80 + i * 30;
        ctx.lineCap = "round";
        
        // Create curved path
        const cpX = canvas.width / 2 + Math.sin(elapsed * 0.01 + i) * 200;
        const cpY = startY + 100 + Math.cos(elapsed * 0.02 + i) * 50;
        
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.stroke();
      }
      
      ctx.globalCompositeOperation = "source-over";
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / canvas.width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / canvas.height - 0.5) * 2;
    };

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) * 0.001;

      // Smooth mouse interpolation for parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gas streaks first (background)
      drawGasStreaks(elapsed);

      // Update and draw nebula clouds with parallax
      cloudsRef.current.forEach((cloud, index) => {
        // Parallax offset based on mouse position and cloud depth
        const parallaxStrength = 30 + (index % 4) * 15; // Different depths
        const parallaxX = mouseRef.current.x * parallaxStrength;
        const parallaxY = mouseRef.current.y * parallaxStrength;

        // Slow drift movement
        cloud.x += cloud.driftX;
        cloud.y += cloud.driftY;

        // Wrap around edges
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;

        // Draw with parallax offset
        const originalX = cloud.x;
        const originalY = cloud.y;
        cloud.x += parallaxX;
        cloud.y += parallaxY;
        drawCloud(cloud, elapsed);
        cloud.x = originalX;
        cloud.y = originalY;
      });

      // Draw cosmic dust particles
      drawCosmicDust(elapsed);

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);

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
      style={{ zIndex: 0, filter: "blur(40px)" }}
    />
  );
};

export default NebulaEffect;