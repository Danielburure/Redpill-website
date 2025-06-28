
interface PostMediaProps {
  imageUrl?: string;
  videoUrl?: string;
  title: string;
}

const PostMedia: React.FC<PostMediaProps> = ({ imageUrl, videoUrl, title }) => {
  return (
    <>
      {/* Image */}
      {imageUrl && (
        <div className="mb-8">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full max-h-96 object-cover rounded-xl border-4 border-gradient-to-r from-pink-400 to-violet-500"
          />
        </div>
      )}

      {/* Video */}
      {videoUrl && (
        <div className="mb-8">
          <video 
            className="w-full max-h-96 object-cover rounded-xl border-4 border-gradient-to-r from-pink-400 to-violet-500"
            controls
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};

export default PostMedia;
