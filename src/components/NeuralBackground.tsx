export const NeuralBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top-left ambient orb */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(245 58% 64% / 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Bottom-right ambient orb */}
      <div
        className="absolute -bottom-[15%] -right-[10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(280 50% 55% / 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '4s',
        }}
      />

      {/* Center subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] max-w-[900px] max-h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, hsl(245 58% 64% / 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};
