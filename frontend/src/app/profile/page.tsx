"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Tabs, App } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import {
  emailRules,
  nameRules,
  passwordRules,
} from "@/validations/authValidations";

interface ProfileForm {
  name: string;
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { user } = useAuth();
  const { message } = App.useApp();

  const onProfileFinish = async (values: ProfileForm) => {
    setLoading(true);
    try {
      await api.put("/users/updatedetails", values);
      message.success("Profile updated successfully!");
      // Refresh the page to get updated user data
      window.location.reload();
    } catch (error) {
      message.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const onPasswordFinish = async (values: PasswordForm) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New passwords do not match!");
      return;
    }

    setPasswordLoading(true);
    try {
      await api.put("/users/updatepassword", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success("Password updated successfully!");
    } catch (error) {
      message.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Failed to update password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const tabItems = [
    {
      key: "profile",
      label: "Profile Information",
      children: (
        <Form
          name="profile"
          onFinish={onProfileFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            name: user?.name,
            email: user?.email,
          }}
        >
          <Form.Item label="Name" name="name" rules={nameRules}>
            <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "password",
      label: "Change Password",
      children: (
        <Form
          name="password"
          onFinish={onPasswordFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Current Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="New Password"
            name="newPassword"
            rules={passwordRules}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={passwordLoading}
              size="large"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>

        <Card className="shadow-md">
          <Tabs defaultActiveKey="profile" items={tabItems} />
        </Card>
      </div>
    </ProtectedRoute>
  );
}
