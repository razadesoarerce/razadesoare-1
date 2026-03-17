import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

const colRef = collection(db, "teamMembers");

export const getTeamMembers = async () => {
  const q = query(colRef, orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const addTeamMember = async (data) => {
  const order = typeof data.order === "number" ? data.order : 0;
  const now = data.createdAt && data.createdAt instanceof Date ? data.createdAt : new Date();
  const payload = {
    name: data.name || "",
    function: data.function ?? "",
    specialization: data.specialization || "",
    experience: typeof data.experience === "number" ? data.experience : 0,
    category: data.category || "cadre-didactice",
    imageUrl: data.imageUrl || "",
    order,
    createdAt: now,
  };
  const docRef = await addDoc(colRef, payload);
  return { id: docRef.id, ...payload };
};

export const updateTeamMember = async (id, data) => {
  const ref = doc(db, "teamMembers", id);
  const payload = { ...data };
  if (payload.function === undefined) delete payload.function;
  await updateDoc(ref, payload);
};

export const deleteTeamMember = async (id) => {
  await deleteDoc(doc(db, "teamMembers", id));
};
