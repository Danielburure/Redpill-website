
import ShareButton from './ShareButton';

interface PostHeaderProps {
  title: string;
  subheading?: string;
  postId: string;
  timestamp: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, subheading, postId, timestamp }) => {
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
    <>
      {/* Title and Share Button */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 mr-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            {title}
          </h1>
          {subheading && (
            <p className="text-2xl text-white/80 mt-2">
              {subheading}
            </p>
          )}
        </div>
        <ShareButton postId={postId} postTitle={title} />
      </div>

      {/* Date */}
      <p className="text-white/60 text-lg mb-8">{formatDate(timestamp)}</p>
    </>
  );
};

export default PostHeader;
