import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Star, 
  StarOff, 
  Paperclip, 
  Search, 
  RefreshCw,
  Mail,
  MailOpen,
  FileText,
  Archive,
  Trash,
  Send,
  Clock
} from 'lucide-react';
import { useEmailsByFolder, useSearchEmails } from '../api/emailService';
import type { Email, EmailFolder } from '../types';

interface EmailListProps {
  selectedFolder: EmailFolder;
  onEmailSelect: (email: Email) => void;
  selectedEmailId?: string;
}

const EmailList: React.FC<EmailListProps> = ({ 
  selectedFolder, 
  onEmailSelect, 
  selectedEmailId 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Use TanStack Query to fetch emails
  const { 
    data: emails = [], 
    isLoading, 
    error, 
    refetch 
  } = useEmailsByFolder(selectedFolder);

  // Use TanStack Query for search
  const { 
    data: searchResults = [], 
    isLoading: isSearchLoading 
  } = useSearchEmails(searchQuery, isSearching ? selectedFolder : undefined);

  const displayEmails = isSearching ? searchResults : emails;
  const isLoadingData = isLoading || (isSearching && isSearchLoading);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getInitials = (email: string, name?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getFolderIcon = (folder: EmailFolder) => {
    switch (folder) {
      case 'inbox':
        return <Mail className="h-4 w-4" />;
      case 'sent':
        return <Send className="h-4 w-4" />;
      case 'drafts':
        return <FileText className="h-4 w-4" />;
      case 'archive':
        return <Archive className="h-4 w-4" />;
      case 'trash':
        return <Trash className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading emails: {error.message}</p>
            <Button onClick={() => refetch()} className="mt-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Email List */}
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isLoadingData ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading emails...</p>
            </div>
          ) : displayEmails.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <div className="flex flex-col items-center">
                {getFolderIcon(selectedFolder)}
                <p className="mt-2">
                  {isSearching 
                    ? 'No emails found matching your search'
                    : `No emails in ${selectedFolder}`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div>
              {displayEmails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedEmailId === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  } ${email.status === 'unread' ? 'font-semibold bg-blue-50' : ''}`}
                  onClick={() => onEmailSelect(email)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(email.from.email, email.from.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Email Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium truncate">
                            {email.from.name || email.from.email}
                          </span>
                          {email.isStarred && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                          {email.isImportant && (
                            <Badge variant="destructive" className="text-xs">
                              Important
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span className={getPriorityColor(email.priority)}>
                            {email.priority}
                          </span>
                          <span>{formatDate(email.date)}</span>
                        </div>
                      </div>

                      <div className="mt-1">
                        <p className="text-sm font-medium truncate">
                          {email.subject}
                        </p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {email.snippet}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          {email.hasAttachments && (
                            <Paperclip className="h-4 w-4 text-gray-400" />
                          )}
                          {email.isDraft && (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                                                     {email.isDraft && (
                             <Badge variant="secondary" className="text-xs">
                               Draft
                             </Badge>
                           )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {email.labels.slice(0, 2).map((label) => (
                            <Badge key={label} variant="outline" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                          {email.labels.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{email.labels.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {isSearching 
                ? `${searchResults.length} search results`
                : `${emails.length} emails in ${selectedFolder}`
              }
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailList; 