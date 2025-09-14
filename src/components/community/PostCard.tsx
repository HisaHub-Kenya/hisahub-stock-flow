
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export interface Post {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: {
    first_name: string | null;
    last_name: string | null;
  };
  is_liked: boolean;
  likes_count: number;
  replies_count?: number;
  comments_count: number;
};

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike }) => {
  const displayName = post.author?.first_name && post.author?.last_name 
    ? `${post.author.first_name} ${post.author.last_name}`
    : post.author?.first_name || post.author?.last_name || 'Anonymous User';

  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{displayName}</h4>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleLike(post.id)}
            className={`flex items-center gap-2 ${
              post.is_liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground'
            }`}
          >
            <Heart className={`w-4 h-4 ${post.is_liked ? 'fill-current' : ''}`} />
            {post.likes_count}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {post.replies_count}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
