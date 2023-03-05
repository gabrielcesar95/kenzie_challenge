import React, { useState } from 'react';
import { Form, Button } from 'rsuite';

type TaskFormProps = {
  onAddTask: (title: string) => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTask(title);
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