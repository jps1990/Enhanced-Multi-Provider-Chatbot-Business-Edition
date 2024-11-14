import React, { useState } from 'react';
import { Message } from '../types';
import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import { ImageModal } from './ImageModal';
import { CodeBlock } from './CodeBlock.tsx';

interface ChatMessageProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSpeak, isSpeaking = false }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const { role, content, type = 'text', imageUrl } = message;
  const isUser = role === 'user';
  const isCode = content.includes('```');

  const renderContent = () => {
    if (isCode) {
      return <CodeBlock content={content} />;
    }

    if (type === 'image' && imageUrl) {
      return (
        <div className="mt-2 relative group">
          <img 
            src={imageUrl} 
            alt="Generated" 
            className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setShowImageModal(true)}
          />
          {showImageModal && (
            <ImageModal 
              imageUrl={imageUrl} 
              onClose={() => setShowImageModal(false)} 
            />
          )}
        </div>
      );
    }

    if (type === 'error') {
      return <p className="text-red-400">{content}</p>;
    }

    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`p-2 rounded-full ${isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
          {isUser ? <User size={24} /> : <Bot size={24} />}
        </div>
        <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-500' : 'bg-gray-800'} max-w-md relative`}>
          {renderContent()}
          {!isUser && type === 'text' && onSpeak && (
            <button 
              onClick={() => onSpeak(content)}
              className={`p-1 rounded hover:bg-blue-900/20 ${isSpeaking ? 'text-blue-400' : ''}`}
              title={isSpeaking ? 'En train de parler' : 'Écouter'}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;