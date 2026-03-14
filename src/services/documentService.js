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

/** Upload file to Cloudinary (documents folder) and save metadata to Firestore. */
export const uploadDocument = async (file, title, onProgress) => {
  const result = await uploadToCloudinary(file, onProgress);
  const fileUrl = result.secure_url;
  const fileType = file.type || result.format || "";
  const fileSizeBytes = typeof result.bytes === "number" ? result.bytes : 0;
  const docRef = await addDoc(collection(db, COLLECTION), {
    title: title || file.name || "Document",
    fileUrl,
    fileType,
    fileSizeBytes,
    createdAt: new Date(),
  });
  return { id: docRef.id, title: title || file.name, fileUrl, fileType, fileSizeBytes, createdAt: new Date() };
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
