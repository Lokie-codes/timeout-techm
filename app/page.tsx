"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { differenceInDays, differenceInWeeks, differenceInHours, format } from "date-fns";

export default function Home() {
  const defaultDate = new Date('2025-09-21');
  const [targetDate] = useState<Date>(defaultDate);
  const today = new Date();

  // Subtract 90 days from the target date to get the resignation date
  const resignationDate = new Date(targetDate);
  resignationDate.setDate(resignationDate.getDate() - 90);

  const calculateTimeLeft = (date: Date) => {
    const days = differenceInDays(date, today);
    const weeks = differenceInWeeks(date, today);
    const hours = differenceInHours(date, today);

    return { days, weeks, hours };
  };

  const timeLeftTechM = calculateTimeLeft(targetDate);
  const timeLeftResign = calculateTimeLeft(resignationDate);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Time left in TechM</h1>
        <p className="text-muted-foreground">Counting down to September 21, 2025</p>

        {/* Time Remaining to TechM */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Time Remaining</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Until {format(targetDate, "PPPP")}:
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
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Time Remaining to Resign</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Until {format(resignationDate, "PPPP")}:
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
