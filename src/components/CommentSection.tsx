
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useComments } from '../hooks/useComments';

const CommentSection = () => {
  const { comments, addComment } = useComments();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      addComment(name.trim(), comment.trim());
      setName('');
      setComment('');
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 dark:bg-gray-800/10 dark:border-gray-700/20">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-4">
            Ask any question you need for clarification and I shall answer
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 dark:bg-gray-700/20 dark:border-gray-600/20 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
            <Textarea
              placeholder="Your question or comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 dark:bg-gray-700/20 dark:border-gray-600/20 dark:text-gray-100 dark:placeholder:text-gray-400"
              rows={4}
              required
            />
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              Submit Question
            </Button>
          </form>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white dark:text-gray-100">
              Questions & Comments ({comments.length})
            </h4>
            {comments.length === 0 ? (
              <p className="text-white/60 dark:text-gray-400">No questions yet. Be the first to ask!</p>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="bg-white/5 border-white/10 dark:bg-gray-700/10 dark:border-gray-600/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white dark:text-gray-100">{comment.name}</h5>
                      <span className="text-sm text-white/60 dark:text-gray-400">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-white/90 dark:text-gray-200">{comment.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentSection;
