import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentSession } from "../utils/auth";

function loadConfs() {
  try {
    const raw = localStorage.getItem("conferences");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveConfs(list) {
  localStorage.setItem("conferences", JSON.stringify(list));
}

export default function Conferences() {
  const [confs, setConfs] = useState([]);
  const navigate = useNavigate();
  const session = currentSession();

  useEffect(() => {
    setConfs(loadConfs());
  }, []);

  function handleDelete(id) {
    if (!window.confirm("Delete this conference?")) return;
    const updated = confs.filter((c) => c.id !== id);
    setConfs(updated);
    saveConfs(updated);
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Conferences</h2>
        <div>
          {session ? (
            <button onClick={() => navigate("/conferences/new")} className="btn primary">New Conference</button>
          ) : (
            <Link to="/login" className="btn">Sign in to create</Link>
          )}
        </div>
      </div>

      {confs.length === 0 ? (
        <div className="empty">No conferences yet. Create one to get started.</div>
      ) : (
        <ul className="conf-list">
          {confs.map((c) => (
            <li key={c.id} className="conf-item">
              <div>
                <h3>{c.title}</h3>
                <div className="meta">{c.date} • {c.location}</div>
                <p className="desc">{c.description}</p>
              </div>
              <div className="actions">
                {session ? (
                  <>
                    <Link to={`/conferences/${c.id}/edit`} className="btn">Edit</Link>
                    <button onClick={() => handleDelete(c.id)} className="btn danger">Delete</button>
                  </>
                ) : (
                  <Link to="/login" className="btn">Sign in to manage</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
