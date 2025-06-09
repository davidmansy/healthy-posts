import { H2 } from '@/components/typography';
import { Link } from 'react-router';

export function Posts() {
  return (
    <div className="flex flex-col">
      <H2>List of Posts</H2>
      <ul>
        <li>
          <Link to="/posts/1">Post 1</Link>
        </li>
        <li>
          <Link to="/posts/2">Post 2</Link>
        </li>
      </ul>
    </div>
  );
}
