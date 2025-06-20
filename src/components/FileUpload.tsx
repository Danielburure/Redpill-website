
import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Image, Video } from "lucide-react";
import { useFileUpload } from '../hooks/useFileUpload';

interface FileUploadProps {
  type: 'image' | 'video';
  onUpload: (url: string) => void;
  currentUrl?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ type, onUpload, currentUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading } = useFileUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const bucket = type === 'image' ? 'images' : 'videos';
      const url = await uploadFile(file, bucket);
      onUpload(url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const acceptedTypes = type === 'image' 
    ? 'image/jpeg,image/png,image/gif,image/webp'
    : 'video/mp4,video/webm,video/ogg';

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10"
      >
        {type === 'image' ? <Image className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
        {uploading ? 'Uploading...' : `Upload ${type}`}
      </Button>

      {currentUrl && (
        <p className="text-white/60 text-sm">
          {type === 'image' ? 'Image' : 'Video'} uploaded successfully
        </p>
      )}
    </div>
  );
};

export default FileUpload;
