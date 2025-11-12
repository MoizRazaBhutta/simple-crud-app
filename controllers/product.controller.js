const Product = require("../models/product.model");

// Controller function to get all products
const getProducts = async (req, res) => {
  try {
    // It is similar to MongoDb db.products.find({})
    const products = await Product.find({});
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
};

// Controller function to get a product by ID
const getProductById = async (req, res) => {
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
};

// Create Product
const createProduct = async (req, res) => {
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
};

const updateProductById = async (req, res) => {
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
};

// Delete by ID
const deleteProductById = async (req, res) => {
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
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
