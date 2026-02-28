import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function loadConfs() {
  try { return JSON.parse(localStorage.getItem("conferences") || "[]"); } catch { return []; }
}

function saveConfs(list) { localStorage.setItem("conferences", JSON.stringify(list)); }

export default function ConferenceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", date: "", location: "", description: "" });

  useEffect(() => {
    if (id) {
      const found = loadConfs().find((c) => String(c.id) === String(id));
      if (found) setForm(found);
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const list = loadConfs();
    if (id) {
      const updated = list.map((c) => (String(c.id) === String(id) ? { ...c, ...form } : c));
      saveConfs(updated);
    } else {
      const newItem = { ...form, id: Date.now().toString() };
      list.push(newItem);
      saveConfs(list);
    }
    navigate("/conferences");
  }

  return (
    <section className="panel">
      <h2>{id ? "Edit Conference" : "New Conference"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>Date
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </label>

        <label>Location
          <input name="location" value={form.location} onChange={handleChange} required />
        </label>

        <label>Description
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn primary">Save</button>
          <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </section>
  );
}
