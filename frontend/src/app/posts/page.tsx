'use client';

import { useState, useEffect } from 'react';
import { Input, Button, List, Skeleton, Pagination, App } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import api from '@/lib/axios';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { message } = App.useApp();

  const pageSize = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params: any = {
          page: currentPage,
          limit: pageSize,
        };

        if (searchTerm) {
          params.title = searchTerm.trim();
        }

        const response = await api.get('/posts', { params });
        setPosts(response.data.data);
        setTotal(response.data.count);
      } catch (error) {
        message.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Posts</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          name="search"
          placeholder="Search posts..."
          className="flex-1"
          size="large"
        />
        <Button 
          type="primary" 
          icon={<SearchOutlined />} 
          htmlType="submit"
          size="large"
        >
          Search
        </Button>
      </form>

      {loading ? (
        <List
          itemLayout="vertical"
          dataSource={[...Array(6)].map((_, i) => i)}
          renderItem={() => (
            <List.Item>
              <Skeleton active />
            </List.Item>
          )}
        />
      ) : posts.length > 0 ? (
        <>
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found.</p>
        </div>
      )}
    </div>
  );
}