const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");  


const serviceAccount = require(path.join(__dirname, '..', 'src', 'config', 'serviceAccountKey.json'));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), 
  databaseURL: "https://home-essential.firebaseio.com", 
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    
    await db.collection("users").doc(userRecord.uid).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

   
    const customToken = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).json({ error: error.message });
  }
});





app.get("/categories/:categoryId/products", async (req, res) => {
  const { categoryId } = req.params;
  console.log(`Fetching products for category: ${categoryId}`);

  try {
    const productsSnapshot = await db
      .collection("categories")
      .doc(categoryId)
      .collection("products")
      .get();

    if (productsSnapshot.empty) {
      return res.status(404).json({ message: `No products found in category: ${categoryId}` });
    }

    const products = productsSnapshot.docs.map((productDoc) => ({
      id: productDoc.id,
      ...productDoc.data(),
    }));

    console.log("Products found:", products);  

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});







app.post("/categories/:categoryId/products", async (req, res) => {
  const { categoryId } = req.params;
  const { name, price, image } = req.body;

  try {
    const productRef = await db
      .collection("categories")
      .doc(categoryId)
      .collection("products")
      .add({
        name,
        price,
        image,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.status(201).json({ id: productRef.id, name, price, image });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});


app.put("/categories/:categoryId/products/:productId", async (req, res) => {
  const { categoryId, productId } = req.params;
  const { name, price, image } = req.body;

  try {
    const productRef = db
      .collection("categories")
      .doc(categoryId)
      .collection("products")
      .doc(productId);

    await productRef.update({
      name,
      price,
      image,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});


app.delete("/categories/:categoryId/products/:productId", async (req, res) => {
  const { categoryId, productId } = req.params;

  try {
    const productRef = db
      .collection("categories")
      .doc(categoryId)
      .collection("products")
      .doc(productId);

    await productRef.delete();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
