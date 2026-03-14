import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAlbums, getAlbum } from "../../../services/albumService";
import { getFlipbookImage, getPhotoUrl } from "../../../services/cloudinaryService";
import AlbumCard from "./components/AlbumCard";
import AlbumViewer from "./components/AlbumViewer";
import "./GalerieFoto.css";

const GalerieFoto = () => {
  const { t } = useTranslation();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbums()
      .then(setAlbums)
      .catch(() => setAlbums([]))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenAlbum = async (album) => {
    if (getPhotoUrl(album.frontCover) && Array.isArray(album.photos)) {
      setSelectedAlbum(buildAlbumForViewer(album));
      return;
    }
    const full = await getAlbum(album.id).catch(() => null);
    if (full) setSelectedAlbum(buildAlbumForViewer(full));
  };

  function buildAlbumForViewer(a) {
    const frontCoverUrl = getPhotoUrl(a.frontCover) || "";
    const restUrls = (Array.isArray(a.photos) ? a.photos : []).map(getPhotoUrl);
    const photos = [frontCoverUrl, ...restUrls].map((src, i) => ({
      id: String(i),
      src: getFlipbookImage(src),
      alt: "",
    }));
    return {
      id: a.id,
      title: a.title ?? "",
      message: a.message ?? "",
      cover: frontCoverUrl ? { src: getFlipbookImage(frontCoverUrl), alt: "" } : null,
      photos,
    };
  }

  const albumsForGrid = albums.map((a) => ({
    ...a,
    cover: getPhotoUrl(a.coverCard),
  }));

  return (
    <section className="galerie-foto-page">
      <div className="galerie-title-section">
        <h2>{t("galerieFoto.pageTitle")}</h2>
        <p>{t("galerieFoto.description")}</p>
      </div>

      {loading && albums.length === 0 ? (
        <p>Se încarcă…</p>
      ) : (
        <div className="album-grid">
          {albumsForGrid.map((album) => (
            <AlbumCard key={album.id} album={album} onOpen={handleOpenAlbum} />
          ))}
        </div>
      )}

      {selectedAlbum && (
        <AlbumViewer
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </section>
  );
};

export default GalerieFoto;
