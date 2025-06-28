
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useBlogPosts } from '../hooks/useBlogPosts';
import { toast } from 'sonner';
import FileUpload from '../components/FileUpload';

const EditPost = () => {
  const { id } = useParams();
  const { posts, updatePost } = useBlogPosts();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [subheading, setSubheading] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const post = posts.find(p => p.id === id);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSubheading(post.subheading || '');
      setContent(post.content);
      setVideoUrl(post.videoUrl || '');
      setImageUrl(post.imageUrl || '');
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
            <Link to="/admin/dashboard">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      await updatePost(post.id, {
        title: title.trim(),
        subheading: subheading.trim() || undefined,
        content: content.trim(),
        videoUrl: videoUrl.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined
      });

      toast.success('Post updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to update post');
      console.error('Error updating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Edit Post
          </h1>
        </div>

        {/* Form */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  required
                />
              </div>

              {/* Subheading */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Subheading (Optional)
                </label>
                <Input
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  placeholder="Enter post subheading..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Content *
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content..."
                  rows={10}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 resize-none"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Image (Optional)
                </label>
                <div className="space-y-4">
                  <FileUpload
                    type="image"
                    onUpload={setImageUrl}
                    onRemove={() => setImageUrl('')}
                    currentUrl={imageUrl}
                  />
                  <div className="text-center text-white/60">OR</div>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste image URL..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  />
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Video (Optional)
                </label>
                <div className="space-y-4">
                  <FileUpload
                    type="video"
                    onUpload={setVideoUrl}
                    onRemove={() => setVideoUrl('')}
                    currentUrl={videoUrl}
                  />
                  <div className="text-center text-white/60">OR</div>
                  <Input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Or paste video URL..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-1"
                >
                  {isLoading ? 'Updating Post...' : 'Update Post'}
                </Button>
                <Link to="/admin/dashboard">
                  <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPost;
