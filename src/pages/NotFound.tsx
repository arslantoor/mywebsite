import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="mb-4 text-4xl md:text-6xl font-bold gradient-text">404</h1>
        <p className="mb-2 text-xl md:text-2xl text-muted-foreground">Page not found</p>
        <p className="mb-6 text-sm text-muted-foreground">Muhammad Arslan Toor - Senior AI Engineer</p>
        <a href="/" className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
