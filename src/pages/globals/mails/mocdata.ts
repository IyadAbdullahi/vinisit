import type { Email, EmailParticipant, EmailAttachment, EmailFolder, EmailStatus, EmailPriority, ProcessingStatus, SyncStatus } from './types';

// Helper function to create email participants
const createParticipant = (email: string, name?: string): EmailParticipant => ({
  email,
  name
});

// Helper function to create attachments
const createAttachment = (filename: string, contentType = 'application/pdf', size = 1024): EmailAttachment => ({
  filename,
  contentType,
  size,
  disposition: 'attachment',
  contentId: undefined,
  url: undefined
});

export const emails: Email[] = [
  {
    id: '1',
    messageId: '<msg-001@company.com>',
    threadId: 'thread-001',
    subject: 'Meeting Reminder - Project Kickoff',
    from: createParticipant('john.doe@example.com', 'John Doe'),
    to: [
      createParticipant('jane.smith@example.com', 'Jane Smith'),
      createParticipant('mike.wilson@example.com', 'Mike Wilson')
    ],
    cc: [createParticipant('hr@company.com', 'HR Department')],
    bcc: [],
    attachments: [
      createAttachment('project-brief.pdf', 'application/pdf', 2048),
      createAttachment('meeting-agenda.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 1024)
    ],
    hasAttachments: true,
    textBody: 'Hi team,\n\nDon\'t forget about the project kickoff meeting tomorrow at 3 PM. We need to discuss the project timeline, resource allocation, and key milestones.\n\nPlease review the attached project brief and meeting agenda before the meeting.\n\nLooking forward to seeing everyone there!\n\nBest regards,\nJohn',
    htmlBody: '<div><p>Hi team,</p><p>Don\'t forget about the <strong>project kickoff meeting</strong> tomorrow at <em>3 PM</em>. We need to discuss:</p><ul><li>Project timeline</li><li>Resource allocation</li><li>Key milestones</li></ul><p>Please review the attached project brief and meeting agenda before the meeting.</p><p>Looking forward to seeing everyone there!</p><p>Best regards,<br/>John</p></div>',
    snippet: 'Don\'t forget about the project kickoff meeting tomorrow at 3 PM. We need to discuss the project timeline...',
    date: new Date('2024-01-15T10:00:00Z'),
    receivedDate: new Date('2024-01-15T10:01:00Z'),
    status: 'unread' as EmailStatus,
    isStarred: true,
    isImportant: true,
    labels: ['meeting', 'project'],
    priority: 'high' as EmailPriority,
    folder: 'inbox' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-15T10:01:00Z'),
    updatedAt: new Date('2024-01-15T10:01:00Z')
  },
  {
    id: '2',
    messageId: '<msg-002@company.com>',
    threadId: 'thread-002',
    subject: 'Project Update - Phase 1 Complete',
    from: createParticipant('jane.smith@example.com', 'Jane Smith'),
    to: [createParticipant('john.doe@example.com', 'John Doe')],
    cc: [createParticipant('project-manager@company.com', 'Project Manager')],
    bcc: [],
    attachments: [createAttachment('phase1-report.pdf', 'application/pdf', 3072)],
    hasAttachments: true,
    textBody: 'Hi John,\n\nThe project is on schedule and we have successfully completed Phase 1. All deliverables have been met and the client is satisfied with the progress.\n\nKey achievements:\n- Completed all design requirements\n- Implemented core functionality\n- Conducted initial testing\n\nWe are on track to complete the entire project by the end of the quarter.\n\nBest regards,\nJane',
    htmlBody: '<div><p>Hi John,</p><p>The project is <span style="color: green; font-weight: bold;">on schedule</span> and we have successfully completed <strong>Phase 1</strong>. All deliverables have been met and the client is satisfied with the progress.</p><h3>Key achievements:</h3><ul><li>Completed all design requirements</li><li>Implemented core functionality</li><li>Conducted initial testing</li></ul><p>We are on track to complete the entire project by the end of the quarter.</p><p>Best regards,<br/><em>Jane</em></p></div>',
    snippet: 'The project is on schedule and we have successfully completed Phase 1. All deliverables have been met...',
    date: new Date('2024-01-14T14:30:00Z'),
    receivedDate: new Date('2024-01-14T14:31:00Z'),
    status: 'read' as EmailStatus,
    isStarred: false,
    isImportant: false,
    labels: ['project', 'update'],
    priority: 'normal' as EmailPriority,
    folder: 'inbox' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-14T14:31:00Z'),
    updatedAt: new Date('2024-01-14T14:31:00Z')
  },
  {
    id: '3',
    messageId: '<msg-003@company.com>',
    threadId: 'thread-003',
    subject: 'Budget Approval Request',
    from: createParticipant('finance@company.com', 'Finance Team'),
    to: [createParticipant('john.doe@example.com', 'John Doe')],
    cc: [createParticipant('ceo@company.com', 'CEO')],
    bcc: [],
    attachments: [createAttachment('budget-proposal.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 4096)],
    hasAttachments: true,
    textBody: 'Dear John,\n\nPlease review the attached budget proposal for Q1 2024. We need your approval to proceed with the new equipment purchases and team expansion.\n\nThe total budget request is $150,000, which includes:\n- New development tools: $25,000\n- Team training: $15,000\n- Equipment upgrades: $110,000\n\nPlease let us know if you have any questions or need additional information.\n\nRegards,\nFinance Team',
    snippet: 'Please review the attached budget proposal for Q1 2024. We need your approval to proceed...',
    date: new Date('2024-01-13T09:15:00Z'),
    receivedDate: new Date('2024-01-13T09:16:00Z'),
    status: 'unread' as EmailStatus,
    isStarred: false,
    isImportant: true,
    labels: ['budget', 'approval'],
    priority: 'high' as EmailPriority,
    folder: 'inbox' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-13T09:16:00Z'),
    updatedAt: new Date('2024-01-13T09:16:00Z')
  },
  {
    id: '4',
    messageId: '<msg-004@company.com>',
    threadId: 'thread-004',
    subject: 'Weekly Team Status Report',
    from: createParticipant('john.doe@example.com', 'John Doe'),
    to: [createParticipant('team@company.com', 'Development Team')],
    cc: [createParticipant('manager@company.com', 'Manager')],
    bcc: [],
    attachments: [createAttachment('weekly-report.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 2048)],
    hasAttachments: true,
    textBody: 'Team,\n\nHere\'s our weekly status report:\n\nCompleted this week:\n- Fixed critical bugs in the main application\n- Completed user interface improvements\n- Conducted code reviews\n\nNext week\'s priorities:\n- Implement new feature requests\n- Performance optimization\n- Documentation updates\n\nGreat work everyone!\n\nJohn',
    snippet: 'Here\'s our weekly status report: Completed this week: Fixed critical bugs in the main application...',
    date: new Date('2024-01-12T16:45:00Z'),
    receivedDate: new Date('2024-01-12T16:45:00Z'),
    status: 'sent' as EmailStatus,
    isStarred: false,
    isImportant: false,
    labels: ['weekly-report', 'team'],
    priority: 'normal' as EmailPriority,
    folder: 'sent' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-12T16:45:00Z'),
    updatedAt: new Date('2024-01-12T16:45:00Z')
  },
  {
    id: '5',
    messageId: '<msg-005@company.com>',
    threadId: 'thread-005',
    subject: 'Client Meeting Follow-up',
    from: createParticipant('john.doe@example.com', 'John Doe'),
    to: [createParticipant('client@example.com', 'Client')],
    cc: [createParticipant('jane.smith@example.com', 'Jane Smith')],
    bcc: [],
    attachments: [
      createAttachment('meeting-notes.pdf', 'application/pdf', 1536),
      createAttachment('proposal-draft.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 2560)
    ],
    hasAttachments: true,
    textBody: 'Dear Client,\n\nThank you for the productive meeting yesterday. As discussed, I\'ve attached the meeting notes and a draft proposal for your review.\n\nKey points from our discussion:\n- Project scope and timeline\n- Budget considerations\n- Technical requirements\n\nPlease review the documents and let me know if you need any modifications.\n\nLooking forward to your feedback.\n\nBest regards,\nJohn',
    snippet: 'Thank you for the productive meeting yesterday. As discussed, I\'ve attached the meeting notes...',
    date: new Date('2024-01-11T11:20:00Z'),
    receivedDate: new Date('2024-01-11T11:20:00Z'),
    status: 'sent' as EmailStatus,
    isStarred: false,
    isImportant: false,
    labels: ['client', 'meeting'],
    priority: 'normal' as EmailPriority,
    folder: 'sent' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-11T11:20:00Z'),
    updatedAt: new Date('2024-01-11T11:20:00Z')
  },
  {
    id: '6',
    messageId: '<msg-006@company.com>',
    threadId: 'thread-006',
    subject: 'Draft: New Feature Proposal',
    from: createParticipant('john.doe@example.com', 'John Doe'),
    to: [createParticipant('product-manager@company.com', 'Product Manager')],
    cc: [createParticipant('tech-lead@company.com', 'Tech Lead')],
    bcc: [],
    attachments: [createAttachment('feature-spec.pdf', 'application/pdf', 1024)],
    hasAttachments: true,
    textBody: 'Hi Product Manager,\n\nI\'ve been working on a proposal for a new feature that could significantly improve our user experience. The feature would include:\n\n- Advanced search functionality\n- Real-time notifications\n- Enhanced reporting tools\n\nI\'m still working on the technical specifications and cost estimates. I\'ll send the complete proposal once I have all the details.\n\nLet me know if you\'d like to discuss this further.\n\nRegards,\nJohn',
    snippet: 'I\'ve been working on a proposal for a new feature that could significantly improve our user experience...',
    date: new Date('2024-01-10T15:30:00Z'),
    receivedDate: new Date('2024-01-10T15:30:00Z'),
    status: 'draft' as EmailStatus,
    isStarred: false,
    isImportant: false,
    labels: ['draft', 'feature'],
    priority: 'normal' as EmailPriority,
    folder: 'drafts' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: true,
    draftData: {
      lastEditedAt: new Date('2024-01-10T15:30:00Z'),
      autoSaveVersion: 3
    },
    isEncrypted: false,
    processingStatus: 'pending' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-10T15:30:00Z'),
    updatedAt: new Date('2024-01-10T15:30:00Z')
  },
  {
    id: '7',
    messageId: '<msg-007@company.com>',
    threadId: 'thread-007',
    subject: 'System Maintenance Notice',
    from: createParticipant('it-support@company.com', 'IT Support'),
    to: [createParticipant('all-employees@company.com', 'All Employees')],
    cc: [],
    bcc: [],
    replyTo: createParticipant('support@company.com', 'Support'),
    attachments: [],
    hasAttachments: false,
    textBody: 'Dear All,\n\nWe will be performing scheduled system maintenance on Saturday, January 20th, from 2:00 AM to 6:00 AM EST.\n\nDuring this time, the following services may be temporarily unavailable:\n- Email system\n- File sharing\n- Internal applications\n\nWe apologize for any inconvenience this may cause. Please plan accordingly.\n\nIf you have any urgent matters that require immediate attention, please contact the IT support team.\n\nThank you for your understanding.\n\nIT Support Team',
    snippet: 'We will be performing scheduled system maintenance on Saturday, January 20th, from 2:00 AM to 6:00 AM EST...',
    date: new Date('2024-01-09T08:00:00Z'),
    receivedDate: new Date('2024-01-09T08:01:00Z'),
    status: 'read' as EmailStatus,
    isStarred: false,
    isImportant: false,
    labels: ['maintenance', 'notice'],
    priority: 'normal' as EmailPriority,
    folder: 'inbox' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-09T08:01:00Z'),
    updatedAt: new Date('2024-01-09T08:01:00Z')
  },
  {
    id: '8',
    messageId: '<msg-008@company.com>',
    threadId: 'thread-008',
    subject: 'Holiday Schedule Update',
    from: createParticipant('hr@company.com', 'HR Team'),
    to: [createParticipant('all-employees@company.com', 'All Employees')],
    cc: [],
    bcc: [],
    attachments: [createAttachment('holiday-calendar-2024.pdf', 'application/pdf', 512)],
    hasAttachments: true,
    textBody: 'Hello Everyone,\n\nPlease find attached the updated holiday calendar for 2024. We\'ve added a few additional company holidays and updated some dates based on feedback.\n\nKey changes:\n- Added Juneteenth as a company holiday\n- Moved some floating holidays\n- Updated office closure dates\n\nPlease review the calendar and update your personal schedules accordingly.\n\nIf you have any questions, please contact HR.\n\nBest regards,\nHR Team',
    snippet: 'Please find attached the updated holiday calendar for 2024. We\'ve added a few additional company holidays...',
    date: new Date('2024-01-08T10:30:00Z'),
    receivedDate: new Date('2024-01-08T10:31:00Z'),
    status: 'read' as EmailStatus,
    isStarred: true,
    isImportant: false,
    labels: ['holiday', 'schedule'],
    priority: 'normal' as EmailPriority,
    folder: 'inbox' as EmailFolder,
    userId: 'user-001',
    accountId: 'account-001',
    isDraft: false,
    isEncrypted: false,
    processingStatus: 'processed' as ProcessingStatus,
    syncStatus: 'synced' as SyncStatus,
    isDeleted: false,
    createdAt: new Date('2024-01-08T10:31:00Z'),
    updatedAt: new Date('2024-01-08T10:31:00Z')
  }
];

// Utility functions for email operations
export const getEmailsByFolder = (folder: EmailFolder): Email[] => {
  return emails.filter(email => email.folder === folder && !email.isDeleted);
};

export const getUnreadCount = (folder: EmailFolder): number => {
  return emails.filter(email => 
    email.folder === folder && 
    email.status === 'unread' && 
    !email.isDeleted
  ).length;
};

export const getEmailById = (id: string): Email | undefined => {
  return emails.find(email => email.id === id);
};

export const searchEmails = (query: string, folder?: EmailFolder): Email[] => {
  const searchTerm = query.toLowerCase();
  return emails.filter(email => {
    if (folder && email.folder !== folder) return false;
    if (email.isDeleted) return false;
    
    const matchesSubject = email.subject.toLowerCase().includes(searchTerm);
    const matchesFrom = email.from.email.toLowerCase().includes(searchTerm) || 
                        (email.from.name && email.from.name.toLowerCase().includes(searchTerm));
    const matchesContent = email.textBody?.toLowerCase().includes(searchTerm) || 
                          email.snippet?.toLowerCase().includes(searchTerm);
    const matchesTo = email.to.some(recipient => 
      recipient.email.toLowerCase().includes(searchTerm) ||
      (recipient.name && recipient.name.toLowerCase().includes(searchTerm))
    );
    
    return matchesSubject || matchesFrom || matchesContent || matchesTo;
  });
};

export const getEmailThread = (threadId: string): Email[] => {
  return emails.filter(email => email.threadId === threadId).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const formatEmailSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};


