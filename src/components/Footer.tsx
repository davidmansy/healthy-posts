import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="flex justify-center items-center gap-4 p-4 border-t-1 border-gray-200">
      <Link to="/posts" className="text-sm underline">
        Posts
      </Link>
      <Link to="/authors" className="text-sm underline">
        Authors
      </Link>
    </footer>
  );
}
