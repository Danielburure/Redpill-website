
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  postId: string;
  postTitle: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ postId, postTitle }) => {
  const [copied, setCopied] = useState(false);
  
  // Use asahd domain instead of lovable
  const asahdDomain = window.location.hostname.includes('localhost') 
    ? window.location.origin 
    : 'https://asahd.com';
  
  const postUrl = `${asahdDomain}/post/${postId}`;
  const encodedTitle = encodeURIComponent(postTitle);
  const encodedUrl = encodeURIComponent(postUrl);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = postUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700/20"
          >
            <Share className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white/90 backdrop-blur-lg border-white/20 dark:bg-gray-800/90 dark:border-gray-700/20">
          <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
            {copied ? (
              <Check className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy link"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
            <span className="w-4 h-4 mr-2 text-black">𝕏</span>
            Share to X (Twitter)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToWhatsApp} className="cursor-pointer">
            <span className="w-4 h-4 mr-2 text-green-600">📱</span>
            Share to WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
            <span className="w-4 h-4 mr-2 text-blue-600">📘</span>
            Share to Facebook
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-xs text-white/60 dark:text-gray-400 mt-1">Share</span>
    </div>
  );
};

export default ShareButton;
