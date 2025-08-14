import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  Plus, 
  Search, 
  UserPlus,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Award,
  Briefcase,
  Settings,
  Eye,
  Edit
} from 'lucide-react';
import type { Employee, Project, Task } from '@/types';

interface TeamMember extends Employee {
  skills: string[];
  availability: number; // percentage
  currentProjects: string[];
  performanceScore: number;
  workload: number; // hours per week
  efficiency: number; // percentage
  lastAssignment?: string;
  certifications: string[];
}

interface TeamAssignment {
  id: string;
  employeeId: string;
  projectId: string;
  role: string;
  startDate: string;
  endDate?: string;
  allocation: number; // percentage of time
  status: 'active' | 'completed' | 'on_hold';
  responsibilities: string[];
}

interface TeamAssignmentProps {
  project: Project;
  onAssignmentUpdate?: (assignment: TeamAssignment) => void;
  onMemberAssign?: (employeeId: string, projectId: string, role: string) => void;
}

export const TeamAssignment: React.FC<TeamAssignmentProps> = ({
  project,
  onAssignmentUpdate,
  onMemberAssign
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'EMP001',
      userId: 'user1',
      employeeNumber: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+234-803-123-4567',
      departmentId: '2',
      unitId: 'unit1',
      position: 'Senior Engineer',
      hireDate: '2022-03-15',
      salary: 120000,
      status: 'active',
      skills: ['Project Management', 'AutoCAD', 'Structural Design', 'Team Leadership'],
      availability: 75,
      currentProjects: ['PRJ001', 'PRJ003'],
      performanceScore: 92,
      workload: 40,
      efficiency: 88,
      lastAssignment: '2024-01-15',
      certifications: ['PMP', 'COREN', 'Safety Training']
    },
    {
      id: 'EMP002',
      userId: 'user2',
      employeeNumber: 'EMP002',
      firstName: 'Fatima',
      lastName: 'Ibrahim',
      email: 'fatima.ibrahim@company.com',
      phone: '+234-806-987-6543',
      departmentId: '2',
      unitId: 'unit1',
      position: 'Civil Engineer',
      hireDate: '2023-01-20',
      salary: 95000,
      status: 'active',
      skills: ['Civil Engineering', 'Site Supervision', 'Quality Control', 'CAD'],
      availability: 90,
      currentProjects: ['PRJ002'],
      performanceScore: 87,
      workload: 35,
      efficiency: 91,
      lastAssignment: '2024-01-10',
      certifications: ['COREN', 'Quality Management', 'HSE Level 1']
    },
    {
      id: 'EMP003',
      userId: 'user3',
      employeeNumber: 'EMP003',
      firstName: 'Ahmed',
      lastName: 'Suleiman',
      email: 'ahmed.suleiman@company.com',
      phone: '+234-802-555-7890',
      departmentId: '2',
      unitId: 'unit2',
      position: 'Electrical Engineer',
      hireDate: '2021-08-10',
      salary: 85000,
      status: 'active',
      skills: ['Electrical Systems', 'Solar Installation', 'Power Systems', 'Troubleshooting'],
      availability: 60,
      currentProjects: ['PRJ001', 'PRJ002', 'PRJ004'],
      performanceScore: 94,
      workload: 45,
      efficiency: 85,
      lastAssignment: '2024-01-05',
      certifications: ['Electrical License', 'Solar Certification', 'Safety Training']
    },
    {
      id: 'EMP004',
      userId: 'user4',
      employeeNumber: 'EMP004',
      firstName: 'Khadija',
      lastName: 'Abdullahi',
      email: 'khadija.abdullahi@company.com',
      phone: '+234-805-444-3210',
      departmentId: '2',
      unitId: 'unit1',
      position: 'Junior Engineer',
      hireDate: '2023-06-01',
      salary: 65000,
      status: 'active',
      skills: ['Technical Drawing', 'Site Survey', 'Documentation', 'Basic CAD'],
      availability: 95,
      currentProjects: ['PRJ003'],
      performanceScore: 78,
      workload: 30,
      efficiency: 82,
      lastAssignment: '2024-01-20',
      certifications: ['Engineering Intern', 'Safety Training']
    }
  ]);

  const [assignments, setAssignments] = useState<TeamAssignment[]>([
    {
      id: 'ASSIGN001',
      employeeId: 'EMP001',
      projectId: project.id,
      role: 'Project Lead',
      startDate: '2024-01-15',
      allocation: 60,
      status: 'active',
      responsibilities: ['Overall project coordination', 'Client communication', 'Team management']
    },
    {
      id: 'ASSIGN002',
      employeeId: 'EMP002',
      projectId: project.id,
      role: 'Site Engineer',
      startDate: '2024-01-20',
      allocation: 80,
      status: 'active',
      responsibilities: ['Site supervision', 'Quality control', 'Progress reporting']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    role: '',
    allocation: 50,
    startDate: '',
    endDate: '',
    responsibilities: [] as string[]
  });

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = skillFilter === 'all' || member.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    
    const matchesAvailability = availabilityFilter === 'all' ||
                               (availabilityFilter === 'high' && member.availability >= 80) ||
                               (availabilityFilter === 'medium' && member.availability >= 50 && member.availability < 80) ||
                               (availabilityFilter === 'low' && member.availability < 50);
    
    return matchesSearch && matchesSkill && matchesAvailability;
  });

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 80) return 'text-green-600';
    if (availability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 45) return 'text-red-600';
    if (workload >= 35) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAssignMember = () => {
    if (!selectedMember) return;

    const newAssignment: TeamAssignment = {
      id: `ASSIGN${Date.now()}`,
      employeeId: selectedMember.id,
      projectId: project.id,
      role: assignmentForm.role,
      startDate: assignmentForm.startDate,
      endDate: assignmentForm.endDate,
      allocation: assignmentForm.allocation,
      status: 'active',
      responsibilities: assignmentForm.responsibilities
    };

    setAssignments([...assignments, newAssignment]);
    onMemberAssign?.(selectedMember.id, project.id, assignmentForm.role);
    
    resetAssignmentForm();
    setIsAssignDialogOpen(false);
    setSelectedMember(null);
  };

  const resetAssignmentForm = () => {
    setAssignmentForm({
      role: '',
      allocation: 50,
      startDate: '',
      endDate: '',
      responsibilities: []
    });
  };

  const openAssignDialog = (member: TeamMember) => {
    setSelectedMember(member);
    setIsAssignDialogOpen(true);
  };

  const getProjectAssignments = (employeeId: string) => {
    return assignments.filter(a => a.employeeId === employeeId && a.status === 'active');
  };

  const teamStats = {
    totalMembers: teamMembers.length,
    assigned: assignments.filter(a => a.status === 'active').length,
    avgPerformance: teamMembers.reduce((sum, m) => sum + m.performanceScore, 0) / teamMembers.length,
    avgAvailability: teamMembers.reduce((sum, m) => sum + m.availability, 0) / teamMembers.length,
    highPerformers: teamMembers.filter(m => m.performanceScore >= 90).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Assignment</h2>
          <p className="text-muted-foreground">Assign team members to {project.name}</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{teamStats.totalMembers}</div>
              <div className="text-sm text-muted-foreground">Available Members</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{teamStats.assigned}</div>
              <div className="text-sm text-muted-foreground">Assigned</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{teamStats.avgPerformance.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Avg Performance</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{teamStats.avgAvailability.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Avg Availability</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.highPerformers}</div>
              <div className="text-sm text-muted-foreground">High Performers</div>
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
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="project">Project Management</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="supervision">Supervision</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="high">High (80%+)</SelectItem>
                <SelectItem value="medium">Medium (50-79%)</SelectItem>
                <SelectItem value="low">Low (<50%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Current Projects</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => {
                const memberAssignments = getProjectAssignments(member.id);
                const isAssigned = memberAssignments.length > 0;
                
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {getInitials(member.firstName, member.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.firstName} {member.lastName}</div>
                          <div className="text-sm text-muted-foreground">{member.position}</div>
                          <div className="text-xs text-muted-foreground">{member.employeeNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${getAvailabilityColor(member.availability)}`}>
                            {member.availability}%
                          </span>
                        </div>
                        <Progress value={member.availability} className="h-2" />
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${getPerformanceColor(member.performanceScore)}`}>
                            {member.performanceScore}
                          </span>
                        </div>
                        <Progress value={member.performanceScore} className="h-2" />
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${getWorkloadColor(member.workload)}`}>
                            {member.workload}h/week
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Efficiency: {member.efficiency}%
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.currentProjects.slice(0, 2).map((projectId) => (
                          <Badge key={projectId} variant="secondary" className="text-xs">
                            {projectId}
                          </Badge>
                        ))}
                        {member.currentProjects.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{member.currentProjects.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {isAssigned ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Assigned
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => openAssignDialog(member)}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Current Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Current Project Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => {
              const member = teamMembers.find(m => m.id === assignment.employeeId);
              if (!member) return null;
              
              return (
                <Card key={assignment.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {getInitials(member.firstName, member.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.firstName} {member.lastName}</div>
                          <div className="text-sm text-muted-foreground">{assignment.role}</div>
                          <div className="text-xs text-muted-foreground">
                            {assignment.allocation}% allocation • Started {formatDate(assignment.startDate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {assignment.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-sm font-medium mb-2">Responsibilities:</div>
                      <div className="flex flex-wrap gap-1">
                        {assignment.responsibilities.map((responsibility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {responsibility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {assignments.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Team Assignments</h3>
                <p className="text-sm text-muted-foreground">
                  Start by assigning team members to this project
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Team Member</DialogTitle>
            <DialogDescription>
              Assign {selectedMember?.firstName} {selectedMember?.lastName} to {project.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              {/* Member Summary */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedMember.avatar} />
                  <AvatarFallback>
                    {getInitials(selectedMember.firstName, selectedMember.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{selectedMember.firstName} {selectedMember.lastName}</div>
                  <div className="text-sm text-muted-foreground">{selectedMember.position}</div>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Availability: </span>
                      <span className={getAvailabilityColor(selectedMember.availability)}>
                        {selectedMember.availability}%
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Performance: </span>
                      <span className={getPerformanceColor(selectedMember.performanceScore)}>
                        {selectedMember.performanceScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select
                      value={assignmentForm.role}
                      onValueChange={(value) => setAssignmentForm({ ...assignmentForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Project Lead">Project Lead</SelectItem>
                        <SelectItem value="Site Engineer">Site Engineer</SelectItem>
                        <SelectItem value="Technical Specialist">Technical Specialist</SelectItem>
                        <SelectItem value="Quality Controller">Quality Controller</SelectItem>
                        <SelectItem value="Safety Officer">Safety Officer</SelectItem>
                        <SelectItem value="Team Member">Team Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Allocation (%)</label>
                    <Input
                      type="number"
                      min="10"
                      max="100"
                      value={assignmentForm.allocation}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, allocation: Number(e.target.value) })}
                      placeholder="Percentage of time"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      type="date"
                      value={assignmentForm.startDate}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date (Optional)</label>
                    <Input
                      type="date"
                      value={assignmentForm.endDate}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Responsibilities</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Project coordination',
                      'Technical oversight',
                      'Quality assurance',
                      'Team leadership',
                      'Client communication',
                      'Progress reporting'
                    ].map((responsibility) => (
                      <label key={responsibility} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={assignmentForm.responsibilities.includes(responsibility)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAssignmentForm({
                                ...assignmentForm,
                                responsibilities: [...assignmentForm.responsibilities, responsibility]
                              });
                            } else {
                              setAssignmentForm({
                                ...assignmentForm,
                                responsibilities: assignmentForm.responsibilities.filter(r => r !== responsibility)
                              });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{responsibility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAssignDialogOpen(false);
                    setSelectedMember(null);
                    resetAssignmentForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAssignMember}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign Member
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};