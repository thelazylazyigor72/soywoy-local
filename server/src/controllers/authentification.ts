import { Request, Response, NextFunction, CookieOptions } from "express";
// get an UserModel w/ allias
import { UserModel, User } from "../models/UserModel.js";
// get function to create token
import { createSecretToken } from "../utilities/generateToken.js";
// inst of bcrypt
import bcrypt from "bcryptjs";
// types
import { IBackendResponse, IJWTPayload } from "../types/interfaces.js";
// jwt
import jwt from "jsonwebtoken";
// get env var
import dotenv from "dotenv";
dotenv.config({ path: ".././.env" });

const { TOKEN_KEY } = process.env;

// signup controller
export const Signup = async (
	req: Request<unknown, IBackendResponse, User, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse request body
		const { username, password, email, answer, isAdmin } = req.body;
		// layer of validation
		if (!username || !password || !email || !answer || !isAdmin) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "All fields are required",
			});
		}
		// trying to find this user, by email and username
		const existingUser = await UserModel.findOne({ email, username });
		// notify that user already exists
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "User with such email already exists",
			});
		}
		// otherwise - create new user
		const user = await UserModel.create({
			password,
			username,
			email,
			answer,
			isAdmin,
		});
		// create token for user
		const token = createSecretToken(user._id, user.isAdmin);
		// sending back cookies w/ token
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		} as CookieOptions);
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Signed Up Successfully",
			data: { username: user.username, id: user.id, email: email },
			errorMessage: "",
		});
		// call next middleware in the stack
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

// login controller
export const Login = async (
	req: Request<unknown, IBackendResponse, User, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse request body
		const { password, email } = req.body;
		// layer of validation
		if (!password || !email) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "All fields are required",
			});
		}
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Invalid password or email",
			});
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Invalid password or email",
			});
		}
		// create token and send back positive response
		const token = createSecretToken(user._id, user.isAdmin);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		} as CookieOptions);
		res.status(201).json({
			success: true,
			message: "Successfully authorized",
			data: { username: user.username, id: user.id, email: user.email },
			errorMessage: "",
		});
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

// reset password controller
export const ResetPassword = async (
	req: Request<unknown, IBackendResponse, User, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse request body
		const { password, email, answer } = req.body;
		// layer of validation
		if (!password || !email || !answer) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "All fields are required",
			});
		}
		// trying to find this user, by email
		// ? i can make search also by hashed password, but is it required tho ?
		const existingUser = await UserModel.findOne({ email, answer });
		// notify that if user doesnt exists
		if (!existingUser) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "User with such email doesn't exists",
			});
		}
		// otherwise - update user
		// !how we undertand what we get onsuccess and onerror
		const user = await UserModel.findOneAndUpdate(
			{ email },
			{ $set: { password: password } },
			{ new: true },
		);
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Successfully changed password",
			data: {},
			errorMessage: "",
		});
		// call next middleware in the stack
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

// delete account controller
// ? i consiously make delete account function only for users, not for admins
// ? cuz admins, once again, created by me, deleted by me too as continuation
export const DeleteAccount = async (
	req: Request<unknown, IBackendResponse, User, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// basically decode token and based on payload data - delete user
		//? why verify instead of .decode()
		try {
			const decodedTokenPayload: any = jwt.verify(
				req.cookies.token,
				TOKEN_KEY as string,
			);
			const { id, isAdmin } = decodedTokenPayload as IJWTPayload;
			if (id || isAdmin) {
				return res.status(409).json({
					success: false,
					message: "",
					data: {},
					errorMessage:
						"Something went wrong while authorization. Try again later. Invalid payload.",
				});
			}
			const deleteResult = UserModel.findByIdAndDelete(id, { isAdmin });
			res.status(200).json({
				success: true,
				message:
					"You successfully had deleted your account. We gonna miss you! ",
				data: { ...deleteResult },
				errorMessage: "",
			});
			next();
		} catch (error: unknown) {
			if (error instanceof Error) {
				return res.status(409).json({
					success: false,
					message: "",
					data: {},
					errorMessage:
						"Something went wrong while authorization. Try again later. Can't resolve payload.",
				});
			}
		}
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
