// import mongoose
import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";

// define user schema
// instead of creating interface and pass it into Schema - i use builtin type generation
// since its one of the ways to do it (according to docs, obviously), why not
//? createdAt
// TODO who asked and who answered
// TODO createdAt, to sort out by date when displaying to user
const messageSchema = new Schema({
	isActive: {
		type: Boolean,
		required: [true, "Status is required"],
	},
	title: {
		type: String,
		required: [true, "Title is required"],
	},
	message: {
		type: String,
		required: [true, "Message is required"],
	},
	answer: {
		type: String,
		required: [true, "Answer is required"],
	},
});

// according to mongoose docs thats how we get a type from schema
export type Message = InferSchemaType<typeof messageSchema> &
	Document<Types.ObjectId, any, Message>;

// create a model
export const MessageModel = mongoose.model("Message", messageSchema);
