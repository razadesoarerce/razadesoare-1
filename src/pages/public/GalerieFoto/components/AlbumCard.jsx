import { getGalleryThumbnail } from "../../../../services/cloudinaryService";

const AlbumCard = ({ album, onOpen }) => {
  const photoCount = album.photos?.length || 0;

  return (
    <article className="album-card" onClick={() => onOpen(album)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(album)} aria-label={`Deschide albumul ${album.title}`}>
      <div className="album-card-cover-wrap">
        <img
          src={getGalleryThumbnail(album.cover)}
          alt=""
          className="album-card-cover"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x280/e5e7eb/6b7280?text=${encodeURIComponent(album.title)}`;
          }}
        />
        <div className="album-card-overlay">
          <span className="album-card-open-icon" aria-hidden>Open Album</span>
        </div>
      </div>
      <div className="album-card-info">
        <h3 className="album-card-title">{album.title}</h3>
        <p className="album-card-count">{photoCount} {photoCount === 1 ? "fotografie" : "fotografii"}</p>
      </div>
    </article>
  );
};

export default AlbumCard;
