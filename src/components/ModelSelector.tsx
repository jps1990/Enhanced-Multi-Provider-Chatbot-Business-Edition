import React from 'react';
import { models } from '../utils/models';

interface ModelSelectorProps {
  provider: string;
  model: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  imageSize: string;
  onImageSizeChange: (size: string) => void;
  imageQuality: 'standard' | 'hd';
  onImageQualityChange: (quality: 'standard' | 'hd') => void;
  imageStyle: 'natural' | 'vivid';
  onImageStyleChange: (style: 'natural' | 'vivid') => void;
}

const getModelPrice = (model: string): number => {
  const prices: { [key: string]: number } = {
    'gpt-4': 0.03,
    'gpt-4-turbo-preview': 0.02,
    'gpt-3.5-turbo': 0.002,
    'dall-e-3': 0.04,
    'dall-e-2': 0.02,
    'command': 0.008,
    'command-light': 0.005,
    'command-nightly': 0.012,
    'command-r-plus-04-2024': 0.015,
    'command-r-08-2024': 0.01
  };
  return prices[model] || 0;
};

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  provider,
  model,
  onProviderChange,
  onModelChange,
  imageSize,
  onImageSizeChange,
  imageQuality,
  onImageQualityChange,
  imageStyle,
  onImageStyleChange
}) => {
  const isDalleModel = model.includes('dall-e');

  const handleProviderChange = (newProvider: string) => {
    const availableModels = models[newProvider as keyof typeof models];
    if (availableModels && availableModels.length > 0) {
      onProviderChange(newProvider);
      onModelChange(availableModels[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          value={provider}
          onChange={(e) => handleProviderChange(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="openai">OpenAI</option>
          <option value="cohere">Cohere</option>
        </select>

        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {models[provider as keyof typeof models]?.map((m) => (
            <option key={m} value={m}>
              {m} (${getModelPrice(m).toFixed(3)}/1K tokens)
            </option>
          ))}
        </select>
      </div>

      {isDalleModel && (
        <div className="flex gap-4 items-center">
          <div>
            <label className="block mb-2">Image Size</label>
            <select
              value={imageSize}
              onChange={(e) => onImageSizeChange(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="1024x1024">1024x1024</option>
              <option value="1024x1792">1024x1792</option>
              <option value="1792x1024">1792x1024</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Quality</label>
            <select
              value={imageQuality}
              onChange={(e) => onImageQualityChange(e.target.value as 'standard' | 'hd')}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="standard">Standard</option>
              <option value="hd">HD</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Style</label>
            <select
              value={imageStyle}
              onChange={(e) => onImageStyleChange(e.target.value as 'natural' | 'vivid')}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="natural">Natural</option>
              <option value="vivid">Vivid</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};