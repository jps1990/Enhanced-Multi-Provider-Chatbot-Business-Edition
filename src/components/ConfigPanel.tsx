import React from 'react';
import { X } from 'lucide-react';
import { saveTokens } from '../utils/localStorage';
import { ApiKeys } from '../types';

interface ConfigPanelProps {
  apiKeys: ApiKeys;
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKeys>>;
  temperature: number;
  setTemperature: (temp: number) => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  maxTokens: number;
  setMaxTokens: (tokens: number) => void;
  onClose?: () => void;
  imageSeed: string;
  setImageSeed: (seed: string) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  apiKeys,
  setApiKeys,
  temperature,
  setTemperature,
  systemPrompt,
  setSystemPrompt,
  userPrompt,
  setUserPrompt,
  maxTokens,
  setMaxTokens,
  onClose,
  imageSeed,
  setImageSeed
}) => {
  const handleApiKeyChange = (provider: keyof ApiKeys, key: string) => {
    setApiKeys(prev => {
      const newKeys = { ...prev, [provider]: key };
      saveTokens(newKeys); // Sauvegarder les tokens
      return newKeys;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Configuration</h2>
            {Object.values(apiKeys).some(key => key) && (
              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Clés encryptées
              </span>
            )}
          </div>
          {onClose && (
            <button onClick={onClose} className="hover:bg-blue-900/20 p-2 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="space-y-4">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="openaiApiKey">OpenAI API Key</label>
              <input
                type="password"
                id="openaiApiKey"
                value={apiKeys.openai}
                onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Enter your OpenAI API key"
              />
            </div>
            <div>
              <label htmlFor="anthropicApiKey">Anthropic API Key</label>
              <input
                type="password"
                id="anthropicApiKey"
                value={apiKeys.anthropic}
                onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Enter your Anthropic API key"
              />
            </div>
            <div>
              <label htmlFor="cohereApiKey">Cohere API Key</label>
              <input
                type="password"
                id="cohereApiKey"
                value={apiKeys.cohere}
                onChange={(e) => handleApiKeyChange('cohere', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Enter your Cohere API key"
              />
            </div>
          </form>

          <div>
            <label htmlFor="temperature" className="block mb-2">
              Temperature: {temperature}
            </label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="systemPrompt" className="block mb-2">System Prompt</label>
            <textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows={4}
              placeholder="Enter system prompt"
            />
          </div>

          <div>
            <label htmlFor="userPrompt" className="block mb-2">User Prompt</label>
            <textarea
              id="userPrompt"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows={4}
              placeholder="Enter user prompt"
            />
          </div>

          <div>
            <label htmlFor="maxTokens" className="block mb-2">Contexte Maximum (Tokens)</label>
            <input
              type="number"
              id="maxTokens"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-700 text-white"
              min="100"
              max="32000"
              step="100"
            />
            <p className="text-sm text-gray-400 mt-1">
              Entre 100 et 32000 tokens. Plus élevé = plus de contexte, mais plus coûteux.
            </p>
          </div>

          <div className="space-y-6 text-sm mt-6">
            <div>
              <h3 className="text-lg font-bold mb-2">1. Chat Conversationnel (Le Bavard) 🗣️</h3>
              <p>Temperature: 0.7-0.9 (Pour qu'il soit vivant, pas un robot!)</p>
              <p>Pénalité de Présence: 0.2-0.4 (Faut pas qu'il radote non plus)</p>
              <p>Pénalité de Fréquence: 0.2-0.3 (Pour éviter le mode perroquet)</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">2. Chat Code (Le Précis) 💻</h3>
              <p>Temperature: 0.1-0.3 (On veut du carré, pas de la poésie)</p>
              <p>Pénalité de Présence: 0-0.2 (Le code, ça se répète, c'est normal)</p>
              <p>Pénalité de Fréquence: 0-0.2 (Faut pas qu'il réinvente la roue)</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">3. Chat Instructif (Le Prof Cool) 📚</h3>
              <p>Temperature: 0.4-0.6 (Un peu de fun dans l'apprentissage)</p>
              <p>Pénalité de Présence: 0.3-0.5 (Pour varier les explications)</p>
              <p>Pénalité de Fréquence: 0.3-0.5 (Répéter c'est bien, mais faut pas endormir)</p>
            </div>
          </div>

          <div>
            <label htmlFor="imageSeed" className="block mb-2">Seed pour les images</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="imageSeed"
                value={imageSeed}
                onChange={(e) => setImageSeed(e.target.value)}
                placeholder="Laissez vide pour aléatoire"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <button
                onClick={() => setImageSeed(Math.floor(Math.random() * 1000000).toString())}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                title="Générer un seed aléatoire"
              >
                🎲
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Un seed permet de reproduire la même image avec les mêmes paramètres
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;