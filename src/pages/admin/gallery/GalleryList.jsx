import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  getAlbums,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  updateAlbumPhotoOrder,
  updateAlbumCoverCard,
  updateAlbumFrontCover,
} from "../../../services/albumService";
import {
  uploadGalleryImage,
  getGalleryThumbnail,
  getPhotoUrl,
  getPhotoPublicId,
  deleteCloudinaryImage,
} from "../../../services/cloudinaryService";
import { validateImageFile } from "../../../services/cloudinaryService";
import "./GalleryList.css";

function SortablePhotoCard({ id, photo, onDelete }) {
  const url = getPhotoUrl(photo);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    aspectRatio: "1",
    overflow: "hidden",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    position: "relative",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {onDelete && (
        <button
          type="button"
          className="admin-button-danger"
          aria-label="Șterge fotografia"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(photo);
          }}
          style={{
            position: "absolute",
            bottom: "4px",
            right: "4px",
            padding: "4px 8px",
            fontSize: "0.75rem",
            minHeight: "auto",
          }}
        >
          Șterge
        </button>
      )}
    </div>
  );
}

const GalleryList = () => {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [coverCardFile, setCoverCardFile] = useState(null);
  const [frontCoverFile, setFrontCoverFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [search, setSearch] = useState("");
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [editingPhotos, setEditingPhotos] = useState([]);
  const [savingOrder, setSavingOrder] = useState(false);
  const [addingPhotos, setAddingPhotos] = useState(false);
  const [addPhotoProgress, setAddPhotoProgress] = useState(null);
  const [deletingPhoto, setDeletingPhoto] = useState(false);
  const [replacingCoverCard, setReplacingCoverCard] = useState(false);
  const [replacingFrontCover, setReplacingFrontCover] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAlbums();
      setAlbums(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const editingAlbum = useMemo(
    () => (editingAlbumId ? albums.find((a) => a.id === editingAlbumId) : null),
    [albums, editingAlbumId]
  );
  const isEdit = !!editingAlbumId;

  useEffect(() => {
    load();
  }, []);

  const filteredAlbums = useMemo(() => {
    return albums.filter((a) =>
      (a.title || "").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [albums, search]);

  const handleEdit = (album) => {
    setEditingAlbumId(album.id);
    setTitle(album.title ?? "");
    setMessage(album.message ?? "");
    setEditingPhotos(Array.isArray(album.photos) ? [...album.photos] : []);
    setCoverCardFile(null);
    setFrontCoverFile(null);
    setPhotoFiles([]);
  };

  const handleCancelEdit = () => {
    setEditingAlbumId(null);
    setTitle("");
    setMessage("");
    setEditingPhotos([]);
    setCoverCardFile(null);
    setFrontCoverFile(null);
    setPhotoFiles([]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setEditingPhotos((prev) => {
        const oldIndex = prev.findIndex((_, i) => String(i) === active.id);
        const newIndex = prev.findIndex((_, i) => String(i) === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleSavePhotoOrder = async () => {
    if (!editingAlbumId) return;
    setSavingOrder(true);
    try {
      await updateAlbumPhotoOrder(editingAlbumId, editingPhotos);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la salvare ordine: " + (err.message || "încercare eșuată."));
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDeletePhoto = async (photo) => {
    const confirmed = window.confirm("Ștergi această fotografie din album?");
    if (!confirmed || !editingAlbumId) return;
    setDeletingPhoto(true);
    try {
      const publicId = getPhotoPublicId(photo);
      if (publicId) {
        await deleteCloudinaryImage(publicId);
      }
      const newPhotos = editingPhotos.filter(
        (p) => getPhotoUrl(p) !== getPhotoUrl(photo) || getPhotoPublicId(p) !== getPhotoPublicId(photo)
      );
      setEditingPhotos(newPhotos);
      await updateAlbumPhotoOrder(editingAlbumId, newPhotos);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere: " + (err.message || "încercare eșuată."));
    } finally {
      setDeletingPhoto(false);
    }
  };

  const handleReplaceCoverCard = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingAlbumId || !editingAlbum) return;
    const valid = validateImageFile(file);
    if (!valid.ok) {
      alert(valid.error);
      e.target.value = "";
      return;
    }
    setReplacingCoverCard(true);
    try {
      const publicId = getPhotoPublicId(editingAlbum.coverCard);
      if (publicId) {
        try {
          await deleteCloudinaryImage(publicId);
        } catch (err) {
          console.warn("Cloudinary delete coverCard:", err);
        }
      }
      const res = await uploadGalleryImage(file);
      const newCover = { url: res.secure_url, public_id: res.public_id ?? null, bytes: res.bytes ?? null };
      await updateAlbumCoverCard(editingAlbumId, newCover);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la înlocuire copertă: " + (err.message || "încercare eșuată."));
    } finally {
      setReplacingCoverCard(false);
      e.target.value = "";
    }
  };

  const handleReplaceFrontCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingAlbumId || !editingAlbum) return;
    const valid = validateImageFile(file);
    if (!valid.ok) {
      alert(valid.error);
      e.target.value = "";
      return;
    }
    setReplacingFrontCover(true);
    try {
      const publicId = getPhotoPublicId(editingAlbum.frontCover);
      if (publicId) {
        try {
          await deleteCloudinaryImage(publicId);
        } catch (err) {
          console.warn("Cloudinary delete frontCover:", err);
        }
      }
      const res = await uploadGalleryImage(file);
      const newCover = { url: res.secure_url, public_id: res.public_id ?? null, bytes: res.bytes ?? null };
      await updateAlbumFrontCover(editingAlbumId, newCover);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la înlocuire copertă frontală: " + (err.message || "încercare eșuată."));
    } finally {
      setReplacingFrontCover(false);
      e.target.value = "";
    }
  };

  const handleAddPhotos = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0 || !editingAlbumId) return;
    setAddingPhotos(true);
    setAddPhotoProgress(0);
    try {
      const total = files.length;
      let done = 0;
      const report = () => {
        done += 1;
        setAddPhotoProgress(Math.round((done / total) * 100));
      };
      const uploaded = [];
      for (const file of files) {
        const res = await uploadGalleryImage(file, report);
        if (res?.secure_url) {
          uploaded.push({ url: res.secure_url, public_id: res.public_id ?? null, bytes: res.bytes ?? null });
        }
      }
      const newPhotos = [...editingPhotos, ...uploaded];
      setEditingPhotos(newPhotos);
      await updateAlbumPhotoOrder(editingAlbumId, newPhotos);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la încărcare: " + (err.message || "încercare eșuată."));
    } finally {
      setAddingPhotos(false);
      setAddPhotoProgress(null);
      e.target.value = "";
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingAlbumId) {
      setCreating(true);
      try {
        await updateAlbum(editingAlbumId, { title: title.trim(), message: (message || "").trim() });
        handleCancelEdit();
        e.target.reset();
        await load();
      } catch (err) {
        console.error(err);
        alert("Eroare la actualizare: " + (err.message || "încercare eșuată."));
      } finally {
        setCreating(false);
      }
      return;
    }

    const coverCardValid = coverCardFile ? validateImageFile(coverCardFile).ok : false;
    const frontCoverValid = frontCoverFile ? validateImageFile(frontCoverFile).ok : false;
    if (!coverCardValid) {
      alert("Încarcă o imagine pentru coperta cardului (galerie).");
      return;
    }
    if (!frontCoverValid) {
      alert("Încarcă imaginea pentru coperta frontală (pagina 2).");
      return;
    }
    setCreating(true);
    setUploadProgress(0);
    try {
      const total = 2 + (photoFiles?.length || 0);
      let done = 0;
      const report = () => {
        done += 1;
        setUploadProgress(Math.round((done / total) * 100));
      };

      const coverCardRes = await uploadGalleryImage(coverCardFile, report);
      const coverCard = { url: coverCardRes.secure_url, public_id: coverCardRes.public_id ?? null, bytes: coverCardRes.bytes ?? null };

      const frontCoverRes = await uploadGalleryImage(frontCoverFile, report);
      const frontCover = { url: frontCoverRes.secure_url, public_id: frontCoverRes.public_id ?? null, bytes: frontCoverRes.bytes ?? null };

      const photos = [];
      for (const file of photoFiles || []) {
        const res = await uploadGalleryImage(file, report);
        if (res.secure_url) {
          photos.push({ url: res.secure_url, public_id: res.public_id ?? null, bytes: res.bytes ?? null });
        }
      }

      await createAlbum({
        title: title.trim(),
        message: (message || "").trim(),
        coverCard,
        frontCover,
        photos,
        createdAt: Date.now(),
      });
      setTitle("");
      setMessage("");
      setCoverCardFile(null);
      setFrontCoverFile(null);
      setPhotoFiles([]);
      e.target.reset();
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la creare album: " + (err.message || "încercare eșuată."));
    } finally {
      setCreating(false);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (album) => {
    const confirmed = window.confirm("Ești sigur că vrei să ștergi acest album?");
    if (!confirmed) return;
    try {
      const ids = [
        getPhotoPublicId(album.coverCard),
        getPhotoPublicId(album.frontCover),
        ...(Array.isArray(album.photos) ? album.photos.map(getPhotoPublicId) : []),
      ].filter(Boolean);
      for (const publicId of ids) {
        try {
          await deleteCloudinaryImage(publicId);
        } catch (e) {
          console.warn("Cloudinary delete skipped:", e);
        }
      }
      await deleteAlbum(album.id);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere.");
    }
  };

  const isBusy =
    creating ||
    uploadProgress !== null ||
    replacingCoverCard ||
    replacingFrontCover;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-page-title">Galerie</h1>
      </div>

      <div className="admin-gallery-layout">
        <div>
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
          ) : albums.length === 0 ? (
            <p>Nu există albume.</p>
          ) : (
            <ul className="admin-album-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {filteredAlbums.map((album) => (
                <li key={album.id} className="admin-card" style={{ textAlign: "center", padding: "16px" }}>
                  {getPhotoUrl(album.coverCard) ? (
                    <img
                      src={getGalleryThumbnail(getPhotoUrl(album.coverCard))}
                      alt=""
                      style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: "6px" }}
                    />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "16/10", background: "#e5e7eb", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                      Fără copertă
                    </div>
                  )}
                  <div style={{ marginTop: "8px", fontWeight: 600 }}>{album.title ?? "—"}</div>
                  <div style={{ marginTop: "4px", fontSize: "0.9em", color: "#6b7280" }}>
                    {(album.photos?.length ?? 0)} fotografii
                  </div>
                  <div style={{ marginTop: "2px", fontSize: "0.85em", color: "#9ca3af" }}>
                    {album.createdAt != null
                      ? format(
                          typeof album.createdAt === "number" ? album.createdAt : album.createdAt?.toMillis?.() ?? 0,
                          "d MMM yyyy",
                          { locale: ro }
                        )
                      : "—"}
                  </div>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
                    <button type="button" onClick={() => handleEdit(album)} className="admin-button">
                      Editează
                    </button>
                    <button type="button" onClick={() => handleDelete(album)} className="admin-button-danger">
                      Șterge
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-album-form">
          <div className="admin-card">
            <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{editingAlbumId ? "Editează album" : "Adaugă album"}</h3>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label>
            <span style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>Titlu album</span>
            <input
              type="text"
              placeholder="Titlu album"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            <span style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>Mesaj (pagina 1)</span>
            <textarea
              placeholder="Mesaj afișat pe prima pagină"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              style={{ width: "100%", padding: "8px", resize: "vertical" }}
            />
          </label>

          {/* Gallery cover (coverCard) - same field for create and edit */}
          <div>
            <span style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>Copertă card (landscape, pentru galerie)</span>
            {isEdit && editingAlbum ? (
              getPhotoUrl(editingAlbum.coverCard) ? (
                <div style={{ marginBottom: "8px" }}>
                  <img
                    src={getGalleryThumbnail(getPhotoUrl(editingAlbum.coverCard))}
                    alt="Copertă actuală"
                    style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  />
                  <label style={{ display: "inline-block", marginTop: "8px" }}>
                    <span className="admin-button" style={{ display: "inline-block", cursor: "pointer" }}>
                      {replacingCoverCard ? "Se înlocuiește…" : "Înlocuiește coperta"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={replacingCoverCard}
                      onChange={handleReplaceCoverCard}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              ) : (
                <label>
                  <span style={{ marginRight: "8px" }}>Adaugă copertă</span>
                  <input type="file" accept="image/*" disabled={replacingCoverCard} onChange={handleReplaceCoverCard} />
                </label>
              )
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverCardFile(e.target.files?.[0] || null)}
              />
            )}
          </div>

          {/* Front cover - same field for create and edit */}
          <div>
            <span style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>Copertă frontală (portrait, pagina 2)</span>
            {isEdit && editingAlbum ? (
              getPhotoUrl(editingAlbum.frontCover) ? (
                <div style={{ marginBottom: "8px" }}>
                  <img
                    src={getGalleryThumbnail(getPhotoUrl(editingAlbum.frontCover))}
                    alt="Copertă frontală actuală"
                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  />
                  <label style={{ display: "inline-block", marginTop: "8px" }}>
                    <span className="admin-button" style={{ display: "inline-block", cursor: "pointer" }}>
                      {replacingFrontCover ? "Se înlocuiește…" : "Înlocuiește coperta frontală"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={replacingFrontCover}
                      onChange={handleReplaceFrontCover}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              ) : (
                <label>
                  <span style={{ marginRight: "8px" }}>Adaugă copertă frontală</span>
                  <input type="file" accept="image/*" disabled={replacingFrontCover} onChange={handleReplaceFrontCover} />
                </label>
              )
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFrontCoverFile(e.target.files?.[0] || null)}
              />
            )}
          </div>

          {/* Photos - create: multiple file input; edit: grid + add photos */}
          {isEdit ? (
            <div style={{ marginTop: "8px" }}>
              <span style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Fotografii album (trage pentru a reordona)</span>
              <div style={{ marginBottom: "8px" }}>
                <label style={{ display: "inline-block" }}>
                  <span style={{ marginRight: "8px", fontWeight: 600 }}>Adaugă fotografii</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={addingPhotos}
                    onChange={handleAddPhotos}
                  />
                </label>
              </div>
              {addPhotoProgress != null && (
                <div style={{ padding: "8px", background: "#f3f4f6", borderRadius: "6px", marginBottom: "8px" }}>
                  <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${addPhotoProgress}%`, background: "#1e3a8a", transition: "width 0.2s" }} />
                  </div>
                  <div style={{ fontSize: "0.9em", marginTop: "4px" }}>Încărcare: {addPhotoProgress}%</div>
                </div>
              )}
              {editingPhotos.length > 0 ? (
                <>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={editingPhotos.map((_, i) => String(i))} strategy={rectSortingStrategy}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
                        {editingPhotos.map((photo, i) => (
                          <SortablePhotoCard
                            key={`${getPhotoUrl(photo)}-${getPhotoPublicId(photo) ?? i}`}
                            id={String(i)}
                            photo={photo}
                            onDelete={handleDeletePhoto}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  <button
                    type="button"
                    onClick={handleSavePhotoOrder}
                    disabled={savingOrder || deletingPhoto}
                    className="admin-button"
                    style={{ marginTop: "12px" }}
                  >
                    {savingOrder ? "Se salvează…" : "Salvează ordinea fotografiilor"}
                  </button>
                </>
              ) : (
                <p style={{ fontSize: "0.9em", color: "#6b7280" }}>Nu există încă fotografii. Adaugă cu butonul de mai sus.</p>
              )}
            </div>
          ) : (
            <label>
              <span style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>Fotografii album (multiple)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPhotoFiles(Array.from(e.target.files || []))}
              />
            </label>
          )}
          {uploadProgress !== null && (
            <div style={{ padding: "8px", background: "#f3f4f6", borderRadius: "6px" }}>
              <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#1e3a8a", transition: "width 0.2s" }} />
              </div>
              <div style={{ fontSize: "0.9em", marginTop: "4px" }}>Încărcare: {uploadProgress}%</div>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button type="submit" disabled={isBusy} className="admin-button">
              {editingAlbumId ? (isBusy ? "Se salvează…" : "Salvează") : isBusy ? "Se creează…" : "Creează album"}
            </button>
            {editingAlbumId && (
              <button type="button" onClick={handleCancelEdit} className="admin-button" style={{ background: "#6b7280" }}>
                Anulează
              </button>
            )}
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryList;
