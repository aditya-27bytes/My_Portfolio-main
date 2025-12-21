import { useEffect, useRef } from "react";

const AuroraEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawAurora = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) * 0.001; // Convert to seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simplified aurora layers with smoother movement
      const layers = [
        { hue: 274, saturation: 68, lightness: 59, yOffset: 0.12, amplitude: 40, speed: 0.15 },
        { hue: 280, saturation: 80, lightness: 65, yOffset: 0.18, amplitude: 50, speed: 0.12 },
        { hue: 260, saturation: 70, lightness: 55, yOffset: 0.08, amplitude: 35, speed: 0.18 },
      ];

      layers.forEach((layer, layerIndex) => {
        const baseY = canvas.height * layer.yOffset;
        
        // Create smooth gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.5);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.2, `hsla(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%, 0.02)`);
        gradient.addColorStop(0.4, `hsla(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%, 0.06)`);
        gradient.addColorStop(0.6, `hsla(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%, 0.04)`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(0, 0);

        // Generate smoother wave with fewer calculation points
        const step = 20;
        for (let x = 0; x <= canvas.width + step; x += step) {
          const wave1 = Math.sin((x * 0.002) + (elapsed * layer.speed)) * layer.amplitude;
          const wave2 = Math.sin((x * 0.004) + (elapsed * layer.speed * 0.7) + layerIndex * 2) * (layer.amplitude * 0.4);
          const y = baseY + wave1 + wave2;
          
          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            // Use bezier curves for smoother lines
            const prevX = x - step;
            const prevWave1 = Math.sin((prevX * 0.002) + (elapsed * layer.speed)) * layer.amplitude;
            const prevWave2 = Math.sin((prevX * 0.004) + (elapsed * layer.speed * 0.7) + layerIndex * 2) * (layer.amplitude * 0.4);
            const prevY = baseY + prevWave1 + prevWave2;
            
            const cpX = (prevX + x) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
          }
        }

        ctx.lineTo(canvas.width, 0);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle glow line along the wave edge
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += step) {
          const wave1 = Math.sin((x * 0.002) + (elapsed * layer.speed)) * layer.amplitude;
          const wave2 = Math.sin((x * 0.004) + (elapsed * layer.speed * 0.7) + layerIndex * 2) * (layer.amplitude * 0.4);
          const y = baseY + wave1 + wave2;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevX = x - step;
            const prevWave1 = Math.sin((prevX * 0.002) + (elapsed * layer.speed)) * layer.amplitude;
            const prevWave2 = Math.sin((prevX * 0.004) + (elapsed * layer.speed * 0.7) + layerIndex * 2) * (layer.amplitude * 0.4);
            const prevY = baseY + prevWave1 + prevWave2;
            ctx.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + y) / 2);
          }
        }
        
        ctx.strokeStyle = `hsla(${layer.hue}, ${layer.saturation}%, ${layer.lightness + 20}%, 0.15)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Subtle vertical shimmer rays
      const rayCount = 5;
      for (let i = 0; i < rayCount; i++) {
        const baseX = (canvas.width / (rayCount + 1)) * (i + 1);
        const x = baseX + Math.sin(elapsed * 0.3 + i * 1.5) * 30;
        const opacity = 0.015 + Math.sin(elapsed * 0.2 + i) * 0.01;
        
        const rayGradient = ctx.createLinearGradient(x, 0, x, canvas.height * 0.35);
        rayGradient.addColorStop(0, `hsla(277, 80%, 70%, ${opacity})`);
        rayGradient.addColorStop(0.5, `hsla(274, 68%, 59%, ${opacity * 0.8})`);
        rayGradient.addColorStop(1, "transparent");

        ctx.fillStyle = rayGradient;
        ctx.fillRect(x - 40, 0, 80, canvas.height * 0.35);
      }

      animationRef.current = requestAnimationFrame(drawAurora);
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(drawAurora);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none blur-sm"
      style={{ zIndex: 0 }}
    />
  );
};

export default AuroraEffect;