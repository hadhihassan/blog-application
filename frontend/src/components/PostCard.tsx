import Link from 'next/link';
import { Post } from '@/types';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Meta } = Card;

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const { user } = useAuth();
  const isAuthor = user && user._id === post.author._id;
  const isAdmin = user && user.role === 'admin';

  return (
    <Card
      style={{ width: '100%', marginBottom: 16 }}
      actions={[
        <Link key="view" href={`/posts/${post._id}`}>
          <EyeOutlined /> View
        </Link>,
        ...(isAuthor || isAdmin ? [
          <Link key="edit" href={`/posts/${post._id}/edit`}>
            <EditOutlined /> Edit
          </Link>,
          <Button 
            key="delete" 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete && onDelete(post._id)}
          >
            Delete
          </Button>
        ] : [])
      ]}
    >
      <Meta
        title={post.title}
        description={
          <div>
            <p className="text-gray-600 mb-2">
              {post.content.length > 150 
                ? `${post.content.substring(0, 150)}...` 
                : post.content
              }
            </p>
            <div className="text-sm text-gray-500">
              By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default PostCard;