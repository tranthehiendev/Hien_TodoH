import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TasksCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title || "");

  // XÓA TASK
  const deletedTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Nhiệm vụ đã được xóa.');
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi xảy ra khi xóa nhiệm vụ', error);
      toast.error('Lỗi xảy ra khi xóa nhiệm vụ!');
    }
  };

  // UPDATE TASK
  const updatedTask = async () => {
    const newTitle = updatedTaskTitle.trim();

    if (!newTitle) {
      setUpdatedTaskTitle(task.title || "");
      setIsEditing(false);
      return;
    }

    try {
      await api.put(`/tasks/${task._id}`, {
        title: newTitle,
      });
      toast.success(`Nhiệm vụ đã đổi thành ${newTitle}`);
      setIsEditing(false);
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi xảy ra khi cập nhật nhiệm vụ', error);
      toast.error('Lỗi xảy ra khi cập nhật nhiệm vụ!');
    }
  };

  // ENTER để save
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updatedTask();
    }
    if (event.key === 'Escape') {
      setIsEditing(false);
      setUpdatedTaskTitle(task.title || "");
    }
  };

  // Chọn task để chuyển sang completed
  const toggleTaskCompletedButton = async () => {
    try {
      if (task.status === 'active') {
        await api.put(`/tasks/${task._id}`, {
          status: 'completed',
        });
        toast.success(`Nhiệm vụ ${task.title} đã được hoàn thành.`);

      } else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
        });
        toast.success(`Nhiệm vụ ${task.title} đã được đổi sang trạng thái chưa hoàn thành.`);

      }
      handleTaskChanged()
    } catch (error) {
      console.error('Lỗi xảy ra khi đổi trạng thái nhiệm vụ', error);
      toast.error('Lỗi xảy ra khi đổi trạng thái nhiệm vụ!');
    }
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === 'completed' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">

        {/* Nút tròn */}
        <Button
          variant='ghost'
          size='icon'
          onClick={(e) => {
            e.stopPropagation()
            toggleTaskCompletedButton()
          }}
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === 'completed'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className='size-5' />
          ) : (
            <Circle className='size-5' />
          )}
        </Button>

        {/* CONTENT */}
        <div
          className="flex-1 min-w-0 cursor-text"
          onClick={() => {
            if (!isEditing) {
              setIsEditing(true);
              setUpdatedTaskTitle(task.title || "");
            }
          }}
        >
          {isEditing ? (
            <Input
              autoFocus
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type='text'
              value={updatedTaskTitle}
              onChange={(e) => setUpdatedTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (updatedTaskTitle.trim() !== task.title) {
                  updatedTask();
                } else {
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'completed'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}

          {/* DATE */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className='size-3 text-muted-foreground' />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'>-</span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">

          {/* EDIT */}
          <Button
            variant='ghost'
            size='icon'
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              setUpdatedTaskTitle(task.title || "");
            }}
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
          >
            <SquarePen className="size-4" />
          </Button>

          {/* DELETE */}
          <Button
            variant='ghost'
            size='icon'
            onClick={(e) => {
              e.stopPropagation();
              deletedTask(task._id);
            }}
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TasksCard;