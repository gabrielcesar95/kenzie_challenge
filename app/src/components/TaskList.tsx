import React from 'react';
import { List } from 'rsuite';
import { Task } from '../pages/HomePage';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onCheck: (task: Task) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onCheck, onDelete, onEdit }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          isChecked={task.isChecked}
          onCheck={() => onCheck(task)}
          onDelete={() => onDelete(task)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </List>
  );
};