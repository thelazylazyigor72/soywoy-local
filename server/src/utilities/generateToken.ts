import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".././.env" });
import { Types } from "mongoose";
import { IJWTPayload } from "../types/interfaces.js";

const { TOKEN_KEY } = process.env;

export const createSecretToken = (
	id: Types.ObjectId,
	isAdmin: boolean,
): string => {
	return jwt.sign({ id, isAdmin } as IJWTPayload, TOKEN_KEY as string, {
		expiresIn: 3 * 24 * 60 * 60, // трое суток
	});
};
