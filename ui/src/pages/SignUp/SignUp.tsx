import { Button, Form, FormProps, Input, Layout, Typography } from "antd";
import React from "react";
import {
	LockOutlined,
	QuestionOutlined,
	UserOutlined,
} from "@ant-design/icons";
import style from "./signup.module.scss";

type FieldType = {
	username?: string;
	password?: string;
	securityQuestion?: string;
};

// todo разобраться зачем методы онФиниш
// ? remember me - будем ли реализовывать
// todo собрать фичи с документации, без лишнего

const SignUp = () => {
	console.log(import.meta.env.VITE_AUTH_QUESTION);
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
							SignUp
						</Typography.Title>
						<Form.Item<FieldType>
							name="username"
							label="Enter username"
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
							label="Enter a password"
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

						<Form.Item<FieldType>
							name="securityQuestion"
							label={import.meta.env.VITE_AUTH_QUESTION}
							tooltip="This is required field"
							className={`${style.item}`}
							rules={[
								{ required: true, message: "Please answer security question!" },
							]}
						>
							<Input
								placeholder="Type an answer"
								prefix={<QuestionOutlined className="site-form-item-icon" />}
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

export default SignUp;
