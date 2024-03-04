// import mongoose
import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";

// define user schema
// instead of creating interface and pass it into Schema - i use builtin type generation
// since its one of the ways to do it (according to docs, obviously), why not
// TODO who's card
const cardSchema = new Schema({
	cardNumber: {
		type: Number,
		required: [true, "Card number is required"],
	},
	nameOnCard: {
		type: String,
		required: [true, "Name is required"],
	},
	datePair: {
		type: [Number, Number],
		required: [true, "Date pair is required"],
	},
	cvv: {
		type: Number,
		required: [true, "CVV is required"],
	},
});

// according to mongoose docs thats how we get a type from schema
export type Card = InferSchemaType<typeof cardSchema> &
	Document<Types.ObjectId, any, Card>;

// create a model
export const CardModel = mongoose.model("Card", cardSchema);
