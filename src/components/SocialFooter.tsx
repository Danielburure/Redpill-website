
import { Github, Instagram, MessageCircle } from "lucide-react";

const SocialFooter = () => {
  return (
    <footer className="w-full mt-20 py-12 bg-black/20 backdrop-blur-lg border-t border-white/10 dark:bg-gray-900/20 dark:border-gray-700/10">
      <div className="container mx-auto px-4">
        {/* Contact Me Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-6">Contact Me</h3>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-xl">𝕏</span>
                </div>
                <span className="text-sm">Twitter</span>
              </div>
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-sm">Instagram</span>
              </div>
            </a>
            
            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-sm">WhatsApp</span>
              </div>
            </a>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-sm">GitHub</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center border-t border-white/10 pt-8 dark:border-gray-700/10">
          <p className="text-lg font-semibold text-white mb-4 dark:text-gray-100">
            "You will own nothing and be happy"
          </p>
          <p className="text-white/60 text-sm dark:text-gray-400">
            © Copyright Asahd 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;
