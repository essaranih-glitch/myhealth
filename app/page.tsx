import type { ReactNode } from "react";

const assessment = {
  symptoms: "Headache for three days, worse when I wake up, some nausea, no fever",
  emergencyChecks: [
    "Sudden onset severe headache",
    "Fever with neck stiffness",
    "Vision changes",
    "Weakness on one side",
    "Confusion",
  ],
  reasoning:
    "Morning-predominant headaches with nausea and no fever fit several common patterns. Tension-type and sleep-related causes are frequent in this presentation. The absence of fever makes infectious causes less likely.",
  confidence: 45,
  confidenceLabel: "Low",
  confidenceReason:
    "Three days is not long enough to distinguish between these patterns, and I have no information about your sleep, screen time, or stress.",
  wouldChange: [
    "If the headache became sudden and severe, or you developed fever, neck stiffness, or vision changes, this would become urgent rather than routine.",
    "If it persists beyond two weeks, the likely explanations shift considerably.",
  ],
  followUp: "Has anything changed recently about your sleep or screen time?",
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
          <p className="mb-1 text-xs text-slate-400">You described</p>
          <p className="text-slate-900">{assessment.symptoms}</p>
        </Card>

        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="mb-2 text-sm font-medium text-emerald-900">
            Emergency screen: nothing urgent detected
          </h2>
          <p className="text-sm leading-relaxed text-emerald-800">
            Checked for: {assessment.emergencyChecks.join(", ").toLowerCase()}.
            None reported.
          </p>
        </section>

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

        <Card title="What would change my assessment">
          <div className="space-y-2">
            {assessment.wouldChange.map((item) => (
              <p key={item} className="leading-relaxed text-slate-600">
                {item}
              </p>
            ))}
          </div>
        </Card>

        <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="mb-1 text-xs text-indigo-500">To narrow this down</p>
          <p className="text-indigo-900">{assessment.followUp}</p>
        </section>
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        Educational tool. Not a diagnosis. Bring these notes to a clinician.
      </p>
    </main>
  );
}
