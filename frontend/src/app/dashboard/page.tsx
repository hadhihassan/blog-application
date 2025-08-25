"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, List, Skeleton, App, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import api from "@/lib/axios";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await api.get("/posts/user/posts");
        setPosts(response.data.data);
      } catch (error) {
        message.error("Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      message.success("Post deleted successfully");
    } catch (error) {
      message.error("Failed to delete post");
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/posts/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Create New Post
            </Button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Posts</h2>

        {loading ? (
          <List
            itemLayout="vertical"
            dataSource={[1, 2, 3]}
            renderItem={() => (
              <List.Item>
                <Skeleton active />
              </List.Item>
            )}
          />
        ) : posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <Empty description="You haven't created any posts yet.">
            <Link href="/posts/new">
              <Button type="primary">Create Your First Post</Button>
            </Link>
          </Empty>
        )}
      </div>
    </ProtectedRoute>
  );
}
