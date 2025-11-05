
import React, { useEffect, useState } from "react";
import { api } from "../api";
import ResumePreview from "../components/ResumePreview.jsx";
import { exportPdf } from "../utils/pdf";

export default function Create({ user }) {
  const [cv, setCv] = useState({
    fullName: "",
    role: "",
    summary: "",
    contacts: { phone: "", email: "", github: "", linkedin: "" },
    skills: [],
    education: [],
    projects: [],
  });
  const [rawSkills, setRawSkills] = useState("Java, C#, JavaScript, SQL, MongoDB");

  useEffect(() => {
    api("/api/cv/mine")
      .then((data) => data && setCv((prev) => ({ ...prev, ...data })))
      .catch(() => { });
  }, []);

  async function save() {
    const body = { ...cv, skills: parseSkills(rawSkills) };
    const existing = await api("/api/cv/mine").catch(() => null);
    if (existing?._id) {
      await api(`/api/cv/${existing._id}`, { method: "PUT", body });
    } else {
      await api("/api/cv", { method: "POST", body });
    }
    // Auto-download after successful save
    const nameForFile = (cv.fullName?.trim() || user?.name?.trim() || "CV") + " - CV";
    await exportPdf(nameForFile);
    alert("Saved and downloaded ✅");
  }

  // Helpers
  const parseSkills = (s) => s.split(",").map((x) => x.trim()).filter(Boolean);

  // Mutators for arrays
  const addEdu = () =>
    setCv((c) => ({
      ...c,
      education: [...(c.education || []), { school: "", qualification: "", period: "" }],
    }));

  const updateEdu = (i, field, value) =>
    setCv((c) => {
      const copy = [...(c.education || [])];
      copy[i] = { ...copy[i], [field]: value };
      return { ...c, education: copy };
    });

  const removeEdu = (i) =>
    setCv((c) => {
      const copy = [...(c.education || [])];
      copy.splice(i, 1);
      return { ...c, education: copy };
    });

  const addProj = () =>
    setCv((c) => ({
      ...c,
      projects: [...(c.projects || []), { name: "", stack: "", description: "", relevance: "" }],
    }));

  const updateProj = (i, field, value) =>
    setCv((c) => {
      const copy = [...(c.projects || [])];
      copy[i] = { ...copy[i], [field]: value };
      return { ...c, projects: copy };
    });

  const removeProj = (i) =>
    setCv((c) => {
      const copy = [...(c.projects || [])];
      copy.splice(i, 1);
      return { ...c, projects: copy };
    });

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* LEFT: Form */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Enter your details</h2>

        {/* Basic */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Full name</label>
            <input className="input"
              value={cv.fullName}
              onChange={(e) => setCv({ ...cv, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Role / Title</label>
            <input className="input"
              value={cv.role}
              onChange={(e) => setCv({ ...cv, role: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Summary</label>
            <textarea className="input h-28"
              value={cv.summary}
              onChange={(e) => setCv({ ...cv, summary: e.target.value })}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label">Phone</label>
            <input className="input"
              value={cv.contacts.phone}
              onChange={(e) => setCv({ ...cv, contacts: { ...cv.contacts, phone: e.target.value } })}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input"
              value={cv.contacts.email}
              onChange={(e) => setCv({ ...cv, contacts: { ...cv.contacts, email: e.target.value } })}
            />
          </div>
          <div>
            <label className="label">GitHub</label>
            <input className="input"
              value={cv.contacts.github}
              onChange={(e) => setCv({ ...cv, contacts: { ...cv.contacts, github: e.target.value } })}
            />
          </div>
          <div>
            <label className="label">LinkedIn</label>
            <input className="input"
              value={cv.contacts.linkedin}
              onChange={(e) => setCv({ ...cv, contacts: { ...cv.contacts, linkedin: e.target.value } })}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <label className="label">Skills (comma separated)</label>
          <input className="input"
            value={rawSkills}
            onChange={(e) => setRawSkills(e.target.value)}
          />
        </div>

        {/* Education */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Education</h3>
            <button className="btn btn-primary" type="button" onClick={addEdu}>Add Education</button>
          </div>
          <div className="mt-3 space-y-3">
            {(cv.education || []).map((e, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-3 border rounded-lg p-3">
                <input className="input" placeholder="School"
                  value={e.school}
                  onChange={(ev) => updateEdu(i, "school", ev.target.value)}
                />
                <input className="input" placeholder="Qualification"
                  value={e.qualification}
                  onChange={(ev) => updateEdu(i, "qualification", ev.target.value)}
                />
                <input className="input" placeholder="Period (e.g., 2022–2025)"
                  value={e.period}
                  onChange={(ev) => updateEdu(i, "period", ev.target.value)}
                />
                <div className="md:col-span-3">
                  <button className="btn btn-ghost" type="button" onClick={() => removeEdu(i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Projects</h3>
            <button className="btn btn-primary" type="button" onClick={addProj}>Add Project</button>
          </div>
          <div className="mt-3 space-y-3">
            {(cv.projects || []).map((p, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-3 border rounded-lg p-3">
                <input className="input" placeholder="Name"
                  value={p.name}
                  onChange={(ev) => updateProj(i, "name", ev.target.value)}
                />
                <input className="input" placeholder="Tech stack"
                  value={p.stack}
                  onChange={(ev) => updateProj(i, "stack", ev.target.value)}
                />
                <textarea className="input md:col-span-2" placeholder="Description"
                  value={p.description}
                  onChange={(ev) => updateProj(i, "description", ev.target.value)}
                />
                <input className="input md:col-span-2" placeholder="Relevance / impact (optional)"
                  value={p.relevance}
                  onChange={(ev) => updateProj(i, "relevance", ev.target.value)}
                />
                <div className="md:col-span-2">
                  <button className="btn btn-ghost" type="button" onClick={() => removeProj(i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={save}>Save</button>
          <button className="btn" onClick={() => exportPdf()}>Export as PDF</button>
        </div>
      </div>

      {/* RIGHT: Live preview */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Live preview</h2>
        <ResumePreview data={{ ...cv, skills: parseSkills(rawSkills) }} />
      </div>
    </div>
  );
}
