const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Primary grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Secondary finer grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)`,
        }}
      />
      
      {/* Corner glow accents */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-10"
        style={{
          background: `radial-gradient(circle at top left, hsl(var(--primary) / 0.3), transparent 60%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10"
        style={{
          background: `radial-gradient(circle at bottom right, hsl(var(--primary) / 0.3), transparent 60%)`,
        }}
      />
    </div>
  );
};

export default GridBackground;