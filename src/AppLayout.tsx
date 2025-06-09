import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
