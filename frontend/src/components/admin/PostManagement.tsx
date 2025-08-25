"use client";

import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, App, Input } from "antd";
import { DeleteOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Post, User } from "@/types";
import api from "@/lib/axios";

const { Column } = Table;

export default function PostManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const { message } = App.useApp();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts?limit=100");
      setPosts(response.data.data);
    } catch (error) {
      message.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await api.delete(`/posts/${postId}`);
          message.success("Post deleted successfully");
          fetchPosts();
        } catch (error) {
          message.error("Failed to delete post");
        }
      },
    });
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search posts..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.trim())}
          style={{ width: 300 }}
        />
      </div>

      <Table
        dataSource={filteredPosts}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      >
        <Column title="Title" dataIndex="title" key="title" />
        <Column
          title="Author"
          dataIndex="author"
          key="author"
          render={(author: User) => author.name}
        />
        <Column
          title="Created"
          dataIndex="createdAt"
          key="createdAt"
          render={(date: string) => new Date(date).toLocaleDateString()}
        />
        <Column
          title="Actions"
          key="actions"
          render={(_, record: Post) => (
            <Space size="middle">
              <Link href={`/posts/${record._id}`}>
                <Button size="small" icon={<EyeOutlined />}>
                  View
                </Button>
              </Link>
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDeletePost(record._id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
