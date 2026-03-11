import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ALBUM_DEMO } from "./albumData";
import AlbumCard from "./components/AlbumCard";
import AlbumViewer from "./components/AlbumViewer";
import "./GalerieFoto.css";

const GalerieFoto = () => {
  const { t } = useTranslation();
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <section className="galerie-foto-page">
      <div className="galerie-title-section">
        <h2>{t("galerieFoto.pageTitle")}</h2>
        <p>{t("galerieFoto.description")}</p>
      </div>

      <div className="album-grid">
        <AlbumCard album={ALBUM_DEMO} onOpen={setSelectedAlbum} />
      </div>

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
