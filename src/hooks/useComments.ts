
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Comment {
  id: string;
  name: string;
  comment: string;
  timestamp: string;
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedComments = data.map(comment => ({
        id: comment.id,
        name: comment.name,
        comment: comment.comment,
        timestamp: comment.created_at
      }));

      setComments(formattedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (name: string, comment: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          name: name,
          comment: comment
        });

      if (error) throw error;
      await fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return {
    comments,
    addComment
  };
};
