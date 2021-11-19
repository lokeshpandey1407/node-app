import mongoose from "mongoose";

var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
