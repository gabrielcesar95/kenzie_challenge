import React from 'react';
import CloseIcon from '@rsuite/icons/Close';
import { Checkbox, FlexboxGrid, IconButton, List } from 'rsuite';
import { useMutation } from 'react-query';
import { queryClient } from '../App';
import { Task } from '../pages/HomePage';

type TaskItemProps = {
  task: Task
  onEdit: () => void;
};

const deleteTask = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3001/task/${id}`, { method: 'DELETE' });
  queryClient.invalidateQueries('tasks');
};

const updateTask = async (task: Task): Promise<void> => {
  await fetch(`http://localhost:3001/task/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  queryClient.invalidateQueries('tasks');
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
}) => {
  const { mutate: deleteTaskMutation } = useMutation(deleteTask);
  const { mutate: updateTaskMutation } = useMutation(updateTask);

  return (
    <List.Item>
      <FlexboxGrid align="middle">
        <FlexboxGrid.Item colspan={1}>
          <Checkbox checked={task.isChecked} onChange={() => {
            updateTaskMutation({ ...task, isChecked: !task.isChecked });
          }} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={22}>
          <span onClick={onEdit} style={{textDecoration: task.isChecked ? 'line-through' : 'auto'}}>{task.title}</span>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <IconButton
            appearance="subtle"
            onClick={() => {deleteTaskMutation(task.id)}}
            icon={<CloseIcon/>}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};