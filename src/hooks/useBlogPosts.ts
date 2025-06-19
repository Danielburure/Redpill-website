
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  timestamp: string;
  reactions: { [emoji: string]: number };
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const fetchPosts = async () => {
    try {
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch reactions
      const { data: reactionsData, error: reactionsError } = await supabase
        .from('post_reactions')
        .select('*');

      if (reactionsError) throw reactionsError;

      // Combine posts with reactions
      const postsWithReactions = postsData.map(post => {
        const postReactions = reactionsData.filter(r => r.post_id === post.id);
        const reactions: { [emoji: string]: number } = {};
        
        postReactions.forEach(reaction => {
          reactions[reaction.emoji] = reaction.count;
        });

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          videoUrl: post.video_url,
          imageUrl: post.image_url,
          timestamp: post.created_at,
          reactions
        };
      });

      setPosts(postsWithReactions);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post: Omit<BlogPost, 'id' | 'timestamp' | 'reactions'>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: post.title,
          content: post.content,
          video_url: post.videoUrl,
          image_url: post.imageUrl
        });

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: updates.title,
          content: updates.content,
          video_url: updates.videoUrl,
          image_url: updates.imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const addReaction = async (postId: string, emoji: string) => {
    try {
      // Check if reaction exists
      const { data: existingReaction } = await supabase
        .from('post_reactions')
        .select('*')
        .eq('post_id', postId)
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
            post_id: postId,
            emoji: emoji,
            count: 1
          });

        if (error) throw error;
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    addReaction
  };
};
