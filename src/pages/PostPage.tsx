
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Video } from "lucide-react";
import { useBlogPosts } from '../hooks/useBlogPosts';

const PostPage = () => {
  const { id } = useParams();
  const { posts, addReaction } = useBlogPosts();
  
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
            <Link to="/blog">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Post Content */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Date */}
            <p className="text-white/60 text-lg mb-8">{formatDate(post.timestamp)}</p>

            {/* Video */}
            {post.videoUrl && (
              <div className="mb-8">
                <div className="relative overflow-hidden rounded-xl border-4 border-gradient-to-r from-pink-400 to-violet-500 p-2 bg-gradient-to-r from-pink-400 to-violet-500">
                  <div className="bg-black rounded-lg p-8 text-center">
                    <Video className="h-16 w-16 text-white mx-auto mb-4" />
                    <p className="text-white text-lg">Video Player</p>
                    <p className="text-white/60 text-sm mt-2">Video content would be embedded here</p>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Reactions */}
            <div className="border-t border-white/20 pt-6">
              <h3 className="text-white text-lg font-semibold mb-4">React to this post:</h3>
              <div className="flex flex-wrap gap-3">
                {emojis.map(emoji => (
                  <Button
                    key={emoji}
                    variant="outline"
                    size="lg"
                    onClick={() => addReaction(post.id, emoji)}
                    className="border-white/30 text-white hover:bg-white/20 text-2xl p-4 h-auto"
                  >
                    {emoji}
                    {post.reactions[emoji] && (
                      <span className="ml-2 text-sm">{post.reactions[emoji]}</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostPage;
