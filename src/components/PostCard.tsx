
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from '../hooks/useBlogPosts';
import { Video } from "lucide-react";

interface PostCardProps {
  post: BlogPost;
  onReaction: (emoji: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onReaction }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <CardContent className="p-6">
        {/* Video Thumbnail */}
        {post.videoUrl && (
          <div className="relative mb-4 overflow-hidden rounded-lg border-4 border-gradient-to-r from-pink-400 to-violet-500 p-1">
            <div className="bg-gradient-to-r from-pink-400 to-violet-500 rounded-lg p-4 text-center">
              <Video className="h-12 w-12 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Video Content</p>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-white/60 text-sm mb-3">{formatDate(post.timestamp)}</p>

        {/* Content Preview */}
        <p className="text-white/80 mb-4 leading-relaxed">
          {truncateContent(post.content)}
        </p>

        {/* Reactions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {emojis.map(emoji => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onReaction(emoji);
              }}
              className="text-white hover:bg-white/20 text-lg p-1 h-auto min-w-0"
            >
              {emoji}
              {post.reactions[emoji] && (
                <span className="ml-1 text-xs">{post.reactions[emoji]}</span>
              )}
            </Button>
          ))}
        </div>

        {/* Read More Button */}
        <Link to={`/post/${post.id}`}>
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0">
            Read Full Post
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;
