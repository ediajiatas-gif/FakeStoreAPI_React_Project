import {collection, addDoc, query, where, orderBy, getDocs, getDoc, doc, serverTimestamp} from "firebase/firestore";
import { db } from "./firebase";

const ordersRef = collection(db, "orders"); 

// Create new order when a user checks out
export const createOrder = async (userId, cartItems, totalPrice) => {
  const newOrder = await addDoc(ordersRef, {
    userId, 
    items: cartItems, 
    totalPrice, 
    createdAt: serverTimestamp(),
  });
  return newOrder.id; 
};

// Get every order for specific user
export const getUserOrders = async (userId) => {
  const userOrdersQuery = query(
    ordersRef,
    where("userId", "==", userId), 
    orderBy("createdAt", "desc"), 
  );

  const result = await getDocs(userOrdersQuery);
  return result.docs.map((item) => ({ id: item.id, ...item.data() }));
};

// Get a single order by its id
export const getOrder = async (orderId) => {
  const orderRef = doc(db, "orders", orderId);
  const result = await getDoc(orderRef);

  if (result.exists()) {
    return { id: result.id, ...result.data() };
  } else {
    return null; 
  }
};
