import React from 'react';
import { Plus, Trash, Edit2, Check, X } from 'lucide-react';
import { Conversation } from '../types';

interface ConversationListProps {
  conversations: Conversation[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onNew: () => void;
  onDelete: (index: number) => void;
  onRename?: (index: number, newName: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentIndex,
  onSelect,
  onNew,
  onDelete,
  onRename
}) => {
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editingName, setEditingName] = React.useState('');

  const handleStartEditing = (index: number, currentName: string) => {
    setEditingIndex(index);
    setEditingName(currentName);
  };

  const handleSaveEdit = (index: number) => {
    if (onRename && editingName.trim()) {
      onRename(index, editingName.trim());
    }
    setEditingIndex(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingName('');
  };

  return (
    <div className="w-64 bg-gray-800 p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <button
          onClick={onNew}
          className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="New Conversation"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {conversations.map((conversation, index) => (
          <li
            key={conversation.id}
            className={`flex justify-between items-center p-2 rounded cursor-pointer ${
              index === currentIndex ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            {editingIndex === index ? (
              <div className="flex items-center space-x-2 w-full">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="bg-gray-700 text-white rounded px-2 py-1 flex-grow"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveEdit(index);
                    } else if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="p-1 hover:bg-green-600 rounded-full"
                  title="Save"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-red-600 rounded-full"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <span
                  className="truncate flex-grow"
                  onClick={() => onSelect(index)}
                >
                  {conversation.title || `Conversation ${index + 1}`}
                </span>
                <div className="flex space-x-1">
                  {onRename && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEditing(index, conversation.title || `Conversation ${index + 1}`);
                      }}
                      className="p-1 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Rename"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Delete"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;