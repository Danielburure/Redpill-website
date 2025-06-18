
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from '../hooks/useBlogPosts';
import PostCard from '../components/PostCard';

const BlogPage = () => {
  const { posts, addReaction } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Secret Blog
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
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

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default BlogPage;
