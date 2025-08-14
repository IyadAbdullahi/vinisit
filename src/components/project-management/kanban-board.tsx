import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  User,
  Paperclip,
  MessageSquare,
  Flag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Task, Project } from '@/types';

interface KanbanBoardProps {
  project: Project;
  onTaskEdit?: (task: Task) => void;
  onTaskMove?: (taskId: string, newStatus: Task['status']) => void;
  onAddTask?: (status: Task['status']) => void;
}

interface KanbanColumn {
  id: Task['status'];
  title: string;
  color: string;
  tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  project,
  onTaskEdit,
  onTaskMove,
  onAddTask
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Define Kanban columns
  const columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-100',
      tasks: project.tasks.filter(task => task.status === 'todo')
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: 'bg-blue-100',
      tasks: project.tasks.filter(task => task.status === 'in_progress')
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-yellow-100',
      tasks: project.tasks.filter(task => task.status === 'review')
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'bg-green-100',
      tasks: project.tasks.filter(task => task.status === 'completed')
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: Task['status']) => {
    e.preventDefault();
    if (draggedTask && onTaskMove) {
      onTaskMove(draggedTask.id, columnId);
    }
    setDraggedTask(null);
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <Card
      className="mb-3 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={() => handleDragStart(task)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Task Header */}
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm leading-tight">{task.name}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onTaskEdit?.(task)}>
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Task Description */}
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Task Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                <Flag className="h-3 w-3 mr-1" />
                {task.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {task.attachments && task.attachments.length > 0 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Paperclip className="h-3 w-3 mr-1" />
                  {task.attachments.length}
                </div>
              )}
              {task.comments && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {task.comments.length}
                </div>
              )}
            </div>
          </div>

          {/* Task Timeline */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(task.dueDate)}
            </div>
            {task.estimatedHours && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {task.estimatedHours}h
              </div>
            )}
          </div>

          {/* Assignee */}
          {task.assigneeId && (
            <div className="flex items-center justify-between">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {getInitials(task.assigneeId)}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs text-muted-foreground">
                {task.actualHours && `${task.actualHours}h logged`}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Board Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Board</h2>
          <p className="text-muted-foreground">{project.name}</p>
        </div>
        <Button onClick={() => onAddTask?.('todo')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <Card
            key={column.id}
            className="h-fit"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <CardHeader className={`${column.color} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {column.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {column.tasks.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onAddTask?.(column.id)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {column.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {column.tasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="text-sm">No tasks</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => onAddTask?.(column.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Board Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map((column) => (
          <Card key={column.id}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{column.tasks.length}</div>
                <div className="text-sm text-muted-foreground">{column.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};