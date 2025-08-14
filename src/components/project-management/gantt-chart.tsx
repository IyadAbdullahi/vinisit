import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Edit,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import type { Project, Milestone, Task } from '@/types';

interface GanttChartProps {
  project: Project;
  onMilestoneEdit?: (milestone: Milestone) => void;
  onTaskEdit?: (task: Task) => void;
  onAddMilestone?: () => void;
  onAddTask?: () => void;
}

interface GanttItem {
  id: string;
  name: string;
  type: 'milestone' | 'task';
  startDate: Date;
  endDate: Date;
  progress: number;
  status: string;
  dependencies?: string[];
  assignee?: string;
  budget?: number;
  spent?: number;
}

export const GanttChart: React.FC<GanttChartProps> = ({
  project,
  onMilestoneEdit,
  onTaskEdit,
  onAddMilestone,
  onAddTask
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Convert project data to Gantt items
  const ganttItems = useMemo(() => {
    const items: GanttItem[] = [];

    // Add milestones
    project.milestones.forEach(milestone => {
      items.push({
        id: milestone.id,
        name: milestone.name,
        type: 'milestone',
        startDate: new Date(milestone.dueDate),
        endDate: new Date(milestone.dueDate),
        progress: milestone.progress,
        status: milestone.status,
        budget: milestone.budget,
        spent: milestone.spent
      });
    });

    // Add tasks
    project.tasks.forEach(task => {
      items.push({
        id: task.id,
        name: task.name,
        type: 'task',
        startDate: task.startDate ? new Date(task.startDate) : new Date(),
        endDate: task.dueDate ? new Date(task.dueDate) : new Date(),
        progress: 0, // Tasks don't have progress in the current schema
        status: task.status,
        assignee: task.assigneeId
      });
    });

    return items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [project]);

  // Generate timeline dates based on view mode
  const timelineDates = useMemo(() => {
    const dates: Date[] = [];
    const start = new Date(currentDate);
    const daysToShow = viewMode === 'day' ? 7 : viewMode === 'week' ? 28 : 90;
    
    start.setDate(start.getDate() - Math.floor(daysToShow / 2));
    
    for (let i = 0; i < daysToShow; i++) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    
    return dates;
  }, [currentDate, viewMode]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      case 'overdue': return 'bg-red-500';
      case 'todo': return 'bg-gray-300';
      case 'review': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const calculateBarPosition = (item: GanttItem) => {
    const timelineStart = timelineDates[0];
    const timelineEnd = timelineDates[timelineDates.length - 1];
    const totalDays = (timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
    
    const itemStart = Math.max(0, (item.startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
    const itemDuration = Math.max(1, (item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const left = (itemStart / totalDays) * 100;
    const width = Math.min((itemDuration / totalDays) * 100, 100 - left);
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const navigateTime = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const increment = viewMode === 'day' ? 7 : viewMode === 'week' ? 28 : 90;
    
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - increment);
    } else {
      newDate.setDate(newDate.getDate() + increment);
    }
    
    setCurrentDate(newDate);
  };

  const formatHeaderDate = (date: Date) => {
    switch (viewMode) {
      case 'day':
        return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
      case 'week':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      default:
        return date.toLocaleDateString();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Gantt Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => navigateTime('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateTime('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={onAddMilestone}>
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Timeline Header */}
          <div className="flex">
            <div className="w-80 flex-shrink-0 p-2 border-r">
              <div className="font-medium text-sm">Task / Milestone</div>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex min-w-max">
                {timelineDates.map((date, index) => (
                  <div
                    key={index}
                    className="w-12 p-1 text-center text-xs border-r border-muted"
                  >
                    {formatHeaderDate(date)}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Gantt Items */}
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {ganttItems.map((item) => {
                const barPosition = calculateBarPosition(item);
                
                return (
                  <div key={item.id} className="flex items-center group hover:bg-muted/50 rounded-lg">
                    {/* Item Info */}
                    <div className="w-80 flex-shrink-0 p-3 border-r">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.type === 'milestone' ? (
                            <div className="w-3 h-3 bg-blue-500 rotate-45"></div>
                          ) : (
                            <div className="w-3 h-3 bg-gray-400 rounded"></div>
                          )}
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.type === 'milestone' ? 'Milestone' : 'Task'}
                              {item.assignee && ` • ${item.assignee}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (item.type === 'milestone') {
                                const milestone = project.milestones.find(m => m.id === item.id);
                                if (milestone && onMilestoneEdit) onMilestoneEdit(milestone);
                              } else {
                                const task = project.tasks.find(t => t.id === item.id);
                                if (task && onTaskEdit) onTaskEdit(task);
                              }
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Bar */}
                    <div className="flex-1 relative h-12 flex items-center">
                      <div className="absolute inset-0 flex">
                        {timelineDates.map((_, index) => (
                          <div
                            key={index}
                            className="w-12 border-r border-muted/50"
                          />
                        ))}
                      </div>
                      
                      {/* Progress Bar */}
                      <div
                        className={`absolute h-6 rounded-md ${getStatusColor(item.status)} opacity-80 flex items-center px-2`}
                        style={barPosition}
                      >
                        <div className="text-xs text-white font-medium truncate">
                          {item.progress > 0 && `${item.progress}%`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rotate-45"></div>
              <span className="text-sm">Milestone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-sm">Task</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-green-500 rounded"></div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-blue-500 rounded"></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-red-500 rounded"></div>
              <span className="text-sm">Overdue</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};