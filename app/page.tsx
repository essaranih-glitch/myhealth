"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Assessment = {
  reasoning: string;
  confidence: number;
  confidenceLabel: string;
  confidenceReason: string;
  followUp: string;
};

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      {title ? (
        <h2 className="mb-3 text-sm font-medium text-slate-900">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setAssessment(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      const data = await res.json();
      setAssessment(data);
    } catch {
      alert("Something went wrong. Check the terminal for errors.");
    }
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-medium tracking-tight text-slate-900">
          MyHealth
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Explainable AI for educational symptom analysis
        </p>
      </header>

      <div className="space-y-3">
        <Card>
          <label className="mb-2 block text-xs text-slate-400">
            Describe what you&apos;re feeling
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. Headache for three days, worse in the morning, some nausea"
            className="h-24 w-full resize-none rounded-lg border border-slate-200 p-3 text-slate-900 outline-none focus:border-indigo-400"
          />
          <button
            onClick={analyze}
            disabled={loading || symptoms.trim().length === 0}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {loading ? "Thinking..." : "Analyze"}
          </button>
        </Card>

        {assessment ? (
          <>
            <Card title="How I'm thinking about this">
              <p className="mb-4 leading-relaxed text-slate-600">
                {assessment.reasoning}
              </p>
              <div className="mb-2 flex items-center gap-3">
                <span className="w-20 text-sm text-slate-500">Confidence</span>
                <div className="h-1 flex-1 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${assessment.confidence}%` }}
                  />
                </div>
                <span className="text-sm text-amber-600">
                  {assessment.confidenceLabel}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {assessment.confidenceReason}
              </p>
            </Card>

            <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
              <p className="mb-1 text-xs text-indigo-500">To narrow this down</p>
              <p className="text-indigo-900">{assessment.followUp}</p>
            </section>
          </>
        ) : null}
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        Educational tool. Not a diagnosis. Bring these notes to a clinician.
      </p>
    </main>
  );
}
