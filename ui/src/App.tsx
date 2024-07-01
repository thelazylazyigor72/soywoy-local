import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import Root from "pages/Root/Root";
import ErrorPage from "pages/ErrorPage";
import Home from "pages/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
// import { SeedToken } from "antd/es/theme/internal";

// const lightToken: Partial<SeedToken> = {
// 	colorPrimary: "#ff7d29",
// 	colorInfo: "#ff7d29",
// 	colorWarning: "#1677ff",
// 	colorBgBase: "#f6f7fa",
// 	fontSize: 18,
// 	borderRadius: 8,
// 	wireframe: false,
// 	colorTextBase: "#31363f",
// };

// const darkToken: Partial<SeedToken> = {
// 	colorPrimary: "#ff7d29",
// 	colorInfo: "#ff7d29",
// 	colorWarning: "#1677ff",
// 	colorBgBase: "#31363f",
// 	fontSize: 18,
// 	borderRadius: 8,
// 	wireframe: false,
// 	colorTextBase: "#f6f7fa",
// };

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			errorElement: <ErrorPage />,
			children: [
				{
					errorElement: <ErrorPage />,
					children: [
						{
							index: true,
							element: <Home />,
						},
						{
							path: "/login",
							element: <Login />,
						},
						{
							path: "/signup",
							element: <SignUp />,
						},
						{
							path: "/catalog",
							element: <h1>g</h1>,
						},
					],
				},
			],
		},
	]);

	return (
		<AnimatePresence mode="wait">
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#ff7d29",
						colorInfo: "#ff7d29",
						colorWarning: "#1677ff",
						colorBgBase: "#f6f7fa",
						fontSize: 18,
						borderRadius: 8,
						wireframe: false,
						colorTextBase: "#31363f",
					},
					components: {
						Layout: {
							siderBg: "#f6f7fa",
							bodyBg: "#f6f7fa",
							triggerBg: "#ff7d29",
						},
						Menu: {
							activeBarBorderWidth: 0,
						},
					},
				}}
			>
				<StyleProvider>
					<RouterProvider
						future={{ v7_startTransition: true }}
						router={router}
					/>
				</StyleProvider>
			</ConfigProvider>
		</AnimatePresence>
	);
}

export default App;
