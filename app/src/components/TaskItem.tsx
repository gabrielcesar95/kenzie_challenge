import React from 'react';
import CloseIcon from '@rsuite/icons/Close';
import { Checkbox, FlexboxGrid, IconButton, List } from 'rsuite';
import { useMutation } from 'react-query';
import { queryClient } from '../App';

type TaskItemProps = {
  id: number;
  title: string;
  isChecked: boolean;
  onCheck: () => void;
  onEdit: () => void;
};

const deleteTask = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3001/task/${id}`, { method: 'DELETE' });
  queryClient.invalidateQueries('tasks');
};

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  isChecked,
  id,
  onCheck,
  onEdit,
}) => {
  const { mutate: deleteTaskMutation } = useMutation(deleteTask);

  return (
    <List.Item>
      <FlexboxGrid align="middle">
        <FlexboxGrid.Item colspan={1}>
          <Checkbox checked={isChecked} onChange={onCheck} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={22}>
          <span onClick={onEdit}>{title}</span>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <IconButton
            appearance="subtle"
            onClick={() => {deleteTaskMutation(id)}}
            icon={<CloseIcon/>}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};