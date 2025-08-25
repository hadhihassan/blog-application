"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, App } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  nameRules,
  emailRules,
  passwordRules,
  confirmPasswordRules,
} from "@/validations/authValidations";

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const router = useRouter();
  const { message } = App.useApp();

  const [form] = Form.useForm<RegisterForm>();

  const onFinish = async (values: RegisterForm) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await register(values.name, values.email, values.password);
      message.success("Registration successful!");
      router.push("/dashboard");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card title="Create Account" className="shadow-md">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item label="Name" name="name" rules={nameRules}>
            <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={passwordRules}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={confirmPasswordRules({ getFieldValue: form.getFieldValue })}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              className="w-full"
              size="large"
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
