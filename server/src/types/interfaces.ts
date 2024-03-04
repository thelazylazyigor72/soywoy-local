import { Types } from "mongoose";

export interface IBackendResponse {
	success: boolean;
	message: string;
	data: object;
	errorMessage: string;
}
export interface IJWTPayload {
	id: Types.ObjectId;
	isAdmin: boolean;
}

//? Maybe we should expand it, at least if needed
export interface IProductRequestParams {
	id?: Types.ObjectId;
	setOfIDs?: Types.ObjectId[];
}
