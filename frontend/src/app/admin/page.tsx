'use client';

import { Tabs, Card } from 'antd';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import UserManagement from '@/components/admin/UserManagement';
import PostManagement from '@/components/admin/PostManagement';
import { useIsAdmin } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const isAdmin = useIsAdmin();
  
  if (!isAdmin) {
    return (
      <ProtectedRoute requiredRole="admin">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-500">You are not authorized to access this page.</p>
        </div>
      </ProtectedRoute>
    );
  }

  const tabItems = [
    {
      key: 'users',
      label: (
        <span>
          <UserOutlined />
          User Management
        </span>
      ),
      children: <UserManagement />,
    },
    {
      key: 'posts',
      label: (
        <span>
          <FileTextOutlined />
          Post Management
        </span>
      ),
      children: <PostManagement />,
    },
  ];

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        <Card className="shadow-md">
          <Tabs defaultActiveKey="users" items={tabItems} />
        </Card>
      </div>
    </ProtectedRoute>
  );
}