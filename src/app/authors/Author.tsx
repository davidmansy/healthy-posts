import { H1, H2 } from '@/components/typography';
import { useParams, Link } from 'react-router';

type AuthorParams = 'authorId';
type AuthorParamsMap = Record<AuthorParams, string>;

export function Author() {
  const { authorId } = useParams<AuthorParamsMap>();

  return (
    <div className="flex flex-1 flex-col items-center">
      <H1>Author details</H1>
      <section>
        <p>Email (id): {authorId}</p>
        <p>Name</p>
      </section>
      <section>
        <H2>List of author's posts</H2>
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
