require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const Product = require("./models/product.model");

// This middleware is necessary to parse JSON bodies in requests
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

app.post("/api/products", async (req, res) => {
  // // We can not extract req.body directly without middleware
  // console.log(req.body);
  // res
  //   .status(201)
  //   .json({ body: req.body, message: "Product created successfully" });

  // Now we need to create a product using the Product model
  try {
    // It is similar to MongoDb db.products.insertOne({})
    const product = await Product.create(req.body);
    res.status(201).json({
      product,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: err.message });
  }
});

// Read all products
app.get("/api/products", async (req, res) => {
  try {
    // It is similar to MongoDb db.products.find({})
    const products = await Product.find({}); // Fetch all products from the database
    console.log("Fetched products:", products);
    console.log("Number of products fetched:", products.length);
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get By ID
// URL will be like /api/product/64a7f0c2e1b2c3d4e5f67890
app.get("/api/product/:id", async (req, res) => {
  try {
    // It is similar to MongoDb db.products.findOne({_id: ObjectId(id)})
    // Extract the id from URL Parameters
    const paramObj = req.params;
    const productId = paramObj.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update By ID
// URL will be like /api/product/64a7f0c2e1b2c3d4e5f67890 PUT
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id: productId } = req.params;
    // It is similar to MongoDb db.products.updateOne({_id: ObjectId(id)}, {$set: {...}})
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(productId);
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// Delete By ID
// URL will be like /api/product/64a7f0c2e1b2c3d4e5f67890 DELETE
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id: productId } = req.params;
    // It is similar to MongoDb db.products.deleteOne({_id: ObjectId(id)})
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting product by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// MongoDB connection setup and then calling app.listen
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
