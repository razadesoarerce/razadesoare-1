import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getEventsAdmin, deleteEvent } from "../../../services/eventService";

const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" });
};

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getEventsAdmin();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = events.filter((e) =>
      (e.title || "").toLowerCase().includes(search.trim().toLowerCase())
    );
    const dir = sortDirection === "asc" ? 1 : -1;
    list = [...list].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dir * (ta - tb);
    });
    return list;
  }, [events, search, sortDirection]);

  const handleDelete = async (event) => {
    const confirmed = window.confirm("Esti sigur ca vrei sa stergi acest element?");
    if (!confirmed) return;
    try {
      await deleteEvent(event.id);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere.");
    }
  };

  const toggleSort = () => {
    setSortDirection((d) => (d === "desc" ? "asc" : "desc"));
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-page-title">Evenimente</h1>
        <Link to="/admin/events/create" className="admin-add-button">
          + Adaugă eveniment
        </Link>
      </div>

      <div className="admin-search-bar">
        <input
          type="text"
          placeholder="Caută..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Se încarcă…</p>
      ) : events.length === 0 ? (
        <p>Nu există evenimente.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Thumbnail</th>
              <th>Title</th>
              <th data-sort onClick={toggleSort} style={{ cursor: "pointer" }}>
                Date created {sortDirection === "desc" ? "↓" : "↑"}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((event) => {
              const coverUrl = event.coverImageUrl || event.coverImage || event.imageUrl;
              return (
                <tr key={event.id}>
                  <td className="admin-thumbnail">
                    {coverUrl ? (
                      <img src={coverUrl} alt="" />
                    ) : (
                      <span style={{ fontSize: "0.85em", color: "#9ca3af" }}>—</span>
                    )}
                  </td>
                  <td>{event.title}</td>
                  <td>{formatDate(event.createdAt)}</td>
                  <td>
                    <Link to={`/admin/events/edit/${event.id}`} className="admin-action-btn admin-edit-btn">Edit</Link>
                    <a href={`${window.location.origin}/evenimente/${event.id}`} target="_blank" rel="noopener noreferrer" className="admin-action-btn admin-preview-btn">Preview</a>
                    <button type="button" onClick={() => handleDelete(event)} className="admin-action-btn admin-delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventsList;
