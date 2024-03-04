// ! Imports
// import our express module and other needed stuff-builtin interfaces
import express, { Express, Request, Response } from "express";
// import swagger related stuff
import swagger, { SwaggerOptions, SwaggerUiOptions } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// cors
import cors from "cors";
// import dotenv
import dotenv from "dotenv";
// connection instance
import { connectionToMongoDB } from "./database/db.js";
// cookie parser
import cookieParser from "cookie-parser";
// init path to .env
dotenv.config({ path: ".././.env" });
// routers
import { router as authRouter } from "./routes/AuthRoute.js";
import { router as productsRouter } from "./routes/ProductsRoute.js";
// ! End of Imports -------------------------------------------

// ! App ------------------------------------------------------

// port, either 8082 or something dat we can define ourself
const port = process.env.PORT || 8082;

// create instance
const app: Express = express();

// ? Middlewares - functions that executes between http actions

// CORS middleware, i dont think its required in my app, but just in case, and just to try it out
// * not allowing requests from other domains, no specified server response header written
app.use(
	cors({
		origin: [`http://localhost:${port}`, "http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

// to use *body* property within req object
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// initialize swagger
// swagger definition
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "soywoy-backend-swagger-docs",
		version: "1.0.0",
		description:
			"generated docs for backend api created with swagger-ui-express and swagger-jsodc",
	},
	servers: [
		{
			url: `http://localhost:${port}`,
			description: "Development server",
		},
	],
};

// swagger options
const swaggerOptions: SwaggerOptions = {
	swaggerDefinition,
	apis: ["../**/routes/*.ts"],
};

// options for swagger ui
const options: SwaggerUiOptions = {
	swaggerOptions: {
		filter: true,
		withCredentials: true,
		persistAuthorization: true,
	},
	customCss: ".swagger-ui .topbar { display: none }",
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerSpec, options));

// ? End Of Middlewares
// ! Routes initialization
// note, im useing it w/ /api, in case of usage of static files

// defining auth router
app.use("/api", authRouter);
// defining products router
app.use("/api/products", productsRouter);
// ! End of Routes initialization

// server-up checker
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

// create connection to mongodb
connectionToMongoDB();

// initialize server
app.listen(port, () => {
	console.log(`-----> Server is working, port: ${port}, base address: http://localhost:${port}/
	\n-----> Swagger generated documentation: http://localhost:${port}/api-docs/
	`);
});

// ! End of App -----------------------------------------------
