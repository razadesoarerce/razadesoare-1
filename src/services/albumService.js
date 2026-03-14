import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

const ALBUMS_COLLECTION = "albums";

/**
 * Create album with Cloudinary URLs. Metadata: title, message, coverCard, frontCover, photos[].
 */
export const createAlbum = async (metadata) => {
  const payload = {
    title: metadata.title ?? "",
    message: metadata.message ?? "",
    coverCard: metadata.coverCard ?? "",
    frontCover: metadata.frontCover ?? "",
    photos: Array.isArray(metadata.photos) ? metadata.photos : [],
    createdAt: typeof metadata.createdAt === "number" ? metadata.createdAt : Date.now(),
  };
  const docRef = await addDoc(collection(db, ALBUMS_COLLECTION), payload);
  return { id: docRef.id, ...payload };
};

export const getAlbums = async () => {
  const q = query(
    collection(db, ALBUMS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Get album document by id. Used for viewer (frontCover + photos).
 */
export const getAlbum = async (albumId) => {
  const snap = await getDoc(doc(db, ALBUMS_COLLECTION, albumId));
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...snap.data(),
  };
};

/**
 * Get photos for an album (from document photos array). Returns list of { id, url, alt }.
 */
export const getAlbumPhotos = async (albumId) => {
  const album = await getAlbum(albumId);
  if (!album) return [];
  const urls = album.photos || [];
  return urls.map((url, i) => ({ id: String(i), url, alt: "" }));
};

export const deleteAlbum = async (albumId) => {
  await deleteDoc(doc(db, ALBUMS_COLLECTION, albumId));
};

/**
 * Update album title and message only. Does not re-upload or change images.
 */
export const updateAlbum = async (albumId, { title, message }) => {
  await updateDoc(doc(db, ALBUMS_COLLECTION, albumId), {
    title: title ?? "",
    message: message ?? "",
  });
};

/**
 * Update only gallery cover (coverCard). Does not modify photos array.
 */
export const updateAlbumCoverCard = async (albumId, coverCard) => {
  await updateDoc(doc(db, ALBUMS_COLLECTION, albumId), { coverCard: coverCard ?? "" });
};

/**
 * Update only front cover. Does not modify photos array.
 */
export const updateAlbumFrontCover = async (albumId, frontCover) => {
  await updateDoc(doc(db, ALBUMS_COLLECTION, albumId), { frontCover: frontCover ?? "" });
};

/**
 * Save new photo order for an album. photos = array of URLs in desired order.
 */
export const updateAlbumPhotoOrder = async (albumId, photos) => {
  await updateDoc(doc(db, ALBUMS_COLLECTION, albumId), {
    photos: Array.isArray(photos) ? photos : [],
  });
};

/**
 * Add a photo to an existing album (upload to Cloudinary, append URL to doc).
 */
export const addAlbumPhoto = async (albumId, file, uploadProgress) => {
  const { uploadGalleryImage } = await import("./cloudinaryService");
  const res = await uploadGalleryImage(file, uploadProgress);
  const url = res.secure_url;
  const album = await getAlbum(albumId);
  if (!album) throw new Error("Album not found");
  const photos = [...(album.photos || []), url];
  await updateDoc(doc(db, ALBUMS_COLLECTION, albumId), { photos });
  return { id: String(photos.length - 1), url, alt: "" };
};

/**
 * Remove a photo from an album by index.
 */
export const deleteAlbumPhotoByIndex = async (albumId, index) => {
  const album = await getAlbum(albumId);
  if (!album) throw new Error("Album not found");
  const photos = [...(album.photos || [])];
  photos.splice(Number(index), 1);
  await updateDoc(doc(db, ALBUMS_COLLECTION, albumId), { photos });
};
