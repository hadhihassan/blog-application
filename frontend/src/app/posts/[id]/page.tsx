'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button, Skeleton, App, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Post } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/axios';

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { modal, message } = App.useApp();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${params.id}`);
        setPost(response.data.data);
      } catch (error) {
        message.error(
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : "Failed to fetch post"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [message, params.id]);

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/posts/${params.id}`);
      message.success('Post deleted successfully');
      router.push('/posts');
    } catch (error) {
      message.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Failed to delete post"
      );
    } finally {
      setDeleting(false);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">Post not found.</p>
      </div>
    );
  }

  const isAuthor = user && user._id === post.author._id;
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.back()}
        className="mb-4"
      >
        Back
      </Button>

      <article className="bg-white p-6 rounded-lg shadow">
        <header className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
            
            {(isAuthor || isAdmin) && (
              <div className="flex space-x-2">
                {isAuthor && (
                  <Link href={`/posts/${post._id}/edit`}>
                    <Button icon={<EditOutlined />}>Edit</Button>
                  </Link>
                )}
                <Button 
                  icon={<DeleteOutlined />} 
                  danger 
                  onClick={showDeleteModal}
                  loading={deleting}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center text-gray-600">
            <span>By {post.author.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-7">
            {post.content}
          </p>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Post"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true, 
          loading: deleting,
          icon: <DeleteOutlined />
        }}
        confirmLoading={deleting}
      >
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}