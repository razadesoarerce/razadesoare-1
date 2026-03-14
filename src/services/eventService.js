import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "events";

const mapDoc = (d) => {
  const data = d.data();
  return {
    id: d.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
    updatedAt: data.updatedAt?.toDate?.() ?? data.updatedAt,
  };
};

export const createEvent = async (eventData) => {
  const now = new Date();
  const payload = {
    title: eventData.title,
    content: eventData.content || "",
    coverImageUrl: eventData.coverImageUrl || "",
    coverImagePublicId: eventData.coverImagePublicId || "",
    coverImageSizeBytes: typeof eventData.coverImageSizeBytes === "number" ? eventData.coverImageSizeBytes : 0,
    status: eventData.status || "published",
    createdAt: now,
    updatedAt: now,
  };
  const docRef = await addDoc(collection(db, COLLECTION), payload);
  return { id: docRef.id, ...payload };
};

/** Admin: all events (any status) */
export const getEventsAdmin = async () => {
  const q = query(
    collection(db, COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc);
};

/** Public: published events only (missing status treated as published) */
export const getEvents = async () => {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc).filter((e) => e.status !== "draft");
};

export const getLatestEvents = async (count = 3) => {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"), limit(Math.max(count, 10)));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc).filter((e) => e.status !== "draft").slice(0, count);
};

/** Admin: get by id (any status) */
export const getEventByIdAdmin = async (id) => {
  const d = await getDoc(doc(db, COLLECTION, id));
  if (!d.exists()) return null;
  return mapDoc(d);
};

/** Public: get by id (published only; missing status treated as published) */
export const getEventById = async (id) => {
  const ev = await getEventByIdAdmin(id);
  if (!ev || ev.status === "draft") return null;
  return ev;
};

export const updateEvent = async (id, eventData) => {
  const now = new Date();
  const payload = {
    title: eventData.title,
    content: eventData.content ?? "",
    coverImageUrl: eventData.coverImageUrl ?? "",
    coverImagePublicId: eventData.coverImagePublicId ?? "",
    coverImageSizeBytes: typeof eventData.coverImageSizeBytes === "number" ? eventData.coverImageSizeBytes : 0,
    status: eventData.status ?? "published",
    updatedAt: now,
  };
  await updateDoc(doc(db, COLLECTION, id), payload);
  return { id, ...payload };
};

/** Delete event (cover image remains on Cloudinary). */
export const deleteEvent = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
