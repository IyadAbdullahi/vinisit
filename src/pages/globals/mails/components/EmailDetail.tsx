import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Reply, 
  Forward, 
  Trash2, 
  Archive, 
  Star, 
  StarOff,
  Paperclip,
  Download,
  ArrowLeft,
  MoreHorizontal
} from 'lucide-react';
import { useEmailById } from '../api/emailService';
import type { Email } from '../types';

interface EmailDetailProps {
  emailId?: string;
  onBack: () => void;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({
  emailId,
  onBack,
  onReply,
  onForward
}) => {
  const { data: email, isLoading, error } = useEmailById(emailId || '');

  if (!emailId) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <p>Select an email to view its details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading email...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !email) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading email: {error?.message || 'Email not found'}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (email: string, name?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onReply(email)}>
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onForward(email)}>
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          {/* Email Header */}
          <div className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {getInitials(email.from.email, email.from.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{email.subject}</h2>
                    <p className="text-sm text-gray-600">
                      From: {email.from.name} &lt;{email.from.email}&gt;
                    </p>
                    <p className="text-sm text-gray-600">
                      To: {email.to.map(recipient => 
                        `${recipient.name || recipient.email}`
                      ).join(', ')}
                    </p>
                    {email.cc.length > 0 && (
                      <p className="text-sm text-gray-600">
                        CC: {email.cc.map(recipient => 
                          `${recipient.name || recipient.email}`
                        ).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {email.isStarred ? (
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    ) : (
                      <StarOff className="h-5 w-5 text-gray-400" />
                    )}
                    <Badge variant={email.priority === 'high' ? 'destructive' : 'secondary'}>
                      {email.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formatDate(email.date)}
                </p>
              </div>
            </div>

            {/* Labels */}
            {email.labels.length > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                {email.labels.map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator className="mb-6" />

          {/* Attachments */}
          {email.hasAttachments && email.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Attachments</h3>
              <div className="space-y-2">
                {email.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Paperclip className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{attachment.filename}</p>
                        <p className="text-xs text-gray-500">
                          {attachment.contentType} • {formatFileSize(attachment.size)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Body */}
          <div className="prose max-w-none">
            {email.htmlBody ? (
              <div 
                dangerouslySetInnerHTML={{ __html: email.htmlBody }}
                className="text-sm leading-relaxed"
              />
            ) : (
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {email.textBody}
              </div>
            )}
          </div>

          {/* Email Footer */}
          {email.signature && (
            <div className="mt-6 pt-6 border-t">
              <div 
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: email.signature }}
              />
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmailDetail; 