import { H2 } from '@/components/typography';
import { useParams, Link, useLocation } from 'react-router';
import type { Post } from './Posts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type PostParam = 'postId';
type PostParamsMap = Record<PostParam, string>;

export function Post() {
  const { postId } = useParams<PostParamsMap>();
  const location = useLocation();
  const { userId, title, body } = location.state?.post;

  const {
    isPending,
    error,
    data: comments,
  } = useQuery<Comment[]>({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      return await response.json();
    },
  });

  if (error) return 'An error has occurred: ' + error.message;

  const postComments = useMemo(
    () => comments?.filter((comment: Comment) => comment.postId === Number(postId)),
    [comments, postId]
  );

  return (
    <div className="flex flex-1 flex-col">
      <H2>Post details</H2>
      <section>
        <p>id: {postId}</p>
        <p>
          Author: <Link to="/authors/1">{userId}</Link>
        </p>
        <p>Title: {title}</p>
        <p>Content: {body}</p>
      </section>
      <section>
        <H2>List of comments</H2>
        {isPending && <p>Loading...</p>}
        <ul className="flex flex-col gap-4">
          {postComments?.map((comment: Comment) => (
            <li key={comment.id}>
              <p>{comment.name}</p>
            </li>
          ))}
        </ul>

        {/* <ul>
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
        </ul> */}
      </section>
    </div>
  );
}
