import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  History,
  Share,
  Lock,
  Unlock,
  FolderOpen,
  File,
  Image,
  Video,
  Archive
} from 'lucide-react';

interface ProjectDocument {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'other';
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  version: number;
  status: 'draft' | 'review' | 'approved' | 'archived';
  category: 'contract' | 'design' | 'specification' | 'report' | 'other';
  isLocked: boolean;
  tags: string[];
  description?: string;
  url?: string;
}

interface DocumentRepositoryProps {
  projectId: string;
  projectName: string;
  onDocumentUpload?: (file: File, metadata: any) => void;
  onDocumentUpdate?: (document: ProjectDocument) => void;
  onDocumentDelete?: (documentId: string) => void;
}

export const DocumentRepository: React.FC<DocumentRepositoryProps> = ({
  projectId,
  projectName,
  onDocumentUpload,
  onDocumentUpdate,
  onDocumentDelete
}) => {
  const [documents, setDocuments] = useState<ProjectDocument[]>([
    {
      id: 'DOC001',
      name: 'Project Specifications.pdf',
      type: 'document',
      size: 2048000,
      uploadedBy: 'John Doe',
      uploadedAt: '2024-01-15T10:30:00Z',
      lastModified: '2024-01-20T14:15:00Z',
      version: 2,
      status: 'approved',
      category: 'specification',
      isLocked: false,
      tags: ['specs', 'requirements'],
      description: 'Technical specifications for the project'
    },
    {
      id: 'DOC002',
      name: 'Site Plans.dwg',
      type: 'document',
      size: 5120000,
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-01-18T09:00:00Z',
      lastModified: '2024-01-22T16:30:00Z',
      version: 3,
      status: 'review',
      category: 'design',
      isLocked: true,
      tags: ['design', 'plans'],
      description: 'Architectural site plans and layouts'
    },
    {
      id: 'DOC003',
      name: 'Progress Report Jan.docx',
      type: 'document',
      size: 1024000,
      uploadedBy: 'Mike Wilson',
      uploadedAt: '2024-01-25T11:45:00Z',
      lastModified: '2024-01-25T11:45:00Z',
      version: 1,
      status: 'draft',
      category: 'report',
      isLocked: false,
      tags: ['progress', 'monthly'],
      description: 'Monthly progress report for January'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ProjectDocument | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'archive': return <Archive className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'design': return 'bg-blue-100 text-blue-800';
      case 'specification': return 'bg-orange-100 text-orange-800';
      case 'report': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDocumentView = (document: ProjectDocument) => {
    setSelectedDocument(document);
    setIsDetailDialogOpen(true);
  };

  const handleDocumentLock = (documentId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === documentId 
          ? { ...doc, isLocked: !doc.isLocked }
          : doc
      )
    );
  };

  const documentStats = {
    total: documents.length,
    approved: documents.filter(d => d.status === 'approved').length,
    inReview: documents.filter(d => d.status === 'review').length,
    draft: documents.filter(d => d.status === 'draft').length,
    totalSize: documents.reduce((sum, d) => sum + d.size, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Repository</h2>
          <p className="text-muted-foreground">{projectName} - Project Documents</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Upload a new document to the project repository with version control.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <Button variant="outline">
                  Choose Files
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="specification">Specification</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)}>
                  Upload Document
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{documentStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Documents</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{documentStats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{documentStats.inReview}</div>
              <div className="text-sm text-muted-foreground">In Review</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{documentStats.draft}</div>
              <div className="text-sm text-muted-foreground">Draft</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatFileSize(documentStats.totalSize)}</div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="specification">Specification</SelectItem>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded">
                        {getFileIcon(document.type)}
                      </div>
                      <div>
                        <div className="font-medium flex items-center space-x-2">
                          <span>{document.name}</span>
                          {document.isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                        </div>
                        {document.description && (
                          <div className="text-sm text-muted-foreground">{document.description}</div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {document.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(document.category)}>
                      {document.category}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(document.status)}>
                      {document.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">v{document.version}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <History className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {getInitials(document.uploadedBy)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{document.uploadedBy}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">{formatDate(document.lastModified)}</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">{formatFileSize(document.size)}</div>
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDocumentView(document)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="h-4 w-4 mr-2" />
                          Version History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDocumentLock(document.id)}>
                          {document.isLocked ? (
                            <>
                              <Unlock className="h-4 w-4 mr-2" />
                              Unlock
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Lock
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Metadata
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Document Details</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                  {getFileIcon(selectedDocument.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedDocument.name}</h3>
                  <p className="text-muted-foreground">{selectedDocument.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(selectedDocument.status)}>
                      {selectedDocument.status}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(selectedDocument.category)}>
                      {selectedDocument.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">v{selectedDocument.version}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">File Size</label>
                  <div>{formatFileSize(selectedDocument.size)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Uploaded By</label>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {getInitials(selectedDocument.uploadedBy)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedDocument.uploadedBy}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Upload Date</label>
                  <div>{formatDate(selectedDocument.uploadedAt)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Modified</label>
                  <div>{formatDate(selectedDocument.lastModified)}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Tags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDocument.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};