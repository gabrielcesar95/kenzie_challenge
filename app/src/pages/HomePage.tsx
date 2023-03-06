import React from 'react';
import { Container, Header, Content } from 'rsuite';
import { useQuery } from 'react-query';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

export type Task = {
  id: number;
  title: string;
  isChecked: boolean;
};

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('http://localhost:3001/task');
  const tasks = await response.json();
  return tasks;
};

export const HomePage: React.FC = () => {
  const { data: tasks, isLoading } = useQuery('tasks', fetchTasks);

  return (
    <Container>
      <Header>
        <h2>Tarefas</h2>
      </Header>
      <Content>
        <TaskForm />
        {isLoading ? (
          <p>Buscando tarefas...</p>
        ) : (
          <TaskList
            tasks={tasks || []}
            onCheck={() => {}}
            onEdit={() => {}}
          />
        )}
      </Content>
    </Container>
  );
};