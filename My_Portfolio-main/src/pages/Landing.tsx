import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code, Brain, Shield, Cloud } from "lucide-react";
import ParticleField from "@/components/ParticleField";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = () => {
    navigate("/portfolio");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particle field */}
      <ParticleField />

      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.15), transparent 40%)`,
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-400 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-muted/5 rounded-full blur-3xl z-0" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Logo/Name */}
        <div className="animate-fade-up">
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Welcome to my world
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 animate-fade-up animation-delay-200">
          <span className="text-foreground">Aditya</span>
          <br />
          <span className="gradient-text">Chougale</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl mb-12 animate-fade-up animation-delay-400">
          Full Stack Developer • AI/ML Enthusiast • Cybersecurity Specialist
        </p>

        {/* Skill icons */}
        <div className="flex items-center gap-8 mb-12 animate-fade-up animation-delay-600">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Full Stack</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">AI/ML</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Security</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Cloud className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Cloud</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleEnter}
          className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 animate-fade-up animation-delay-600"
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-600">
          <span className="text-xs text-muted-foreground">Click to enter</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 m-8" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 m-8" />
    </div>
  );
};

export default Landing;
