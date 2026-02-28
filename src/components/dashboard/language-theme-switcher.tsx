'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

export function LanguageThemeSwitcher() {
  const [language, setLanguage] = useState('EN');
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'TH' : 'EN'));
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={toggleLanguage}>
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle language</span>
      </Button>
      <span className="text-sm font-medium">{language}</span>
      <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
