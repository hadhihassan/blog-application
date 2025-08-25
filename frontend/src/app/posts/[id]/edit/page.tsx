'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, App, Skeleton } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/axios';

const { TextArea } = Input;

interface PostForm {
  title: string;
  content: string;
}

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${params.id}`);
        const postData = response.data.data;
        setPost(postData);
        
        const isAuthor = user && user._id === postData.author._id;
        const isAdmin = user && user.role === 'admin';
        
        if (!isAuthor && !isAdmin) {
          message.error('You are not authorized to edit this post');
          router.push('/posts');
          return;
        }
        
        // Set form values
        form.setFieldsValue({
          title: postData.title,
          content: postData.content,
        });
      } catch (error) {
        message.error('Failed to fetch post');
        router.push('/posts');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id, user, router, form]);

  const onFinish = async (values: PostForm) => {
    setUpdating(true);
    try {
      await api.put(`/posts/${params.id}`, values);
      message.success('Post updated successfully!');
      router.push(`/posts/${params.id}`);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
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
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      </ProtectedRoute>
    );
  }

  if (!post) {
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
          <div className="text-center py-12">
            <p className="text-gray-500">Post not found.</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

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

        <Card title="Edit Post" className="shadow-md">
          <Form
            form={form}
            name="edit-post"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: 'Please input a title!' },
                { max: 200, message: 'Title must be less than 200 characters!' }
              ]}
            >
              <Input placeholder="Post title" size="large" />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input content!' }]}
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
                loading={updating}
                icon={<SaveOutlined />}
                size="large"
              >
                Update Post
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ProtectedRoute>
  );
}