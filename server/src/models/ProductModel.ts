// import mongoose
import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";

// define user schema
// instead of creating interface and pass it into Schema - i use builtin type generation
// since its one of the ways to do it (according to docs, obviously), why not
export const productSchema = new Schema({
	isActive: {
		type: Boolean,
		required: [true, "Activity status is required"],
	},
	name: {
		type: String,
		required: [true, "Username is required"],
	},
	description: {
		type: String,
		required: [true, "Password is required"],
	},
	category: {
		type: String,
		required: [true, "Category is required"],
	},
	// TODO ?????? like a sale1 sale2 type shit; maybe enum typeshit to perform
	type: {
		type: String,
		required: [true, "Type is required"],
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
	},
	boughtCount: {
		type: Number,
		required: [true, "Count of being bought is required"],
	},
	beingViewedCount: {
		type: Number,
		required: [true, "Count of being viewed is required"],
	},
	consistOf: {
		type: [Types.ObjectId],
		ref: "Product",
		required: false,
	},
});

// according to mongoose docs thats how we get a type from schema
export type Product = InferSchemaType<typeof productSchema> &
	Document<Types.ObjectId, any, Product>;

// create a model
export const ProductModel = mongoose.model("Product", productSchema);
