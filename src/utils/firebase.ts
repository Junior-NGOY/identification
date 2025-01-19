//import firebase from "firebase/app";
//import "firebase/firestore";
import { RegistrationType } from "../types";

// Initialisez Firebase ici avec votre configuration
/* firebase.initializeApp({
  //Your Firebase config here
}); */

//const db = firebase.firestore();
//const registrationsCollection = db.collection("registrations");

export const saveToFirebase = async (registration: RegistrationType) => {
  /* try {
    await registrationsCollection.doc(registration.id).set(registration);
  } catch (error) {
    console.error("Error saving to Firebase:", error);
  } */
};

export const getFromFirebase = async (): Promise<RegistrationType[]> => {
  /*  try {
    const snapshot = await registrationsCollection.get();
    return snapshot.docs.map((doc) => doc.data() as RegistrationType);
  } catch (error) {
    console.error("Error getting data from Firebase:", error);
    return [];
    } */
  return [];
};

export const deleteFromFirebase = async (id: string) => {
  /*  try {
    await registrationsCollection.doc(id).delete();
  } catch (error) {
    console.error("Error deleting from Firebase:", error);
  } */
};

export const updateInFirebase = async (registration: RegistrationType) => {
  /*   try {
    await registrationsCollection.doc(registration.id).update(registration);
  } catch (error) {
    console.error("Error updating in Firebase:", error);
  } */
};
