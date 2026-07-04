import {collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, serverTimestamp,} from "firebase/firestore";
import { db } from "./firebase";

const productsRef = collection(db, "products"); 

// Gets every product from Firestore
export const getAllProducts = async () => {
  const result = await getDocs(productsRef); 
  return result.docs.map((item) => ({ id: item.id, ...item.data() })); 
};

// Get single product by id
export const getProduct = async (productId) => {
  const productRef = doc(db, "products", productId); 
  const result = await getDoc(productRef);

  if (result.exists()) {
    return { id: result.id, ...result.data() };
  } else {
    return null; 
  }
};

// Add new product
export const createProduct = async (productData) => {
  const newProduct = await addDoc(productsRef, {
    ...productData,
    createdAt: serverTimestamp(), 
  });
  return newProduct.id;
};

// Update an existing product
export const updateProduct = async (productId, updates) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, updates); // only changes the fields we pass in
};

// Delete a product
export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};

// Get distinct product categories
export const getCategories = async () => {
  const snapshot = await getDocs(productsRef);
  const categories = new Set();
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.category) categories.add(data.category);
  });
  return Array.from(categories);
};