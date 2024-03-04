import { productSchema } from "./ProductModel.js";
// import mongoose
import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";

// define user schema
// instead of creating interface and pass it into Schema - i use builtin type generation
// since its one of the ways to do it (according to docs, obviously), why not
// ?createdAt
// TODO who's order; createdAt to sort by date
const orderSchema = new Schema({
	isActive: {
		type: Boolean,
		required: [true, "Status is required"],
	},
	readyToPickTime: {
		type: Date,
		required: [true, "Date when to pick is required"],
	},
	products: {
		type: [Types.ObjectId],
		ref: "Product",
		required: [true, "Products list is required"],
	},
});

// according to mongoose docs thats how we get a type from schema
export type Order = InferSchemaType<typeof orderSchema> &
	Document<Types.ObjectId, any, Order>;

// create a model
export const OrderModel = mongoose.model("Order", orderSchema);
