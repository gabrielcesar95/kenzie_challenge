import React from 'react';
import CloseIcon from '@rsuite/icons/Close';
import { Checkbox, FlexboxGrid, IconButton, List } from 'rsuite';

type TaskItemProps = {
  title: string;
  isChecked: boolean;
  onCheck: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  isChecked,
  onCheck,
  onDelete,
  onEdit,
}) => {
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
            onClick={onDelete}
            icon={<CloseIcon/>}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};