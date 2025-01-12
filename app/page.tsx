"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const defaultDate = new Date('2025-09-21');
  const [targetDate] = useState<Date>(defaultDate);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const today = new Date();

  // Handle initial mount and system preference
  useEffect(() => {
    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(systemPrefersDark ? 'dark' : 'light');
    setMounted(true);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Calculate resignation date (90 days before target date)
  const resignationDate = new Date(targetDate);
  resignationDate.setDate(resignationDate.getDate() - 90);

  const calculateTimeLeft = (date: Date) => {
    const diffTime = date.getTime() - today.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    return { days, weeks };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeLeftTechM = calculateTimeLeft(targetDate);
  const timeLeftResign = calculateTimeLeft(resignationDate);

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 sm:p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        {/* Theme Toggle */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Time left in TechM</h1>
        <p className="text-muted-foreground">Counting down to September 21, 2025</p>

        {/* Time Remaining to TechM */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Time Remaining</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Until {formatDate(targetDate)}:
          </p>
          <div className="flex justify-between gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center w-1/2">
              <div className="text-3xl font-bold text-primary">{timeLeftTechM.days}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center w-1/2">
              <div className="text-3xl font-bold text-primary">{timeLeftTechM.weeks}</div>
              <div className="text-sm text-muted-foreground">Weeks</div>
            </div>
          </div>
        </Card>

        {/* Time Remaining to Resign */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Time Remaining to Resign</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Until {formatDate(resignationDate)}:
          </p>
          <div className="flex justify-between gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center w-1/2">
              <div className="text-3xl font-bold text-primary">{timeLeftResign.days}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center w-1/2">
              <div className="text-3xl font-bold text-primary">{timeLeftResign.weeks}</div>
              <div className="text-sm text-muted-foreground">Weeks</div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}