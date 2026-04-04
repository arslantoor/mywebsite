export const NeuralBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(150deg, hsl(240 20% 4%) 0%, hsl(250 25% 8%) 30%, hsl(240 20% 5%) 100%)',
        }}
      />

      {/* Stripe-style vivid mesh gradient blobs */}
      <div
        className="absolute top-[-20%] right-[-5%] w-[70vw] h-[70vw] max-w-[1200px] max-h-[1200px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 30% 40%, hsl(270 80% 50% / 0.35) 0%, hsl(300 70% 45% / 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] max-w-[900px] max-h-[900px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 60% 50%, hsl(220 90% 55% / 0.3) 0%, hsl(250 80% 60% / 0.12) 50%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '2s',
        }}
      />

      <div
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[50vw] max-w-[1000px] max-h-[800px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 50% 60%, hsl(180 70% 45% / 0.2) 0%, hsl(200 80% 50% / 0.1) 40%, transparent 65%)',
          filter: 'blur(100px)',
          animationDelay: '4s',
        }}
      />

      <div
        className="absolute bottom-[5%] right-[-5%] w-[50vw] h-[45vw] max-w-[800px] max-h-[700px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 40% 40%, hsl(330 70% 50% / 0.2) 0%, hsl(350 60% 55% / 0.08) 45%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '6s',
        }}
      />

      <div
        className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] max-w-[650px] max-h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(260 60% 55% / 0.12) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};
