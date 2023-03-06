import React from 'react';
import { FlexboxGrid, List } from 'rsuite';
import { Task } from '../pages/HomePage';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit }) => {
  return (
    <List>
      {
        tasks.length > 0
          ? tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
            />
          ))
          : (
            <List.Item>
              <FlexboxGrid align="middle">
                  <p>Nenhuma tarefa encontrada</p>
              </FlexboxGrid>
            </List.Item>
          )
      }
    </List>
  );
};