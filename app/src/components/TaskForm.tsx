import React, { useState } from 'react';
import { Form, Button } from 'rsuite';
import { Task } from '../pages/HomePage';
import { queryClient } from '../App';
import { useMutation } from 'react-query';

const handleAddTask = async (title: string): Promise<Task> => {
  const response = await fetch('http://localhost:3001/task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, isChecked: false }),
  });
  const task = await response.json();
  queryClient.invalidateQueries('tasks');
  return task;
};

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { mutate: addTaskMutation } = useMutation(handleAddTask);

  const handleSubmit = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTaskMutation(title);
    setTitle('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          name="title"
          value={title}
          placeholder="Qual é o título da tarefa?"
          onChange={(value) => setTitle(value)}
        />
        <Button type="submit" appearance="primary">
          Adicionar
        </Button>
      </Form.Group>
    </Form>
  );
};