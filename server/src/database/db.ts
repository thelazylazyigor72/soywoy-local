// importing mongoose so i can work w/ mongodb
import mongoose from "mongoose";
// env manipulations
import dotenv from "dotenv";
dotenv.config({ path: ".././.env" });
// get connection string
const { MONGODB_URL } = process.env;

// here im trying to connect to db, simple trycatch and some simple code from mongoose docs
export const connectionToMongoDB = async () => {
	try {
		// first parser to use new url parser
		await mongoose.connect(MONGODB_URL as string);
		console.log("-----> Server successfully fdsfert to MongoDB");
	} catch (err: unknown) {
		// simply saying error message to console
		if (err instanceof Error) {
			console.error(err.message);
		}
		process.exit(1);
	}
};
