'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Dropdown, Space, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link href="/profile">Profile</Link>,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Blog App
            </Link>
            <nav className="ml-6 space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/posts" className="text-gray-600 hover:text-gray-900">
                Posts
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <span className="text-sm text-gray-700">Hello, {user.name}</span>
                </Space>
              </Dropdown>
            ) : (
              <>
                <Link href="/login">
                  <Button type="default">Login</Button>
                </Link>
                <Link href="/register">
                  <Button type="primary">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;