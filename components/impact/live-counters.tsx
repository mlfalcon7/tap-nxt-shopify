"use client";

import { useEffect, useState } from "react";
import { Users, Shield, Heart } from "lucide-react";

type CounterProps = {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  suffix?: string;
};

function Counter({ value, label, icon: Icon, suffix = "" }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate counter on mount
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setDisplayValue(Math.floor(current));
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center space-y-2">
      <div className="flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-secondary)]/10">
          <Icon className="h-6 w-6 text-[var(--accent-secondary)]" />
        </div>
      </div>
      <div className="text-3xl font-bold text-foreground">
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function LiveCounters() {
  // These would come from API/database in production
  // For now, use realistic static values that can be updated
  const stats = {
    municipalitiesFunded: 47,
    rescuesCertified: 128,
    stipendsIssued: 312,
  };

  return (
    <div className="grid gap-8 md:grid-cols-3 py-12 border-y border-[var(--border)]">
      <Counter
        value={stats.municipalitiesFunded}
        label="Municipalities Funded"
        icon={Shield}
      />
      <Counter
        value={stats.rescuesCertified}
        label="Rescues Certified"
        icon={Heart}
      />
      <Counter
        value={stats.stipendsIssued}
        label="Veteran Stipends Issued"
        icon={Users}
      />
    </div>
  );
}


