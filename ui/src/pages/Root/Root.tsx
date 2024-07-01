import React, { useEffect, useState } from "react";
import { Divider, Layout, Menu, Tooltip, Typography } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";
import navigationLinks from "data/Menu";
import style from "./root.module.scss";

// ? maybe adding here either themeswitcher or scrolltotop buttons
// ? TODO Logo or smth w/ or instead of heading
// TODO health check for everything sooo far

function Root() {
	const location = useLocation();
	const { Sider, Content } = Layout;
	const [collapse, setCollapse] = useState<boolean>(true);

	useEffect(() => {
		setCollapse(!collapse);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout hasSider className={`${style.layout}`}>
			<Sider
				className={`${style.sider}`}
				collapsible
				collapsed={collapse}
				onCollapse={() => setCollapse(!collapse)}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<Typography.Title className={`${style.header}`} level={3}>
					SW{collapse ? "" : "store"}
				</Typography.Title>
				<Divider />
				<Menu
					mode="inline"
					className={`${style.menu}`}
					activeKey={location.pathname}
					selectedKeys={[location.pathname]}
				>
					{navigationLinks.map((link) => (
						<Menu.Item icon={link.icon} key={link.path}>
							<NavLink to={link.path} end>
								{link.label}
							</NavLink>
						</Menu.Item>
					))}
				</Menu>
				<Divider />
				<Typography.Link
					target="_blank"
					href="https://github.com/thelazylazyigor72"
				>
					<Tooltip placement="right" title={collapse ? "@thelazylazyigor" : ""}>
						<GithubOutlined />
					</Tooltip>{" "}
					{collapse ? "" : "@thelazylazyigor"}
				</Typography.Link>
			</Sider>
			<Content
				style={{
					marginLeft: collapse ? "" : "200px",
				}}
				className={`${style.content}`}
			>
				<Outlet />
			</Content>
		</Layout>
	);
}

export default Root;
