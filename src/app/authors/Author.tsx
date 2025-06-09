import { useParams, Link } from 'react-router';

type AuthorParams = 'authorId';
type AuthorParamsMap = Record<AuthorParams, string>;

export function Author() {
  const { authorId } = useParams<AuthorParamsMap>();

  return (
    <div>
      <h1>Author details</h1>
      <section>
        <p>Email (id): {authorId}</p>
        <p>Name</p>
      </section>
      <section>
        <h2>List of author's posts</h2>
        <ul>
          <li>
            <Link to="/posts/1">Post 1</Link>
          </li>
          <li>
            <Link to="/posts/2">Post 2</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
