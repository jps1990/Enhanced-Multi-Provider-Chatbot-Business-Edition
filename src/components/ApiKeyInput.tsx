import React from 'react';

interface ApiKeyInputProps {
  apiKeys: {
    openai: string;
    anthropic: string;
    cohere: string;
  };
  onChange: (provider: 'openai' | 'anthropic' | 'cohere', key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKeys, onChange }) => {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="openai">OpenAI API Key:</label>
        <input
          id="openai"
          type="password"
          value={apiKeys.openai}
          onChange={(e) => onChange('openai', e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div>
        <label htmlFor="anthropic">Anthropic API Key:</label>
        <input
          id="anthropic"
          type="password"
          value={apiKeys.anthropic}
          onChange={(e) => onChange('anthropic', e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div>
        <label htmlFor="cohere">Cohere API Key:</label>
        <input
          id="cohere"
          type="password"
          value={apiKeys.cohere}
          onChange={(e) => onChange('cohere', e.target.value)}
          autoComplete="current-password"
        />
      </div>
    </form>
  );
};

export default ApiKeyInput;