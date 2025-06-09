import { useParams, Link } from 'react-router';

type PostParams = 'postId';
type PostParamsMap = Record<PostParams, string>;

export function Post() {
  const { postId } = useParams<PostParamsMap>();

  return (
    <div>
      <h1>Post details</h1>
      <section>
        <p>id: {postId}</p>
        <p>
          Author: <Link to="/authors/1">Author 1</Link>
        </p>
        <p>Title</p>
        <p>Content</p>
      </section>
      <section>
        <h2>List of comments</h2>
        <ul>
          <li>
            <p>Comment 1</p>
            <p>
              Author: <Link to="/authors/1">Author 1</Link>
            </p>
          </li>
          <li>
            <Link to="/posts/2">Post 2</Link>
            <p>
              Author: <Link to="/authors/2">Author 2</Link>
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
