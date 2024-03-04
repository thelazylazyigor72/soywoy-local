import { Request, Response, NextFunction } from "express";
import { Product, ProductModel } from "../models/ProductModel.js";
import {
	IBackendResponse,
	IProductRequestParams,
} from "../types/interfaces.js";
import { Error as MongoError } from "mongoose";

//! JFBIEHFIEBGIFBEI - what ? ADMIN VERIFICATION

// * intention to keep 2 separate getAll*Products is cuz to practice promise.all
// getAllProducts controller
// ? in fact - get all active products, not mention it within path
// ? cuz of security reasons, if that make sense o_o
export const getAllActiveProducts = async (
	req: Request<unknown, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		const products = await ProductModel.find({ isActive: true });
		return res.status(200).json({
			success: true,
			message: "",
			data: { products: products.reverse() },
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

// getAllArchivedProducts
export const getAllArchivedProducts = async (
	req: Request<unknown, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		const products = await ProductModel.find({ isActive: false });
		return res.status(200).json({
			success: true,
			message: "",
			data: { products: products.reverse() },
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

// archive single product
export const archiveSingleProduct = async (
	req: Request<IProductRequestParams, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "id field is required",
			});
		}
		// trying to find this product
		// !how we undertand what we get onsuccess and onerror
		const product = await ProductModel.findOneAndUpdate(
			{ id },
			{ $set: { isActive: false } },
			{ new: true },
		);
		// notify if product does not exists
		if (!product) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Oops! There's no such product",
			});
		}
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Successfully got a product data",
			data: { ...product },
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

// unarchive single product
export const unarchiveSingleProduct = async (
	req: Request<IProductRequestParams, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "id field is required",
			});
		}
		// trying to find this product
		// !how we undertand what we get onsuccess and onerror
		const product = await ProductModel.findOneAndUpdate(
			{ id },
			{ $set: { isActive: false } },
			{ new: true },
		);
		// notify if product does not exists
		if (!product) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Oops! There's no such product",
			});
		}
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Successfully got a product data",
			data: { ...product },
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

// archive N products
export const archiveSeveralProducts = async (
	req: Request<IProductRequestParams, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		const { setOfIDs } = req.params;
		// ? maybe create foreach; check each id and fill a map; in result gave back a map - for example 2/5 products wasnt archived or smth
		if (setOfIDs?.length === 0) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "You should pass product list",
			});
		}
		//todo what if one of them will be not valid or theres no such product (even tho it shouldnt be)
		setOfIDs?.map((id) => {
			const product = ProductModel.findOneAndUpdate(
				{ id },
				{ $set: { isActive: false } },
				{ new: true },
			);
			return product;
		});
		// trying to find this product
		// !how we undertand what we get onsuccess and onerror
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

//! admin CRUD ops on Products
// getSingleProduct controller
export const getSingleProduct = async (
	req: Request<IProductRequestParams, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse typed request body
		const { id } = req.params;
		// layer of validation
		if (!id) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "id field is required",
			});
		}
		// trying to find this product
		const product = await ProductModel.findOne({ id });
		// notify if product does not exists
		if (!product) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Oops! There's no such product",
			});
		}
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Successfully got a product data",
			data: { ...product }, //? verify if its proper way to return the data
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
// createProduct controller
export const createProduct = async (
	req: Request<unknown, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse request body
		const {
			name,
			description,
			category,
			type,
			price,
			boughtCount,
			beingViewedCount,
			consistOf,
		} = req.body;
		// layer of validation
		if (
			!name ||
			!description ||
			!category ||
			!type ||
			!price ||
			!boughtCount ||
			!beingViewedCount
		) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Not enough required fields, check it out and try again",
			});
		}
		// checkin if product already exist, i think this fields are enough
		// to uniquely identify a product
		const product = await ProductModel.findOne({ name, category, type });
		// notify if product does exists
		if (product) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Oops! We already got this product",
			});
		}
		// now create a product or get into troubles with that :)
		try {
			const newProduct = new ProductModel({
				name,
				description,
				category,
				type,
				price,
				boughtCount,
				beingViewedCount,
				consistOf,
			});
			const result: Product = await newProduct.save();
			return res.status(201).json({
				success: true,
				message: "Successfully created a new product",
				data: { ...result },
				errorMessage: "",
			});
		} catch (error: unknown) {
			if (error instanceof MongoError) {
				return res.status(500).json({
					success: false,
					message: "",
					data: {},
					errorMessage: `Something went wrong on the database side. Try again later. (${error.message})`,
				});
			}
		}
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
// deleteSingleProduct
export const deleteSingleProduct = async (
	req: Request<IProductRequestParams, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse typed request body
		const { id } = req.params;
		// layer of validation
		if (!id) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "id field is required",
			});
		}
		// trying to find this product
		const product = await ProductModel.findOneAndDelete({ id });
		// notify if product does not exists
		if (!product) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Oops! There's no such product",
			});
		}
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Successfully got a product data",
			data: { ...product }, //? verify if its proper way to return the data
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
// updateSingleProduct
export const updateSingleProduct = async (
	req: Request<IProductRequestParams, IBackendResponse, Product, unknown>,
	res: Response<IBackendResponse>,
	next: NextFunction,
) => {
	try {
		// parse typed request body
		const { id } = req.params;
		// ! maybe i should use it anywhere else or theres no need in that cuz maybe on frontend that will be solved
		const { ...requestProduct }: Partial<Product> = req.body;
		// layer of validation
		if (!id) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "id field is required",
			});
		}
		// trying to find this product
		// ! how to update - maybe use replace ?
		const product = await ProductModel.findOneAndUpdate(
			{ id },
			{ $set: { ...requestProduct } },
			{ new: true },
		);
		// notify if product does not exists
		if (!product) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Oops! There's no such product",
			});
		}
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Successfully got a product data",
			data: { ...product }, //? verify if its proper way to return the data
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
