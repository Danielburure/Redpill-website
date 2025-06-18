
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from '../hooks/useBlogPosts';
import PostCard from '../components/PostCard';

const Index = () => {
  const { posts, addReaction } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Button - Top Right */}
        <div className="flex justify-end mb-8">
          <Link to="/admin/login">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
            >
              Admin
            </Button>
          </Link>
        </div>

        {/* Main Content - Centered */}
        <div className="flex flex-col items-center mt-16">
          {/* Website Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent text-center">
            Redpill Asahd
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto text-center leading-relaxed">
            Join me as I unfold the secrets that the mainstream media has conditioned us to believe in
          </p>

          {/* Search Bar */}
          <Card className="mb-12 bg-white/10 backdrop-blur-lg border-white/20 w-full max-w-2xl">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Posts Grid - Horizontal Layout */}
          <div className="w-full max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onReaction={(emoji) => addReaction(post.id, emoji)}
                />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/80 text-xl">No posts found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
