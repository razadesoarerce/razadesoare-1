/**
 * Storage usage calculated from Firestore metadata (event covers + documents + gallery images).
 * Gallery image sizes come from bytes stored when uploading to Cloudinary.
 */
import { getEventsAdmin } from "./eventService";
import { getDocuments } from "./documentService";
import { getAlbums } from "./albumService";

const FREE_STORAGE_LIMIT_GB = 25;
const FREE_STORAGE_LIMIT_BYTES = FREE_STORAGE_LIMIT_GB * 1024 * 1024 * 1024;

const ESTIMATED_BYTES_PER_IMAGE = 80 * 1024; // 80 KB fallback for legacy gallery images without stored bytes

function getItemBytes(item) {
  if (item == null) return 0;
  if (typeof item === "object") {
    if (typeof item.bytes === "number" && item.bytes > 0) return item.bytes;
    if (item.url || item.src) return ESTIMATED_BYTES_PER_IMAGE;
  }
  return 0;
}

/**
 * Fetch storage usage from Firestore.
 * @returns { Promise<{ imagesSizeBytes: number, documentsSizeBytes: number, galleryImagesSizeBytes: number }> }
 */
export async function getStorageUsage() {
  const [events, documents, albums] = await Promise.all([
    getEventsAdmin(),
    getDocuments(),
    getAlbums(),
  ]);

  const imagesSizeBytes = events.reduce(
    (sum, e) => sum + (Number(e.coverImageSizeBytes) || 0),
    0
  );
  const documentsSizeBytes = documents.reduce(
    (sum, d) => sum + (Number(d.fileSizeBytes) || 0),
    0
  );

  let galleryImagesSizeBytes = 0;
  for (const album of albums) {
    galleryImagesSizeBytes += getItemBytes(album.coverCard);
    galleryImagesSizeBytes += getItemBytes(album.frontCover);
    if (Array.isArray(album.photos)) {
      for (const p of album.photos) {
        galleryImagesSizeBytes += getItemBytes(p);
      }
    }
  }

  return { imagesSizeBytes, documentsSizeBytes, galleryImagesSizeBytes };
}

export { FREE_STORAGE_LIMIT_GB, FREE_STORAGE_LIMIT_BYTES };
