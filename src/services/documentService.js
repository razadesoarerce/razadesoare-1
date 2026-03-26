import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { uploadDocument as uploadToCloudinary } from "./cloudinaryService";
import { deleteCloudinaryImage } from "./cloudinaryService";

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
  const url = document?.url || document?.fileUrl;
  if (!url) return "";

  const filename = encodeURIComponent(
    document.originalName || document.title || "document"
  );

  return `/api/download-document?url=${encodeURIComponent(url)}&filename=${filename}`;
};

/** Upload file to Cloudinary (documents folder) and save metadata to Firestore. */
export const uploadDocument = async (file, title, description, category, onProgress) => {
  const result = await uploadToCloudinary(file, onProgress);
  const originalName = sanitizeFilename(file.name || "document");
  const docRef = await addDoc(collection(db, COLLECTION), {
    title: title || file.name || "Document",
    description: description || "",
    category: category || "internal",
    url: result.secure_url,
    fileUrl: result.secure_url,
    publicId: result.public_id || null,
    originalName,
    createdAt: new Date(),
  });
  return { id: docRef.id };
};

export const updateDocumentMeta = async (id, data) => {
  await updateDoc(doc(db, COLLECTION, id), {
    title: data.title || "Document",
    description: data.description || "",
    category: data.category || "internal",
  });
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
    description: d.data().description || "",
    category: d.data().category || "internal",
    createdAt: d.data().createdAt?.toDate?.()?.toISOString?.() ?? d.data().createdAt,
  }));
};

export const deleteDocument = async (docItem) => {
  try {
    if (docItem?.publicId) {
      await deleteCloudinaryImage(docItem.publicId);
    }
    await deleteDoc(doc(db, COLLECTION, docItem.id));
  } catch (err) {
    console.error("Delete failed:", err);
    throw err;
  }
};
