import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import EmailPage from '@/pages/globals/mails';

interface MailDrawerProps {
  unreadCount?: number;
}

export const MailDrawer: React.FC<MailDrawerProps> = ({ unreadCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9"
        >
          <Mail className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs border-2 border-background"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen max-h-none inset-0 w-full sm:w-full sm:max-w-none">
        <div className="relative h-full">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Mail Content */}
          <div className="h-full">
            <EmailPage />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}; 