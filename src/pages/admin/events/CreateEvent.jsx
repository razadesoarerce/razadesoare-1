import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../services/eventService";
import { uploadImage, validateImageFile } from "../../../services/cloudinaryService";
import RichTextEditor from "../../../components/admin/RichTextEditor";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [status, setStatus] = useState("published");
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const previewUrlRef = useRef(null);
  useEffect(() => {
    if (!coverFile) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      setPreviewImage(null);
      return;
    }
    const url = URL.createObjectURL(coverFile);
    previewUrlRef.current = url;
    setPreviewImage(url);
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    };
  }, [coverFile]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCoverFile(file);
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    let coverImageUrl = "";
    let coverImagePublicId = "";
    let coverImageSizeBytes = 0;

    if (coverFile) {
      const validation = validateImageFile(coverFile);
      if (!validation.ok) {
        setErrorMessage(validation.error);
        setLoading(false);
        return;
      }
      setUploadProgress(0);
      try {
        const result = await uploadImage(coverFile, (pct) => setUploadProgress(pct));
        coverImageUrl = result?.secure_url ?? "";
        coverImagePublicId = result?.public_id ?? "";
        coverImageSizeBytes = typeof result?.bytes === "number" ? result.bytes : 0;
      } catch (uploadErr) {
        console.error(uploadErr);
        setErrorMessage("Eroare la încărcarea fișierului.");
        setUploadProgress(null);
        setLoading(false);
        return;
      }
      setUploadProgress(null);
    }

    try {
      await createEvent({
        title,
        content,
        coverImageUrl,
        coverImagePublicId,
        coverImageSizeBytes,
        status,
      });
      setSuccessMessage("Evenimentul a fost salvat.");
      setTimeout(() => navigate("/admin/events"), 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Evenimentul nu a putut fi salvat.");
    } finally {
      setLoading(false);
    }
  };

  const isBusy = loading || uploadProgress !== null;

  return (
    <div>
      <h1 className="admin-page-title">Creează Eveniment</h1>

      {successMessage && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#dcfce7", color: "#166534", borderRadius: "6px" }}>
          ✅ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px" }}>
          ❌ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Titlu</label>
          <input
            type="text"
            placeholder="Titlu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px 12px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Imagine copertă (doar pentru cardul de pe homepage)</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isBusy}
          />
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}>JPG, PNG sau WEBP, max 2 MB. Dimensiune recomandată: 1200×800px.</p>
          {previewImage && (
            <div style={{ marginTop: "12px" }}>
              <div style={{ fontSize: "0.9em", color: "#666", marginBottom: "6px" }}>Preview</div>
              <img src={previewImage} alt="Preview copertă" style={{ maxWidth: "100%", maxHeight: "240px", objectFit: "contain", border: "1px solid #e5e7eb", borderRadius: "6px" }} />
            </div>
          )}
          {uploadProgress !== null && (
            <div style={{ marginTop: "12px", padding: "12px", background: "#f3f4f6", borderRadius: "6px" }}>
              <div style={{ marginBottom: "6px" }}>Se încarcă imaginea…</div>
              <div style={{ height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#1e3a8a", transition: "width 0.2s" }} />
              </div>
              <div style={{ fontSize: "0.9em", marginTop: "4px" }}>Progres: {uploadProgress}%</div>
            </div>
          )}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Conținut articol</label>
          <RichTextEditor value={content} onChange={setContent} minHeight={280} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px 12px" }} disabled={isBusy}>
            <option value="published">Publicat</option>
            <option value="draft">Ciornă</option>
          </select>
        </div>

        <button type="submit" disabled={isBusy} style={{ padding: "10px 20px", alignSelf: "flex-start" }}>
          {loading ? "Se salvează…" : "Salvează eveniment"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
