import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Send, 
  Paperclip, 
  X,
  File,
  Image,
  Video,
  Music,
  FileText as FileTextIcon
} from 'lucide-react';
import FolderNavigation from './components/FolderNavigation';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import type { Email, EmailFolder, EmailPriority, EmailAttachment } from './types';

interface FileWithPreview extends File {
  preview?: string;
}

interface ComposeEmailData {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  content: string;
  priority: EmailPriority;
  attachments: EmailAttachment[];
}

const EmailPage: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<EmailFolder>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState<ComposeEmailData>({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    priority: 'normal',
    attachments: []
  });
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleFolderSelect = (folder: EmailFolder) => {
    setSelectedFolder(folder);
    setSelectedEmail(null);
  };

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleComposeSubmit = () => {
    // Handle compose email submission
    console.log('Compose email:', composeData);
    setIsComposeOpen(false);
    resetComposeData();
  };

  const resetComposeData = () => {
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      content: '',
      priority: 'normal',
      attachments: []
    });
    setSelectedFiles([]);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const filesWithPreview = files.map(file => ({
      ...file,
      preview: URL.createObjectURL(file)
    }));
    setSelectedFiles(prev => [...prev, ...filesWithPreview]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const getFileIcon = (file: File) => {
    const type = file.type.split('/')[0];
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      default:
        return <FileTextIcon className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleReply = (email: Email) => {
    setComposeData({
      to: email.from.email,
      cc: '',
      bcc: '',
      subject: `Re: ${email.subject}`,
      content: `\n\n--- Original Message ---\nFrom: ${email.from.name || email.from.email}\nDate: ${email.date.toLocaleString()}\nSubject: ${email.subject}\n\n${email.textBody || ''}`,
      priority: 'normal',
      attachments: []
    });
    setIsComposeOpen(true);
  };

  const handleForward = (email: Email) => {
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: `Fwd: ${email.subject}`,
      content: `\n\n--- Forwarded Message ---\nFrom: ${email.from.name || email.from.email}\nDate: ${email.date.toLocaleString()}\nSubject: ${email.subject}\n\n${email.textBody || ''}`,
      priority: 'normal',
      attachments: []
    });
    setIsComposeOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Folder Navigation */}
      <FolderNavigation
        selectedFolder={selectedFolder}
        onFolderSelect={handleFolderSelect}
        onComposeClick={handleComposeClick}
      />

      {/* Email List */}
      <div className="flex-1 flex">
        <div className={`${selectedEmail ? 'w-1/3' : 'w-full'} border-r border-gray-200`}>
          <EmailList
            selectedFolder={selectedFolder}
            onEmailSelect={handleEmailSelect}
            selectedEmailId={selectedEmail?.id}
          />
        </div>

        {/* Email Detail */}
        {selectedEmail && (
          <div className="w-2/3">
            <EmailDetail
              emailId={selectedEmail.id}
              onBack={handleBackToList}
              onReply={handleReply}
              onForward={handleForward}
            />
          </div>
        )}
      </div>

      {/* Compose Email Dialog */}
      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compose Email</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* To Field */}
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                value={composeData.to}
                onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                placeholder="recipient@example.com"
              />
            </div>

            {/* CC Field */}
            <div>
              <Label htmlFor="cc">CC</Label>
              <Input
                id="cc"
                value={composeData.cc}
                onChange={(e) => setComposeData(prev => ({ ...prev, cc: e.target.value }))}
                placeholder="cc@example.com"
              />
            </div>

            {/* BCC Field */}
            <div>
              <Label htmlFor="bcc">BCC</Label>
              <Input
                id="bcc"
                value={composeData.bcc}
                onChange={(e) => setComposeData(prev => ({ ...prev, bcc: e.target.value }))}
                placeholder="bcc@example.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={composeData.subject}
                onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Email subject"
              />
            </div>

            {/* Priority Field */}
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={composeData.priority}
                onValueChange={(value: EmailPriority) => 
                  setComposeData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attachments */}
            <div>
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-center">
                    <Paperclip className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to attach files or drag and drop
                    </p>
                  </div>
                </label>
              </div>
              
              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file)}
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content Field */}
            <div>
              <Label htmlFor="content">Message</Label>
              <Textarea
                id="content"
                value={composeData.content}
                onChange={(e) => setComposeData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your message here..."
                rows={10}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleComposeSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailPage;
