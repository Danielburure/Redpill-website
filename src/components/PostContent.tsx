
interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg prose-invert max-w-none mb-8">
      <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};

export default PostContent;
