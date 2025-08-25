'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { App, Button, List, Skeleton } from 'antd';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import api from '@/lib/axios';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { message } = App.useApp();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts?limit=3');
        setPosts(response.data.data);
      } catch (error) {
        message.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      message.success('Post deleted successfully');
    } catch (error) {
      message.error('Failed to delete post');
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing stories and share your thoughts with the world.
        </p>
        
        {user ? (
          <Link href="/posts/new">
            <Button type="primary" size="large">Create New Post</Button>
          </Link>
        ) : (
          <div className="space-x-4">
            <Link href="/register">
              <Button type="primary" size="large">Get Started</Button>
            </Link>
            <Link href="/posts">
              <Button size="large">Browse Posts</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
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
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <Link href="/posts">
          <Button>View All Posts</Button>
        </Link>
      </div>
    </div>
  );
}