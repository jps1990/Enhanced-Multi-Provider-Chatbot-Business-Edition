export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  type: 'text' | 'image' | 'error';
  imageUrl?: string;
  timestamp: number;
}

export interface Conversation {
  id: number;
  messages: Message[];
  title: string;
}

export interface ApiKeys {
  openai: string;
  anthropic: string;
  cohere: string;
}

export interface ImageSettings {
  size: '1024x1024' | '1024x1792' | '1792x1024';
  quality: 'standard' | 'hd';
  style: 'natural' | 'vivid';
  seed?: string;
}

export interface Settings {
  temperature: number;
  systemPrompt: string;
  maxTokens: number;
  imageSettings?: {
    size: string;
    quality: 'standard' | 'hd';
    style: 'natural' | 'vivid';
  };
  lastUpdated?: number;
}

export interface ApiResponse {
  content: string;
  type: 'text' | 'image' | 'error';
  imageUrl?: string; // Optional URL for generated images
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}