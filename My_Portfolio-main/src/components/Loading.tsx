import { useEffect, useState } from "react";

interface LoadingProps {
  onComplete: () => void;
  minDuration?: number;
}

const Loading = ({ onComplete, minDuration = 2500 }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-400" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <div className="text-4xl md:text-5xl font-bold">
          <span className="text-foreground">A</span>
          <span className="gradient-text">C</span>
        </div>
      </div>

      {/* Loading text */}
      <div className="relative z-10 mb-8">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
          Loading
          <span className="inline-flex ml-1">
            <span className="animate-bounce animation-delay-200">.</span>
            <span className="animate-bounce animation-delay-400">.</span>
            <span className="animate-bounce animation-delay-600">.</span>
          </span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-64 md:w-80">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs text-muted-foreground font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] border border-primary/10 rounded-full animate-pulse" />
        <div className="absolute w-[400px] h-[400px] border border-primary/5 rounded-full animate-pulse animation-delay-200" />
        <div className="absolute w-[500px] h-[500px] border border-primary/[0.02] rounded-full animate-pulse animation-delay-400" />
      </div>
    </div>
  );
};

export default Loading;
