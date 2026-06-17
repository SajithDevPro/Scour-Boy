import React from "react";

export const PrivacyView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#070707] to-black text-white">

      {/* Soft glow background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-gray-400 mt-4 text-sm">
            Last updated · June 17, 2026
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-10">

          {/* INTRO CARD */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 leading-relaxed text-lg">
              This Privacy Policy explains how Scour-Boy collects, uses,
              stores, and protects your personal information when you use our platform.
            </p>
          </div>

          {/* SECTION */}
          <Section title="Information We Collect">
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Account information</li>
              <li>Device and usage data</li>
              <li>IP address</li>
            </ul>
          </Section>

          <Section title="How We Use Your Data">
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Provide and improve services</li>
              <li>Maintain account security</li>
              <li>Analyze platform performance</li>
              <li>Send important updates</li>
            </ul>
          </Section>

          <Section title="Data Protection">
            <p className="text-gray-300 leading-relaxed">
              We apply modern security practices to protect your data, but no system
              is fully immune to risk.
            </p>
          </Section>

          <Section title="Your Rights">
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Access your personal data</li>
              <li>Request deletion</li>
              <li>Correct inaccurate information</li>
              <li>Withdraw consent</li>
            </ul>
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
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}