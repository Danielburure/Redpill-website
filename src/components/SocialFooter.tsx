
import { Github, Instagram, MessageCircle } from "lucide-react";

const SocialFooter = () => {
  return (
    <footer className="w-full mt-20 py-12 bg-black/20 backdrop-blur-lg border-t border-white/10 dark:bg-gray-900/20 dark:border-gray-700/10">
      <div className="container mx-auto px-4">
        {/* Contact Me Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-6">Contact Me</h3>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://x.com/itsDummy4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors animate-glitter"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors animate-sparkle">
                  <span className="text-xl text-accent">𝕏</span>
                </div>
                <span className="text-sm text-accent font-medium">X</span>
              </div>
            </a>
            
            <a 
              href="https://instagram.com/khid_.asahd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors animate-glitter"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors animate-sparkle">
                  <Instagram className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm text-accent font-medium">Instagram</span>
              </div>
            </a>
            
            <a 
              href="https://wa.me/254720485988" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors animate-glitter"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors animate-sparkle">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm text-accent font-medium">WhatsApp</span>
              </div>
            </a>
            
            <a 
              href="https://github.com/Danielburure" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors animate-glitter"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors animate-sparkle">
                  <Github className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm text-accent font-medium">GitHub</span>
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
