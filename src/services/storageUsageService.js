/**
 * Storage usage calculated from Firestore metadata (event cover images + documents).
 * No Cloudinary Admin API or backend required.
 */
import { getEventsAdmin } from "./eventService";
import { getDocuments } from "./documentService";

const FREE_STORAGE_LIMIT_GB = 25;
const FREE_STORAGE_LIMIT_BYTES = FREE_STORAGE_LIMIT_GB * 1024 * 1024 * 1024;

/**
 * Fetch storage usage from Firestore.
 * @returns { Promise<{ imagesSizeBytes: number, documentsSizeBytes: number }> }
 */
export async function getStorageUsage() {
  const [events, documents] = await Promise.all([
    getEventsAdmin(),
    getDocuments(),
  ]);

  const imagesSizeBytes = events.reduce(
    (sum, e) => sum + (Number(e.coverImageSizeBytes) || 0),
    0
  );
  const documentsSizeBytes = documents.reduce(
    (sum, d) => sum + (Number(d.fileSizeBytes) || 0),
    0
  );

  return { imagesSizeBytes, documentsSizeBytes };
}

export { FREE_STORAGE_LIMIT_GB, FREE_STORAGE_LIMIT_BYTES };
