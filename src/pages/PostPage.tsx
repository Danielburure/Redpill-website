
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '../hooks/useBlogPosts';
import PostHeader from '../components/PostHeader';
import PostMedia from '../components/PostMedia';
import PostContent from '../components/PostContent';
import PostReactions from '../components/PostReactions';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        // Fetch the specific post
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (postError) throw postError;

        // Fetch reactions for this post
        const { data: reactionsData, error: reactionsError } = await supabase
          .from('post_reactions')
          .select('*')
          .eq('post_id', id);

        if (reactionsError) throw reactionsError;

        // Combine post with reactions
        const reactions: { [emoji: string]: number } = {};
        reactionsData.forEach(reaction => {
          reactions[reaction.emoji] = reaction.count;
        });

        const postWithReactions: BlogPost = {
          id: postData.id,
          title: postData.title,
          subheading: postData.subheading,
          content: postData.content,
          videoUrl: postData.video_url,
          imageUrl: postData.image_url,
          timestamp: postData.created_at,
          pinned: postData.pinned || false,
          reactions
        };

        setPost(postWithReactions);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const addReaction = async (emoji: string) => {
    if (!post) return;

    try {
      // Check if reaction exists
      const { data: existingReaction } = await supabase
        .from('post_reactions')
        .select('*')
        .eq('post_id', post.id)
        .eq('emoji', emoji)
        .single();

      if (existingReaction) {
        // Update existing reaction
        const { error } = await supabase
          .from('post_reactions')
          .update({ count: existingReaction.count + 1 })
          .eq('id', existingReaction.id);

        if (error) throw error;
      } else {
        // Create new reaction
        const { error } = await supabase
          .from('post_reactions')
          .insert({
            post_id: post.id,
            emoji: emoji,
            count: 1
          });

        if (error) throw error;
      }

      // Update local state
      setPost({
        ...post,
        reactions: {
          ...post.reactions,
          [emoji]: (post.reactions[emoji] || 0) + 1
        }
      });
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Loading...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
            <Link to="/">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Post Content */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            <PostHeader 
              title={post.title}
              subheading={post.subheading}
              postId={post.id}
              timestamp={post.timestamp}
            />

            <PostMedia 
              imageUrl={post.imageUrl}
              videoUrl={post.videoUrl}
              title={post.title}
            />

            <PostContent content={post.content} />

            <PostReactions 
              reactions={post.reactions}
              onAddReaction={addReaction}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostPage;
