import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'light', label: 'Light', icon: Sun },
  ] as const;

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/30 rounded-lg border border-border/30">
      {themes.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => setTheme(id as 'dark' | 'light')}
          className={`relative px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium flex items-center gap-1.5 ${
            theme === id
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">{label}</span>

          {theme === id && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-md -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
