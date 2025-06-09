import { Link } from 'react-router';
import { MobileNav } from './MobileNav';
import { H1 } from './typography';

export function Header() {
  return (
    <header className="flex flex-col border-b-1 border-gray-200 p-4">
      <div className="flex items-center gap-[16px]">
        <MobileNav />
        <H1 className="mb-0">
          <Link to="/">Healthy Posts</Link>
        </H1>
      </div>
    </header>
  );
}
