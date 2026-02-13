import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const eventsCollection = collection(db, "events");

export const createEvent = async (eventData) => {
  return await addDoc(eventsCollection, {
    ...eventData,
    createdAt: new Date(),
  });
};

export const getEvents = async () => {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteEvent = async (id) => {
  const eventDoc = doc(db, "events", id);
  return await deleteDoc(eventDoc);
};