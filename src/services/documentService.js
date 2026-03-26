import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { uploadDocument as uploadToCloudinary } from "./cloudinaryService";

const COLLECTION = "documents";

const sanitizeFilename = (name) => {
  const fallback = "document";
  if (!name || typeof name !== "string") return fallback;
  return name
    .trim()
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .slice(0, 180) || fallback;
};

export const getDocumentDownloadUrl = (document) => {
  const fileUrl = document?.url || document?.fileUrl || "";
  if (!fileUrl || typeof fileUrl !== "string") return "";
  const originalName = sanitizeFilename(
    document?.originalName || document?.title || "document"
  );
  const filename = encodeURIComponent(originalName);
  let url = fileUrl;
  // Future-safe: only normalize resource type when needed.
  if (!url.includes("/raw/upload/")) {
    url = url.replace("/image/upload/", "/raw/upload/");
    url = url.replace("/auto/upload/", "/raw/upload/");
  }
  // Inject attachment transformation once.
  if (!url.includes("/upload/fl_attachment:")) {
    url = url.replace("/upload/", `/upload/fl_attachment:${filename}/`);
  }
  return url;
};

/** Upload file to Cloudinary (documents folder) and save metadata to Firestore. */
export const uploadDocument = async (file, title, onProgress) => {
  const result = await uploadToCloudinary(file, onProgress);
  const fileUrl = result.secure_url;
  const url = result.secure_url;
  const publicId = result.public_id || null;
  const resourceType = "raw";
  const fileType = file.type || result.format || "";
  const fileSizeBytes = typeof result.bytes === "number" ? result.bytes : 0;
  const originalName = sanitizeFilename(file.name || title || "document");
  const docRef = await addDoc(collection(db, COLLECTION), {
    title: title || file.name || "Document",
    url,
    fileUrl,
    publicId,
    resourceType,
    originalName,
    fileType,
    fileSizeBytes,
    createdAt: new Date(),
  });
  return {
    id: docRef.id,
    title: title || file.name,
    url,
    fileUrl,
    publicId,
    resourceType,
    originalName,
    fileType,
    fileSizeBytes,
    createdAt: new Date(),
  };
};

export const getDocuments = async () => {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.()?.toISOString?.() ?? d.data().createdAt,
  }));
};

export const deleteDocument = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
