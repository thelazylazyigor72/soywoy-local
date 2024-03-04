import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, UserModel } from "../models/UserModel.js";
import { IBackendResponse, IJWTPayload } from "../types/interfaces.js";

//? 1 think it should appear after authVerifier
//todo define proper logic, keep in mind frontend mechanisms
export const adminVerification = async (
	req: Request<unknown, IBackendResponse, User, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		const token: string = req.cookies.token;
		const tokenPayload = jwt.decode(token);
		const { isAdmin } = tokenPayload as IJWTPayload;
		if (!isAdmin) {
			res.status(200).json({
				success: true,
				message: "",
				data: {},
				errorMessage: "",
			});
		}
		next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(500).json({
				success: false,
				message: "",
				data: {},
				errorMessage: `Something went wrong on the server side. Try again later. (${error.message})`,
			});
		}
	}
};
