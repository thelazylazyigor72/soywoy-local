// import mongoose
import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";
// part of auth process, crypto library
import bcrypt from "bcryptjs";

// define user schema
// instead of creating interface and pass it into Schema - i use builtin type generation
// since its one of the ways to do it (according to docs, obviously), why not
const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	answer: {
		type: String,
		required: [true, "You should answer the question"],
	},
	isAdmin: {
		type: Boolean,
		required: [true, "User role field is required"],
	},
	// orders: {
	// 	type: Boolean,
	// 	required: [false],
	// },
	// requests: {
	// 	type: Boolean,
	// 	required: [false],
	// },
});

// according to mongoose docs thats how we get a type from schema
export type User = InferSchemaType<typeof userSchema> &
	Document<Types.ObjectId, any, User>;

// obvious pre-middleware-ish stuff to hash passed password when we save this models document
userSchema.pre("save", async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

// create a model
export const UserModel = mongoose.model("User", userSchema);
