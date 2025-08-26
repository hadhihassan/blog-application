"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { emailRules, passwordRules } from "@/validations/authValidations";
import { RegisterForm } from "../register/page";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const { message } = App.useApp();

  const [form] = Form.useForm<RegisterForm>();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success("Login successful!");
      router.push("/dashboard");
    } catch (error :unknown) {
      message.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card title="Login" className="shadow-md">
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={passwordRules}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>

          <div className="text-center">
            Dont have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
