import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomePage } from './pages/HomePage';
import 'rsuite/dist/rsuite.min.css';

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
