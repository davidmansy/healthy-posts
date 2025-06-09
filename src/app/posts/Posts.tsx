import { Link } from 'react-router';

export function Posts() {
  return (
    <div>
      <h1>List of Posts</h1>
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
