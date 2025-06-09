import { H2 } from '@/components/typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router';
import { useDebounce } from '@/hooks/useDebounce';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function Posts() {
  const [titleKeyword, setTitleKeyword] = useState('');
  // Debounce the search keyword with a 400ms delay
  const debouncedTitleKeyword = useDebounce(titleKeyword, 400);

  const {
    isPending,
    error,
    data: posts,
    isFetching,
  } = useQuery<Post[]>({
    queryKey: ['posts', debouncedTitleKeyword],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const allPosts = await response.json();

      // If there's a search keyword, filter the posts
      if (debouncedTitleKeyword.trim()) {
        return allPosts.filter((post: Post) => post.title.toLowerCase().includes(debouncedTitleKeyword.toLowerCase()));
      }

      return allPosts;
    },
  });

  if (error) return 'An error has occurred: ' + error.message;

  const onTitleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleKeyword(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <H2>List of Posts</H2>
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center">
          <Label className="sr-only" htmlFor="titleKeywordSearch">
            Search by title
          </Label>
          <Input
            className="lg:min-w-[50ch] xl:min-w-[70ch]"
            id="titleKeywordSearch"
            onChange={onTitleSearchChange}
            placeholder="Search by Title"
            value={titleKeyword}
          />
        </div>
        {isPending && <p>Loading...</p>}
        {posts && (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {posts?.map((post: Post) => (
              <li key={post.id}>
                <PostItem post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
}

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <Link to={`/posts/${post.id}`} state={{ post }}>
      <Card className="w-full h-[200px] max-h-[200px] hover:bg-gray-100">
        <CardHeader>
          <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <div className="line-clamp-3">{post.body}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
