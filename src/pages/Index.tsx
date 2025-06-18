
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useTheme } from '../contexts/ThemeContext';
import PostCard from '../components/PostCard';
import CommentSection from '../components/CommentSection';
import SocialFooter from '../components/SocialFooter';

const Index = () => {
  const { posts, addReaction } = useBlogPosts();
  const { isDark, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle and Admin Button */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
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
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto text-center leading-relaxed dark:text-gray-200">
            Join me as I unfold the secrets that the mainstream media has conditioned us to believe in
          </p>

          {/* Search Bar */}
          <Card className="mb-12 bg-white/10 backdrop-blur-lg border-white/20 w-full max-w-2xl dark:bg-gray-800/10 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 dark:text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 dark:bg-gray-700/20 dark:border-gray-600/20 dark:text-gray-100 dark:placeholder:text-gray-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Posts Grid - Horizontal Layout */}
          <div className="w-full max-w-4xl">
            <div className="space-y-6">
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
                <p className="text-white/80 text-xl dark:text-gray-300">No posts found matching your search.</p>
              </div>
            )}
          </div>

          {/* Comment Section */}
          <CommentSection />
        </div>
      </div>
      
      {/* Social Footer */}
      <SocialFooter />
    </div>
  );
};

export default Index;
