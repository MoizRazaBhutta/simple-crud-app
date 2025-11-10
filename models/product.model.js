const mongoose = require("mongoose");

// Creating Product Schema using Mongoose
const productSchema = mongoose.Schema(
  {
    // Defining the 'name' field with type String and required validation
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    // Quantity field with type Number, required validation, and default value
    quantity: {
      type: Number,
      required: [true, "Please enter product quantity"],
      default: 0,
    },
    // Price field with type Number, required validation, and default value
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      default: 0,
    },
    // Image field with type String and required validation
    image: {
      type: String,
      required: false,
    },
  },
  // This will automatically add createdAt and updatedAt fields to the schema
  {
    timestamps: true,
  }
);

// If we are targeting the products collection in MongoDB, we can specify it here
// model expects singular name, mongoose will create plural collection name and a schema as second argument
const Product = mongoose.model("Product", productSchema);

// Exporting the Product model to be used in other parts of the application
module.exports = Product;
