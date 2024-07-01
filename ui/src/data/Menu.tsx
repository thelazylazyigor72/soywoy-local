import React from "react";
import {
	AppstoreOutlined,
	HomeOutlined,
	LoginOutlined,
	LogoutOutlined,
	MehOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from "@ant-design/icons";

type NavigationLink = {
	id: number;
	label: string;
	path: string;
	icon: React.ReactNode;
};

const navigationLinks: NavigationLink[] = [
	{
		id: 1,
		label: "Home",
		path: "/",
		icon: <HomeOutlined />,
	},
	{
		id: 2,
		label: "Profile",
		path: "/profile",
		icon: <UserOutlined />,
	},
	{
		id: 3,
		label: "Catalog",
		path: "/catalog",
		icon: <AppstoreOutlined />,
	},
	{
		id: 4,
		label: "Goods",
		path: "/goods",
		icon: <MehOutlined />,
	},
	{
		id: 5,
		label: "Cart",
		path: "/cart",
		icon: <ShoppingCartOutlined />,
	},
	{
		id: 6,
		label: "Logout",
		path: "/logout",
		icon: <LogoutOutlined />,
	},
	{
		id: 7,
		label: "Login",
		path: "/login",
		icon: <LoginOutlined />,
	},
	{
		id: 8,
		label: "SignUp",
		path: "/signup",
		icon: <LoginOutlined />,
	},
];

export default navigationLinks;
