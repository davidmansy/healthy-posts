import { H2 } from '@/components/typography';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, MessageCircle } from 'lucide-react';

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
    placeholderData: keepPreviousData, // Avoid flickering by keeping previous data until update
  });

  if (error) return <div className="text-red-500">An error has occurred: {error.message}</div>;

  const onTitleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleKeyword(e.target.value);
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <H2 className="text-3xl font-bold mb-4 md:mb-0">Explore Posts</H2>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10 w-full md:w-[300px] lg:w-[400px]"
            id="titleKeywordSearch"
            onChange={onTitleSearchChange}
            placeholder="Search by title..."
            value={titleKeyword}
          />
          <Label className="sr-only" htmlFor="titleKeywordSearch">
            Search by title
          </Label>
        </div>
      </div>

      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="loading-skeletons">
          {[...Array(6)].map((_, index) => (
            <PostSkeleton key={index} data-testid="post-skeleton" />
          ))}
        </div>
      )}

      {posts && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
          {titleKeyword && (
            <Button variant="outline" onClick={() => setTitleKeyword('')}>
              Clear search
            </Button>
          )}
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <Link to={`/posts/${post.id}`} state={{ post }} className="block h-full">
      <Card className="h-full border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2">{post.title}</CardTitle>
            <Badge variant="outline" className="shrink-0">
              #{post.id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3 text-sm">{post.body}</p>
        </CardContent>
        <CardFooter className="pt-2 border-t text-xs text-gray-500 flex">
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-1" />
            <span>Comments</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function PostSkeleton() {
  return (
    <Card className="h-full border-2 border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-10" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}
