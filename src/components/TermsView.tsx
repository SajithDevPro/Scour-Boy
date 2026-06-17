import React from "react";

export const TermsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#070707] to-black text-white">

      {/* glow */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-[-200px] right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-cyan-500 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-gray-400 mt-4 text-sm">
            Last updated · June 17, 2026
          </p>
        </div>

        <div className="space-y-10">

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Please read these Terms carefully before using Scour-Boy.
            </p>
          </div>

          <Section title="Acceptance of Terms">
            <p className="text-gray-300">
              By using this platform, you agree to these Terms.
            </p>
          </Section>

          <Section title="Eligibility">
            <p className="text-gray-300">
              You must be at least 18 years old to use this service.
            </p>
          </Section>

          <Section title="User Responsibilities">
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Use the platform legally</li>
              <li>No unauthorized access</li>
              <li>No abuse or disruption</li>
            </ul>
          </Section>

          <Section title="Service Limitations">
            <p className="text-gray-300">
              The service is provided “as is” without guarantees of uptime or accuracy.
            </p>
          </Section>

          <Section title="Termination">
            <p className="text-gray-300">
              We may suspend access if rules are violated.
            </p>
          </Section>

          {/* CONTACT */}
          <div className="text-center pt-10">
            <p className="text-gray-400">Contact</p>
            <p className="text-white font-medium mt-1">support@scour-boy</p>
          </div>

        </div>
      </div>
    </div>
  );
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}