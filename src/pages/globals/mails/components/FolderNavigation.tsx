import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Inbox, 
  Send, 
  FileText, 
  Archive, 
  Trash,
  Plus
} from 'lucide-react';
import { getUnreadCount } from '../api/emailService';
import type { EmailFolder } from '../types';

interface FolderNavigationProps {
  selectedFolder: EmailFolder;
  onFolderSelect: (folder: EmailFolder) => void;
  onComposeClick: () => void;
}

const FolderNavigation: React.FC<FolderNavigationProps> = ({
  selectedFolder,
  onFolderSelect,
  onComposeClick
}) => {
  const folders: { key: EmailFolder; label: string; icon: React.ReactNode }[] = [
    { key: 'inbox', label: 'Inbox', icon: <Inbox className="h-4 w-4" /> },
    { key: 'sent', label: 'Sent', icon: <Send className="h-4 w-4" /> },
    { key: 'drafts', label: 'Drafts', icon: <FileText className="h-4 w-4" /> },
    { key: 'archive', label: 'Archive', icon: <Archive className="h-4 w-4" /> },
    { key: 'trash', label: 'Trash', icon: <Trash className="h-4 w-4" /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      {/* Compose Button */}
      <Button 
        onClick={onComposeClick}
        className="w-full mb-6"
        size="lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        Compose
      </Button>

      {/* Folder List */}
      <div className="space-y-2">
        {folders.map((folder) => {
          const unreadCount = getUnreadCount(folder.key);
          const isSelected = selectedFolder === folder.key;
          
          return (
            <Button
              key={folder.key}
              variant={isSelected ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isSelected ? 'bg-blue-100 text-blue-900' : ''
              }`}
              onClick={() => onFolderSelect(folder.key)}
            >
              <div className="flex items-center w-full">
                <span className="mr-3">{folder.icon}</span>
                <span className="flex-1 text-left">{folder.label}</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Labels Section */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Labels</h3>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sm">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
            Important
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
            Work
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
            Personal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FolderNavigation; 