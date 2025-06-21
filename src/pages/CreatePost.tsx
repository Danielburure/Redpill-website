
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Image } from "lucide-react";
import { useBlogPosts } from '../hooks/useBlogPosts';
import { toast } from 'sonner';
import FileUpload from '../components/FileUpload';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addPost } = useBlogPosts();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      await addPost({
        title: title.trim(),
        content: content.trim(),
        videoUrl: videoUrl.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined
      });

      toast.success('Post created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to create post');
      console.error('Error creating post:', error);
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
            Create New Post
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
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex-1"
                >
                  {isLoading ? 'Creating Post...' : 'Publish Post'}
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

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Image className="h-6 w-6 text-blue-400 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">Image Support</h3>
                  <p className="text-white/60 text-sm">
                    Upload images directly to Supabase Storage for secure, fast loading.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-lg border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Upload className="h-6 w-6 text-green-400 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">Video Uploads</h3>
                  <p className="text-white/60 text-sm">
                    Upload videos directly to Supabase Storage with automatic optimization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
