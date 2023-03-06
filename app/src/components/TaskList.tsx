import React from 'react';
import { FlexboxGrid, List } from 'rsuite';
import { Task } from '../pages/HomePage';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <List>
      {
        tasks.length > 0
          ? tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
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