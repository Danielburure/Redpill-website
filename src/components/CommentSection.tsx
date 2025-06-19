
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useComments } from '../hooks/useComments';
import { MessageCircle, Send } from "lucide-react";

const CommentSection = () => {
  const { comments, addComment } = useComments();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      setIsSubmitting(true);
      try {
        await addComment(name.trim(), comment.trim());
        setName('');
        setComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setIsSubmitting(false);
      }
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
    <div className="w-full max-w-2xl mx-auto mt-12">
      <Card className="bg-white/5 backdrop-blur-lg border-4 border-double border-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 shadow-2xl dark:bg-gray-900/20 dark:border-gradient-to-r dark:from-cyan-300 dark:via-purple-400 dark:to-pink-300" 
            style={{
              borderImage: 'linear-gradient(45deg, #22d3ee, #a855f7, #ec4899) 1',
              borderWidth: '4px',
              borderStyle: 'solid'
            }}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-6 w-6 text-cyan-400 mr-3" />
            <h3 className="text-xl font-bold text-white dark:text-gray-100">
              Ask Questions & Share Thoughts
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-2 border-cyan-400/50 text-white placeholder:text-white/60 focus:border-purple-400 transition-colors dark:bg-gray-800/20 dark:border-cyan-300/50 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
            <Textarea
              placeholder="Your question or comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/10 border-2 border-cyan-400/50 text-white placeholder:text-white/60 focus:border-purple-400 transition-colors dark:bg-gray-800/20 dark:border-cyan-300/50 dark:text-gray-100 dark:placeholder:text-gray-400"
              rows={3}
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Question'}
            </Button>
          </form>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            <h4 className="text-lg font-semibold text-white dark:text-gray-100 border-b border-cyan-400/30 pb-2">
              Questions & Comments ({comments.length})
            </h4>
            {comments.length === 0 ? (
              <p className="text-white/60 dark:text-gray-400 text-center py-4">No questions yet. Be the first to ask!</p>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="bg-white/5 border-2 border-cyan-400/30 hover:border-purple-400/50 transition-colors dark:bg-gray-800/10 dark:border-cyan-300/30">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-cyan-300 dark:text-cyan-200">{comment.name}</h5>
                      <span className="text-xs text-white/60 dark:text-gray-400">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-white/90 dark:text-gray-200 text-sm">{comment.comment}</p>
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
