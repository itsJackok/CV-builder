import React from "react";

// Polished A4-ish resume layout
export default function ResumePreview({ data }) {
  const {
    fullName = "ONTHATILE JACK MAPHETO",
    role = "SOFTWARE ENGINEER",
    summary = "Versatile and driven software developer with hands-on experience...",
    contacts = {},
    skills = ["Java", "C#", "JavaScript", "SQL", "MongoDB"],
    education = [],
    projects = [],
  } = data || {};

  return (
    <div id="resume" className="resume-page p-10">
      {/* Header */}
      <header className="mb-8">
        <div className="text-4xl font-extrabold tracking-wide">{fullName}</div>
        <div className="text-blue-600 font-semibold mt-1">{role}</div>
      </header>

      {/* Body grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT (sidebar) */}
        <aside className="col-span-4">
          <Section title="Contact">
            <div className="text-sm leading-6">
              {contacts.phone && <div>{contacts.phone}</div>}
              {contacts.email && <div>{contacts.email}</div>}
              {contacts.github && <div>{contacts.github}</div>}
              {contacts.linkedin && <div>{contacts.linkedin}</div>}
            </div>
          </Section>

          <Section title="Skills">
            <ul className="ul-clean text-sm grid grid-cols-1 gap-1">
              {skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </Section>

          {education?.length > 0 && (
            <Section title="Education">
              <ul className="space-y-3">
                {education.map((e, i) => (
                  <li key={i} className="text-sm">
                    <div className="font-semibold">{e.qualification}</div>
                    <div className="text-slate-700">{e.school}</div>
                    {e.period && <div className="text-slate-500">{e.period}</div>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </aside>

        {/* RIGHT (main) */}
        <main className="col-span-8">
          <Section title="Summary">
            <p className="text-sm leading-7">{summary}</p>
          </Section>

          {projects?.length > 0 && (
            <Section title="Projects">
              <div className="space-y-4">
                {projects.map((p, i) => (
                  <div key={i}>
                    <div className="text-[15px] font-semibold">
                      {p.name}
                      {p.stack && (
                        <span className="text-slate-500 font-normal"> — {p.stack}</span>
                      )}
                    </div>
                    {p.description && <div className="text-sm leading-6">{p.description}</div>}
                    {p.relevance && (
                      <div className="text-sm text-slate-600 leading-6">{p.relevance}</div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-7">
      <h3 className="text-[11px] font-extrabold tracking-wider uppercase text-slate-600">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}
