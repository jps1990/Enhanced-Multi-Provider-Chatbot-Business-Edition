import React from 'react';
import { X } from 'lucide-react';

interface SettingsGuideProps {
  onClose: () => void;
}

export const SettingsGuide: React.FC<SettingsGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Guide des paramètres</h2>
          <button onClick={onClose} className="hover:bg-blue-900/20 p-2 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm">
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
      </div>
    </div>
  );
};