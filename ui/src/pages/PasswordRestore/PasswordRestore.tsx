import { Button, Form, FormProps, Input, Layout, Typography } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import style from "./passwordrestore.module.scss";

type FieldType = {
	username?: string;
	securityAnswer?: string;
};

// todo разобраться зачем методы онФиниш
// ? remember me - будем ли реализовывать
// todo собрать фичи с документации, без лишнего

const PasswordRestore = () => {
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
							Password Change
						</Typography.Title>
						<Form.Item<FieldType>
							name="username"
							label="Declare username"
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
							name="securityAnswer"
							label={import.meta.env.VITE_AUTH_QUESTION}
							tooltip="This is required field"
							className={`${style.item}`}
							rules={[
								{ required: true, message: "Please answer security question!" },
							]}
						>
							<Input
								placeholder="Answer here"
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

export default PasswordRestore;
