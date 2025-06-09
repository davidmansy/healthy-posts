import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}
