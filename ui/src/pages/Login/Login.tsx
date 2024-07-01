import { Button, Form, FormProps, Input, Layout, Typography } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import style from "./login.module.scss";

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};

// todo разобраться зачем методы онФиниш
// ? remember me - будем ли реализовывать
// todo собрать фичи с документации, без лишнего

const Login = () => {
	const { Content } = Layout;

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
		errorInfo,
	) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Layout>
			<Content className={`${style.content}`}>
				<div className={`${style.main}`}>
					<Form
						className={`${style.form}`}
						layout="vertical"
						variant="outlined"
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Typography.Title className={`${style.header}`}>
							Login
						</Typography.Title>
						<Form.Item<FieldType>
							name="username"
							tooltip="This is required field"
							className={`${style.item}`}
							rules={[
								{ required: true, message: "Please input your username!" },
							]}
						>
							<Input
								placeholder="Username"
								prefix={<UserOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>

						<Form.Item<FieldType>
							name="password"
							tooltip="This is required field"
							className={`${style.item}`}
							rules={[
								{ required: true, message: "Please input your password!" },
							]}
						>
							<Input.Password
								placeholder="Password"
								prefix={<LockOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>

						<Form.Item className={`${style.submit}`}>
							<Button
								type="primary"
								size="large"
								shape="round"
								htmlType="submit"
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Content>
		</Layout>
	);
};

export default Login;
