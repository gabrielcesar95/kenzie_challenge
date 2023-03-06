import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HomePage } from './HomePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeEach(() => {
  queryClient.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('HomePage', () => {
  it('renders all components', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HomePage />
      </QueryClientProvider>
    );

    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Qual é o título da tarefa?')).toBeInTheDocument();
    expect(screen.getByText('Adicionar')).toBeInTheDocument();
    expect(screen.getByText('Buscando tarefas...')).toBeInTheDocument();
  });

});