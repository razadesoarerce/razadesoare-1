import { useEffect, useState, useRef } from "react";
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../../services/teamService";
import { uploadImageToCloudinary } from "../../../services/uploadService";
import { validateImageFile } from "../../../services/cloudinaryService";

const CATEGORIES = [
  { value: "conducere", label: "Conducere" },
  { value: "cadre-didactice", label: "Cadre didactice" },
  { value: "specialisti", label: "Specialiști" },
  { value: "personal-auxiliar", label: "Personal auxiliar" },
];

const emptyForm = () => ({
  name: "",
  function: "",
  specialization: "",
  experience: "",
  category: "cadre-didactice",
});

const TeamAdmin = () => {
  const [members, setMembers] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  const load = async () => {
    setListLoading(true);
    try {
      const data = await getTeamMembers();
      setMembers(data);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null);
  };

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setImageFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.ok) {
        setErrorMessage(validation.error);
        return;
      }
      setErrorMessage(null);
    }
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitLoading(true);

    const experienceNum = form.experience === "" ? 0 : parseInt(form.experience, 10);
    let imageUrl = editingId ? (members.find((m) => m.id === editingId)?.imageUrl || "") : "";

    try {
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const payload = {
        name: form.name.trim(),
        function: form.function.trim(),
        specialization: form.specialization.trim(),
        experience: isNaN(experienceNum) ? 0 : experienceNum,
        category: form.category,
        imageUrl,
      };

      if (editingId) {
        const order = members.find((m) => m.id === editingId)?.order ?? 0;
        await updateTeamMember(editingId, { ...payload, order });
        setSuccessMessage("Membru actualizat cu succes.");
      } else {
        const nextOrder = members.length > 0 ? Math.max(...members.map((m) => m.order ?? 0), 0) + 1 : 0;
        await addTeamMember({
          ...payload,
          order: nextOrder,
          createdAt: new Date(),
        });
        setSuccessMessage("Membru adăugat cu succes.");
      }
      resetForm();
      await load();
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.message || "Eroare la salvare.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (member) => {
    setForm({
      name: member.name || "",
      function: member.function ?? "",
      specialization: member.specialization || "",
      experience: member.experience != null ? String(member.experience) : "",
      category: member.category || "cadre-didactice",
    });
    setEditingId(member.id);
    setImageFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleDelete = async (member) => {
    const confirmed = window.confirm("Ești sigur că vrei să ștergi acest membru?");
    if (!confirmed) return;
    try {
      await deleteTeamMember(member.id);
      setSuccessMessage("Membru șters.");
      if (editingId === member.id) resetForm();
      await load();
    } catch (err) {
      console.error(err);
      setErrorMessage("Eroare la ștergere.");
    }
  };

  const moveOrder = async (member, direction) => {
    const idx = members.findIndex((m) => m.id === member.id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= members.length) return;
    const other = members[swapIdx];
    const memberOrder = member.order ?? idx;
    const otherOrder = other.order ?? swapIdx;
    try {
      await updateTeamMember(member.id, { order: otherOrder });
      await updateTeamMember(other.id, { order: memberOrder });
      await load();
    } catch (err) {
      console.error(err);
      setErrorMessage("Eroare la schimbarea ordinii.");
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-page-title">Gestionare Echipă</h1>
      </div>

      {successMessage && (
        <div className="admin-success-message" style={{ marginBottom: "16px", padding: "12px 16px", background: "#dcfce7", color: "#166534", borderRadius: "6px" }}>
          ✅ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px" }}>
          ❌ {errorMessage}
        </div>
      )}

      {submitLoading && (
        <p style={{ marginBottom: "16px", color: "#6b7280" }}>Se încarcă…</p>
      )}

      <div className="admin-card" style={{ marginBottom: "24px", maxWidth: "560px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{editingId ? "Actualizează membru" : "Adaugă membru"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.9rem" }}>Imagine profil</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              style={{ width: "100%", padding: "6px 0", fontSize: "0.9rem" }}
            />
            {editingId && members.find((m) => m.id === editingId)?.imageUrl && !imageFile && (
              <p style={{ marginTop: "6px", fontSize: "0.85rem", color: "#6b7280" }}>Imagine existentă: se păstrează dacă nu alegi una nouă.</p>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.9rem" }}>Nume</label>
            <input
              type="text"
              placeholder="Nume"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.9rem" }}>Funcție</label>
            <input
              type="text"
              placeholder="Funcție"
              value={form.function}
              onChange={(e) => setField("function", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.9rem" }}>Specializare</label>
            <input
              type="text"
              placeholder="Specializare"
              value={form.specialization}
              onChange={(e) => setField("specialization", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.9rem" }}>Experiență (ani)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.experience}
              onChange={(e) => setField("experience", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.9rem" }}>Categorie</label>
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="submit" disabled={submitLoading} className="admin-button">
              {submitLoading ? "Se încarcă…" : editingId ? "Actualizează" : "Adaugă"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="admin-button-secondary">
                Anulează
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 style={{ marginBottom: "12px" }}>Membri</h3>
      {listLoading ? (
        <p>Se încarcă…</p>
      ) : members.length === 0 ? (
        <p>Nu există membri.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Ordine</th>
              <th style={{ width: "70px" }}>Imagine</th>
              <th>Nume</th>
              <th>Funcție</th>
              <th>Categorie</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <tr key={member.id}>
                <td>
                  <button
                    type="button"
                    onClick={() => moveOrder(member, "up")}
                    disabled={idx === 0}
                    className="admin-button-secondary"
                    style={{ padding: "4px 8px", marginRight: "4px" }}
                    title="Sus"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveOrder(member, "down")}
                    disabled={idx === members.length - 1}
                    className="admin-button-secondary"
                    style={{ padding: "4px 8px" }}
                    title="Jos"
                  >
                    ↓
                  </button>
                </td>
                <td className="admin-thumbnail">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt="" />
                  ) : (
                    <span style={{ fontSize: "0.85em", color: "#9ca3af" }}>—</span>
                  )}
                </td>
                <td>{member.name}</td>
                <td>{member.function ?? "—"}</td>
                <td>{CATEGORIES.find((c) => c.value === member.category)?.label ?? member.category}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(member)} className="admin-action-btn admin-edit-btn">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(member)} className="admin-action-btn admin-delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamAdmin;
