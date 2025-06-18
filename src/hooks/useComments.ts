
import { useState, useEffect } from 'react';

export interface Comment {
  id: string;
  name: string;
  comment: string;
  timestamp: string;
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const savedComments = localStorage.getItem('blog_comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem('blog_comments', JSON.stringify(newComments));
  };

  const addComment = (name: string, comment: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      comment,
      timestamp: new Date().toISOString()
    };
    const newComments = [newComment, ...comments];
    saveComments(newComments);
  };

  return {
    comments,
    addComment
  };
};
