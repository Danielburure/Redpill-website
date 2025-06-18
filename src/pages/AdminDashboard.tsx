
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { PlusCircle, Edit, Trash2, LogOut, BarChart3 } from "lucide-react";
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { posts, deletePost } = useBlogPosts();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePost(id);
      toast.success('Post deleted successfully');
    }
  };

  const totalReactions = posts.reduce((total, post) => {
    return total + Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{posts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Reactions</p>
                  <p className="text-2xl font-bold text-white">{totalReactions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Posts with Video</p>
                  <p className="text-2xl font-bold text-white">
                    {posts.filter(post => post.videoUrl).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Post */}
        <Card className="mb-8 bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/admin/create">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Post
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Posts Management */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Manage Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{post.title}</h3>
                    <p className="text-white/60 text-sm">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {Object.entries(post.reactions).map(([emoji, count]) => (
                        <span key={emoji} className="text-white/80 text-sm">
                          {emoji} {count}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/admin/edit/${post.id}`}>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-white/60">No posts yet. Create your first post!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
