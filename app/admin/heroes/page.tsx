"use client";

import { useState, useEffect } from "react";
import { TapSeal } from "@/components/patriotism";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

// Mock pending submissions - in production, fetch from database
const mockPendingSubmissions = [
  {
    id: "hero-pending-001",
    dogName: "Luna",
    handlerName: "Emma Thompson",
    role: "service",
    location: "Seattle, WA",
    story: "Luna is a service dog who helps with PTSD support...",
    email: "emma@example.com",
    submittedAt: "2024-12-15T10:00:00Z",
  },
];

export default function AdminHeroesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState(mockPendingSubmissions);

  // Basic auth stub - in production, use proper authentication
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container-width py-16 max-w-md mx-auto">
        <div className="space-y-6">
          <TapSeal label="Admin" detail="Hero Moderation" />
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" className="w-full">
              Access Admin Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="space-y-4">
          <TapSeal label="Hero Moderation" detail="Admin Panel" />
          <h1 className="h1">Pending Hero Submissions</h1>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No pending submissions.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{submission.dogName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {submission.handlerName} • {submission.location} • {submission.role}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{submission.story}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-[var(--border)]">
                  <Button
                    size="sm"
                    onClick={() => {
                      // In production, update status in database
                      setSubmissions(submissions.filter((s) => s.id !== submission.id));
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmissions(submissions.filter((s) => s.id !== submission.id));
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


