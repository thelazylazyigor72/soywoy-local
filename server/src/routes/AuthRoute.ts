import express, { Router, Request, Response } from "express";
import {
	DeleteAccount,
	Login,
	ResetPassword,
	Signup,
} from "../controllers/authentification.js";
import { userVerification } from "../middlewares/authVerifier.js";
import { IBackendResponse } from "../types/interfaces.js";
import { User } from "../models/UserModel.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               format: ObjectID
 *               description: user's nickname.
 *             username:
 *               type: string
 *               description: user's nickname.
 *               example: Igor
 *             password:
 *               type: string
 *               format: password
 *               description: user's password, if its coming from db - its hashed, but its probably no case for that.
 *               example: qwerty123
 *             email:
 *               type: string
 *               description: user's email.
 *               example: example@gmail.com
 *             answer:
 *               type: string
 *               description: user's answer to verify question.
 *               example: John
 */

// init a router
export const router: Router = express.Router();

// signup endpoint
router.post("/signup", Signup);
// login endpoint
router.post("/login", Login);
// reset password endpoint
/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Pass new password to update user data
 *     description: Here you should pass set of a { password, email, answer } within request body to update user data with a new password, while finding user record in database uniquely based on email and answer fields.
 *     responses:
 *       200:
 *         description: positive response look like this.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.put("/reset", ResetPassword);
// verifier enpoint (to create protected routes on client side)
/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 */
router.get(
	"/verify",
	userVerification,
	async (
		req: Request<unknown, IBackendResponse, User, unknown>,
		res: Response<IBackendResponse>,
	) => {
		return res.status(200).json({
			success: true,
			message: "Successfully verified",
			data: {
				username: req.body.username,
				email: req.body.email,
				id: req.body.id,
				isAdmin: req.body.isAdmin,
			},
			errorMessage: "",
		});
	},
);

router.delete("/deleteAccount", DeleteAccount);
