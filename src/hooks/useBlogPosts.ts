import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  subheading?: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  timestamp: string;
  pinned: boolean;
  reactions: { [emoji: string]: number };
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const fetchPosts = async () => {
    try {
      // Fetch posts ordered by pinned status first, then by date
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('pinned', { ascending: false })
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
          subheading: post.subheading,
          content: post.content,
          videoUrl: post.video_url,
          imageUrl: post.image_url,
          timestamp: post.created_at,
          pinned: post.pinned || false,
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

  const addPost = async (post: Omit<BlogPost, 'id' | 'timestamp' | 'reactions' | 'pinned'>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: post.title,
          subheading: post.subheading,
          content: post.content,
          video_url: post.videoUrl,
          image_url: post.imageUrl,
          pinned: false
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
          subheading: updates.subheading,
          content: updates.content,
          video_url: updates.videoUrl,
          image_url: updates.imageUrl,
          pinned: updates.pinned,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const togglePin = async (id: string) => {
    try {
      const post = posts.find(p => p.id === id);
      if (!post) return;

      const { error } = await supabase
        .from('blog_posts')
        .update({ pinned: !post.pinned })
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error toggling pin:', error);
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
    addReaction,
    togglePin
  };
};
