export const NeuralBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(260 30% 5%) 0%, hsl(240 25% 7%) 40%, hsl(220 20% 5%) 100%)',
        }}
      />

      {/* Deep violet top-left */}
      <div
        className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] max-w-[1100px] max-h-[1100px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(270 85% 40% / 0.4) 0%, hsl(280 70% 35% / 0.15) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Electric blue center-right */}
      <div
        className="absolute top-[15%] right-[-8%] w-[55vw] h-[55vw] max-w-[950px] max-h-[950px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 40% 50%, hsl(220 95% 55% / 0.35) 0%, hsl(230 85% 50% / 0.12) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '2s',
        }}
      />

      {/* Emerald green bottom */}
      <div
        className="absolute bottom-[-15%] left-[10%] w-[60vw] h-[50vw] max-w-[1000px] max-h-[850px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 50% 40%, hsl(160 80% 40% / 0.25) 0%, hsl(170 70% 35% / 0.1) 45%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '4s',
        }}
      />

      {/* Violet-blue bridge in center */}
      <div
        className="absolute top-[35%] left-[30%] w-[45vw] h-[40vw] max-w-[750px] max-h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(250 70% 50% / 0.15) 0%, hsl(230 60% 45% / 0.06) 50%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Teal accent bottom-right */}
      <div
        className="absolute bottom-[5%] right-[0%] w-[45vw] h-[40vw] max-w-[700px] max-h-[600px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(185 75% 45% / 0.18) 0%, hsl(195 65% 40% / 0.06) 45%, transparent 65%)',
          filter: 'blur(85px)',
          animationDelay: '6s',
        }}
      />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.018]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};
