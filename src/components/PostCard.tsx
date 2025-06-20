
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from '../hooks/useBlogPosts';
import { Heart, Play } from "lucide-react";

interface PostCardProps {
  post: BlogPost;
  onReaction: (emoji: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onReaction }) => {
  const [showReactions, setShowReactions] = useState(false);

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

  const emojis = ['❤️', '😢', '😮'];

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group dark:bg-gray-800/10 dark:border-gray-700/20 dark:hover:bg-gray-700/20 w-full mb-6">
      <CardContent className="p-6">
        {/* Image Display */}
        {post.imageUrl && (
          <div className="relative mb-4 overflow-hidden rounded-lg">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg border-2 border-gradient-to-r from-pink-400 to-violet-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Video Display */}
        {post.videoUrl && (
          <div className="relative mb-4 overflow-hidden rounded-lg">
            <video 
              className="w-full h-48 object-cover rounded-lg border-2 border-gradient-to-r from-pink-400 to-violet-500"
              controls
              preload="metadata"
            >
              <source src={post.videoUrl} type="video/mp4" />
              <source src={post.videoUrl} type="video/webm" />
              <source src={post.videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors dark:text-gray-100 dark:group-hover:text-yellow-300">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-white/60 text-sm mb-3 dark:text-gray-400">{formatDate(post.timestamp)}</p>

        {/* Content Preview */}
        <p className="text-white/80 mb-4 leading-relaxed dark:text-gray-200">
          {truncateContent(post.content)}
        </p>

        {/* Reactions */}
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReactions(!showReactions)}
            className="text-white hover:bg-white/20 dark:text-gray-100 dark:hover:bg-gray-700/20"
          >
            <Heart className="w-4 h-4 mr-2" />
            React
          </Button>
          
          {showReactions && (
            <div className="flex flex-wrap gap-2 mt-2">
              {emojis.map(emoji => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onReaction(emoji);
                  }}
                  className="text-white hover:bg-white/20 text-lg p-1 h-auto min-w-0 dark:text-gray-100 dark:hover:bg-gray-700/20"
                >
                  {emoji}
                  {post.reactions[emoji] && (
                    <span className="ml-1 text-xs">{post.reactions[emoji]}</span>
                  )}
                </Button>
              ))}
            </div>
          )}
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
