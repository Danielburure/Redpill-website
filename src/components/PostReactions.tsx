
import { Button } from "@/components/ui/button";

interface PostReactionsProps {
  reactions: { [emoji: string]: number };
  onAddReaction: (emoji: string) => void;
}

const PostReactions: React.FC<PostReactionsProps> = ({ reactions, onAddReaction }) => {
  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  return (
    <div className="border-t border-white/20 pt-6">
      <h3 className="text-white text-lg font-semibold mb-4">React to this post:</h3>
      <div className="flex flex-wrap gap-3">
        {emojis.map(emoji => (
          <Button
            key={emoji}
            variant="outline"
            size="lg"
            onClick={() => onAddReaction(emoji)}
            className="border-white/30 text-white hover:bg-white/20 text-2xl p-4 h-auto"
          >
            {emoji}
            {reactions[emoji] && (
              <span className="ml-2 text-sm">{reactions[emoji]}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PostReactions;
