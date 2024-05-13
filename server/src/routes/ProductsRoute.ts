import { userVerification } from "../middlewares/authVerifier.js";

import {
	createProduct,
	getAllActiveProducts,
} from "../controllers/products.js";
import express, { Router } from "express";

// init a router
export const router: Router = express.Router();

// getSingleProduct endpoint
//router.get("/getSingleProduct", getSingleProduct);
// getAllProducts
//router.get("/getAllProducts", getAllProducts);
// createProduct
router.post("/createProduct", createProduct);
