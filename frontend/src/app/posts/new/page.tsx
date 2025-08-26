"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, App } from "antd";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import api from "@/lib/axios";

const { TextArea } = Input;

interface PostForm {
  title: string;
  content: string;
}

export default function NewPost() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();

  const onFinish = async (values: PostForm) => {
    setLoading(true);
    try {
      await api.post("/posts", values);
      message.success("Post created successfully!");
      router.push("/dashboard");
    } catch (error) {
       message.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className="mb-4"
        >
          Back
        </Button>

        <Card title="Create New Post" className="shadow-md">
          <Form
            name="post"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Title is required!" },
                { min: 2, message: "Title must be at least 2 characters" },
                {
                  max: 200,
                  message: "Title must be less than 200 characters!",
                },
              ]}
            >
              <Input placeholder="Post title" size="large" />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[
                { required: true, message: "Content is required!" },
                { min: 2, message: "Content must be at least 5 characters" },
                {
                  max: 200,
                  message: "Content must be less than 5000 characters!",
                },
              ]}
            >
              <TextArea
                placeholder="Write your post content here..."
                rows={10}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                Create Post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
