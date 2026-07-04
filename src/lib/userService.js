// userService.js
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser as deleteAuthUser } from "firebase/auth";
import { db, auth } from "./firebase";

// Gets user profile data from Firestore
export const getUser = async (uid) => {
  const userRef = doc(db, "users", uid); 
  const result = await getDoc(userRef); 

  if (result.exists()) {
    return { id: result.id, ...result.data() }; // return the user data
  } else {
    return null; // no user found with that id
  }
};

// Update a user's profile data
export const updateUser = async (uid, updates) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updates); // only updates the fields we pass in
};

// Delete a user's profile and their account
export const deleteUserAccount = async (uid) => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef); // delete their data from Firestore first
  await deleteAuthUser(auth.currentUser); // then delete their login account
};