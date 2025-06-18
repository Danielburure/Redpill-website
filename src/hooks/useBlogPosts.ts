
import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  timestamp: string;
  reactions: { [emoji: string]: number };
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Demo posts
      const demoPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Welcome to My Secret Blog',
          content: 'This is my very first secret blog post! I\'m excited to share my thoughts and experiences with you through this beautiful platform.',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          timestamp: new Date('2024-06-15').toISOString(),
          reactions: { '👍': 5, '❤️': 3, '🔥': 2 }
        },
        {
          id: '2',
          title: 'Amazing Gradient Designs',
          content: 'Today I want to talk about the beauty of gradient designs in modern web development. The way colors blend together creates such mesmerizing effects!',
          timestamp: new Date('2024-06-16').toISOString(),
          reactions: { '😍': 8, '🎨': 4, '✨': 6 }
        }
      ];
      setPosts(demoPosts);
      localStorage.setItem('blog_posts', JSON.stringify(demoPosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('blog_posts', JSON.stringify(newPosts));
  };

  const addPost = (post: Omit<BlogPost, 'id' | 'timestamp' | 'reactions'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      reactions: {}
    };
    const newPosts = [newPost, ...posts];
    savePosts(newPosts);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    const newPosts = posts.map(post => 
      post.id === id ? { ...post, ...updates } : post
    );
    savePosts(newPosts);
  };

  const deletePost = (id: string) => {
    const newPosts = posts.filter(post => post.id !== id);
    savePosts(newPosts);
  };

  const addReaction = (postId: string, emoji: string) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        const currentCount = post.reactions[emoji] || 0;
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [emoji]: currentCount + 1
          }
        };
      }
      return post;
    });
    savePosts(newPosts);
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    addReaction
  };
};
