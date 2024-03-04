import { Request, Response, NextFunction } from "express";
import { User, UserModel } from "../models/UserModel.js";
import { IBackendResponse } from "../types/interfaces.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".././.env" });

const { TOKEN_KEY } = process.env;

// basically its a middleware that allows me to create protected routes,
// meaning that if user isnt auth - he'll not be able to access endpoint
export const userVerification = async (
	req: Request<unknown, IBackendResponse, User, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	const token: string = req.cookies.token;
	// 401 if no token provided
	if (!token) {
		return res.status(401).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "No token passed",
		});
	}
	// verify token
	jwt.verify(token, TOKEN_KEY as string, async (err: unknown, data: any) => {
		if (err) {
			if (err instanceof Error) {
				return res.status(401).json({
					success: false,
					message: "",
					data: {},
					errorMessage: `Failed to authentificate, ${err.message}, try to login or signup again.`,
				});
			}
		} else {
			const user = await UserModel.findById(data.id);
			if (!user) {
				return res.status(401).json({
					success: false,
					message: "",
					data: {},
					errorMessage: `Failed to authentificate, seems like there's no such user.`,
				});
			}
			// pass the data that authentificated user will need on frontend
			// ? why do i pass this data here - cuz this controller made exactly to create protected routes on client,
			// ? thats why i pass data in next(), so when i create protected verify-endpoint - i'll be able to put this data in response
			//! conflict ??
			req.body.username = user.username;
			req.body.id = user.id;
			req.body.email = user.email;
			req.body.isAdmin = user.isAdmin;
			// call next middleware in stack
			next();
		}
	});
};
