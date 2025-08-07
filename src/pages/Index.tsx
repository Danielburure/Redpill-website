
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle and Admin Button */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            className="text-foreground/60 hover:text-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Link to="/admin/login">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-foreground/60 hover:text-accent text-xs"
            >
              Admin
            </Button>
          </Link>
        </div>

        {/* Main Content - Centered */}
        <div className="flex flex-col items-center mt-16">
          {/* Website Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-accent mb-6 text-center drop-shadow-lg">
            Redpill Asahd
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-4xl mx-auto text-center leading-relaxed">
            Join me as I unveil the deceptions we have been conditioned to believe and awaken you to a new reality
          </p>

          {/* Search Bar */}
          <Card className="mb-12 bg-card border-primary/50 w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
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
                <p className="text-foreground/80 text-xl">No posts found matching your search.</p>
              </div>
            )}
          </div>

          {/* Separator Line */}
          <div className="w-full max-w-4xl my-12">
            <Separator className="bg-accent/30" />
          </div>

          {/* Comment Section - Bottom Left */}
          <div className="w-full max-w-4xl self-start">
            <CommentSection />
          </div>
        </div>
      </div>
      
      {/* Social Footer */}
      <SocialFooter />
    </div>
  );
};

export default Index;
