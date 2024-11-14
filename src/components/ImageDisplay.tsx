import React from 'react';
import { Download } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="mt-4 relative group">
      <img 
        src={imageUrl} 
        alt="Generated" 
        className="w-1/4 h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => window.open(imageUrl, '_blank')}
      />
      <button
        onClick={handleDownload}
        className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
      >
        <Download size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ImageDisplay;