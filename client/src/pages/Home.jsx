import React from "react";
export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Build a job‑ready CV</h1>
        <p className="text-gray-600 mb-4">Create, update and export a polished PDF in minutes. Register to start and you’ll be taken straight to Create.</p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Clean, ATS‑friendly layout</li>
          <li>One‑click PDF export</li>
          <li>Secure account & data</li>
        </ul>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Pro tip</h3>
        <p className="text-gray-600">Use strong action verbs and quantify impact (e.g., “Cut build time by 35%”).</p>
      </div>
    </div>
  );
}
