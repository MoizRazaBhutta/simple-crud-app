const express = require("express");
const productRoutes = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/product.controller");
// Refactored Routes for Product CRUD Operations
// Move business logic to separate controller file

// Read all products
productRoutes.get("/", getProducts);

// Get By ID
// URL will be like /api/product/64a7f0c2e1b2c3d4e5f67890
productRoutes.get("/:id", getProductById);

// Create Product
productRoutes.post("/", createProduct);

// Update By ID
// URL will be like /api/product/64a7f0c2e1b2c3d4e5f67890 PUT
productRoutes.put("/:id", updateProductById);

// Delete By ID
// URL will be like /api/product/64a7f0c2e1b2c3d4e5f67890 DELETE
productRoutes.delete("/:id", deleteProductById);

module.exports = productRoutes;
