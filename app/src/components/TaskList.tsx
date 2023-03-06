import React from 'react';
import { List } from 'rsuite';
import { Task } from '../pages/HomePage';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onCheck: (task: Task) => void;
  onEdit: (task: Task) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onCheck, onEdit }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          isChecked={task.isChecked}
          onCheck={() => onCheck(task)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </List>
  );
};