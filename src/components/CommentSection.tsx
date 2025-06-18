
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
    <div className="sticky top-8">
      <Card className="bg-white/15 backdrop-blur-xl border-4 border-white/30 dark:bg-gray-800/15 dark:border-gray-300/30 shadow-2xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white dark:text-gray-100 mb-4 text-center">
            Ask any question you need for clarification and I shall answer
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/20 border-2 border-white/40 text-white placeholder:text-white/70 dark:bg-gray-700/30 dark:border-gray-400/40 dark:text-gray-100 dark:placeholder:text-gray-300 focus:border-white/60 focus:ring-2 focus:ring-white/20"
              required
            />
            <Textarea
              placeholder="Your question or comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/20 border-2 border-white/40 text-white placeholder:text-white/70 dark:bg-gray-700/30 dark:border-gray-400/40 dark:text-gray-100 dark:placeholder:text-gray-300 focus:border-white/60 focus:ring-2 focus:ring-white/20"
              rows={3}
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold border-2 border-white/20 hover:border-white/40 transition-all"
            >
              Submit Question
            </Button>
          </form>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            <h4 className="text-lg font-semibold text-white dark:text-gray-100 text-center border-b-2 border-white/30 pb-2">
              Questions & Comments ({comments.length})
            </h4>
            {comments.length === 0 ? (
              <p className="text-white/70 dark:text-gray-300 text-center italic">No questions yet. Be the first to ask!</p>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="bg-white/10 border-2 border-white/20 dark:bg-gray-700/15 dark:border-gray-500/20 hover:bg-white/15 transition-all">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white dark:text-gray-100 text-sm">{comment.name}</h5>
                      <span className="text-xs text-white/60 dark:text-gray-400">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-white/90 dark:text-gray-200 text-sm leading-relaxed">{comment.comment}</p>
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
