import { useQuery } from '@tanstack/react-query';
import type { Email, EmailFolder } from '../types';

// Simulate API calls by importing JSON data
import inboxData from '../data/inbox.json';
import sentData from '../data/sent.json';
import draftsData from '../data/drafts.json';
import archiveData from '../data/archive.json';
import trashData from '../data/trash.json';

// Helper function to convert JSON dates to Date objects
const parseEmailDates = (email: any): Email => ({
  ...email,
  date: new Date(email.date),
  receivedDate: new Date(email.receivedDate),
  createdAt: new Date(email.createdAt),
  updatedAt: new Date(email.updatedAt),
  ...(email.deletedAt && { deletedAt: new Date(email.deletedAt) }),
  ...(email.draftData?.lastEditedAt && { 
    draftData: { 
      ...email.draftData, 
      lastEditedAt: new Date(email.draftData.lastEditedAt) 
    } 
  })
});

// Mock API functions
const fetchEmailsByFolder = async (folder: EmailFolder): Promise<Email[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let data: any[] = [];
  
  switch (folder) {
    case 'inbox':
      data = inboxData;
      break;
    case 'sent':
      data = sentData;
      break;
    case 'drafts':
      data = draftsData;
      break;
    case 'archive':
      data = archiveData;
      break;
    case 'trash':
      data = trashData;
      break;
    default:
      data = inboxData;
  }
  
  return data.map(parseEmailDates);
};

const fetchEmailById = async (id: string): Promise<Email | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Search through all folders
  const allEmails = [
    ...inboxData,
    ...sentData,
    ...draftsData,
    ...archiveData,
    ...trashData
  ];
  
  const email = allEmails.find(e => e.id === id);
  return email ? parseEmailDates(email) : null;
};

const searchEmails = async (query: string, folder?: EmailFolder): Promise<Email[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let data: any[] = [];
  
  if (folder) {
    switch (folder) {
      case 'inbox':
        data = inboxData;
        break;
      case 'sent':
        data = sentData;
        break;
      case 'drafts':
        data = draftsData;
        break;
      case 'archive':
        data = archiveData;
        break;
      case 'trash':
        data = trashData;
        break;
      default:
        data = inboxData;
    }
  } else {
    data = [
      ...inboxData,
      ...sentData,
      ...draftsData,
      ...archiveData,
      ...trashData
    ];
  }
  
  const searchTerm = query.toLowerCase();
  const filteredData = data.filter(email => {
    const matchesSubject = email.subject.toLowerCase().includes(searchTerm);
    const matchesFrom = email.from.email.toLowerCase().includes(searchTerm) || 
                        (email.from.name && email.from.name.toLowerCase().includes(searchTerm));
    const matchesContent = email.textBody?.toLowerCase().includes(searchTerm) || 
                          email.snippet?.toLowerCase().includes(searchTerm);
    const matchesTo = email.to.some((recipient: any) => 
      recipient.email.toLowerCase().includes(searchTerm) ||
      (recipient.name && recipient.name.toLowerCase().includes(searchTerm))
    );
    
    return matchesSubject || matchesFrom || matchesContent || matchesTo;
  });
  
  return filteredData.map(parseEmailDates);
};

// React Query hooks
export const useEmailsByFolder = (folder: EmailFolder) => {
  return useQuery({
    queryKey: ['emails', folder],
    queryFn: () => fetchEmailsByFolder(folder),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useEmailById = (id: string) => {
  return useQuery({
    queryKey: ['email', id],
    queryFn: () => fetchEmailById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchEmails = (query: string, folder?: EmailFolder) => {
  return useQuery({
    queryKey: ['search', query, folder],
    queryFn: () => searchEmails(query, folder),
    enabled: !!query,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Utility functions
export const getUnreadCount = (folder: EmailFolder): number => {
  let data: any[] = [];
  
  switch (folder) {
    case 'inbox':
      data = inboxData;
      break;
    case 'sent':
      data = sentData;
      break;
    case 'drafts':
      data = draftsData;
      break;
    case 'archive':
      data = archiveData;
      break;
    case 'trash':
      data = trashData;
      break;
    default:
      data = inboxData;
  }
  
  return data.filter(email => email.status === 'unread').length;
};

export const formatEmailSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 