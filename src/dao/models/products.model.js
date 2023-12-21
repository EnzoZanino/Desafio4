// import { Schema, model } from "mongoose";
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	title:       { type: String, required: true },
	description: { type: String, required: true },
	price:       { type: Number, required: true },
	thumbnail:   { type: String, required: true },
	code:        { type: String, required: true, unique: true },
	stock:       { type: Number, required: true },
});

const ProductModel = mongoose.model("products", productSchema);

// export { productModel };
export default ProductModel
