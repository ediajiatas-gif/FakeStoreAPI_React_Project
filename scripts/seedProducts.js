// scripts/seedProducts.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const seedProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  console.log(`Found ${products.length} products. Adding to Firestore...`);

  for (const product of products) {
    await db.collection("products").add({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    console.log(`Added: ${product.title}`);
  }

  console.log("Done seeding products!");
};

seedProducts();