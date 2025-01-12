"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { differenceInDays, differenceInWeeks, differenceInHours, format } from "date-fns";

export default function Home() {
  const defaultDate = new Date('2025-09-21');
  const [targetDate] = useState<Date>(defaultDate);
  const today = new Date();

  const calculateTimeLeft = () => {
    const days = differenceInDays(targetDate, today);
    const weeks = differenceInWeeks(targetDate, today);
    const hours = differenceInHours(targetDate, today);

    return { days, weeks, hours };
  };

  const timeLeft = calculateTimeLeft();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Time left in TechM</h1>
        <p className="text-muted-foreground">Counting down to September 21, 2025</p>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Time Remaining</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Until {format(targetDate, "PPPP")}:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.weeks}</div>
              <div className="text-sm text-muted-foreground">Weeks</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
