/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Modal, Input, App, Form } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { User } from "@/types";
import api from "../../lib/axios";

const { Column } = Table;

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "user";
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const { modal, message: messageApi } = App.useApp();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/all-users");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
      messageApi.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (values: CreateUserForm) => {
    if (values.password !== values.confirmPassword) {
      messageApi.error("Passwords do not match!");
      return;
    }

    setCreateLoading(true);
    try {
      const { confirmPassword, ...userData } = values;
      await api.post("/auth/register", userData);
      messageApi.success("User created successfully");
      setCreateModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      console.log(error);
      const err = error as { response?: { data?: { message?: string } } };
      messageApi.error(
        err.response?.data?.message || "Failed to create user"
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    modal.confirm({
      title: "Are you sure you want to delete this user?",
      content:
        "This action cannot be undone and will delete all posts by this user.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await api.delete(`/admin/user/${userId}`);
          messageApi.success("User deleted successfully");
          fetchUsers();
        } catch (error) {
          messageApi.error("Failed to delete user");
        }
      },
    });
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "admin" | "user"
  ) => {
    try {
      await api.put(`/admin/user/${userId}`, { role: newRole });
      messageApi.success("User role updated successfully");
      fetchUsers();
    } catch (error) {
      messageApi.error("Failed to update user role");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create User
        </Button>
      </div>

      <Table
        dataSource={filteredUsers}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Role"
          dataIndex="role"
          key="role"
          render={(role: string) => (
            <Tag color={role === "admin" ? "red" : "blue"}>
              {role.toUpperCase()}
            </Tag>
          )}
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
          render={(_, record: User) => (
            <Space size="middle">
              <Button
                size="small"
                onClick={() =>
                  handleRoleChange(
                    record._id,
                    record.role === "admin" ? "user" : "admin"
                  )
                }
              >
                {record.role === "admin" ? "Make User" : "Make Admin"}
              </Button>
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteUser(record._id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* Create User Modal */}
      <Modal
        title="Create New User"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          name="create-user"
          onFinish={handleCreateUser}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm the password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={createLoading}>
                Create User
              </Button>
              <Button
                onClick={() => {
                  setCreateModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
