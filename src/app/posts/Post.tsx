import { H2 } from '@/components/typography';
import { useParams, Link, useLocation } from 'react-router';
import type { Post as PostType } from './Posts';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MessageCircle, User, Calendar, ThumbsUp, Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

type PostParam = 'postId';
type PostParamsMap = Record<PostParam, string>;

export function Post() {
  const { postId } = useParams<PostParamsMap>();
  const location = useLocation();
  const post = location.state?.post as PostType;

  // Fetch user data for the post author
  const {
    isPending: isUserPending,
    error: userError,
    data: user,
  } = useQuery<User>({
    queryKey: ['user', post?.userId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${post?.userId}`);
      return await response.json();
    },
    placeholderData: keepPreviousData,
    enabled: !!post?.userId,
  });

  // Fetch comments for the post
  const {
    isPending: isCommentsPending,
    error: commentsError,
    data: comments,
  } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });

  if (commentsError) return <div className="text-red-500">Error loading comments: {commentsError.message}</div>;
  if (userError) return <div className="text-red-500">Error loading author data: {userError.message}</div>;

  return (
    <div className="flex flex-1 flex-col max-w-4xl mx-auto w-full py-6 space-y-8">
      <Link to="/posts" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to posts
      </Link>

      {/* Post Content */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
              <CardDescription className="flex items-center mt-2 text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                <Link to={`/authors/${post.userId}`} className="hover:underline">
                  {isUserPending ? (
                    <Skeleton className="h-4 w-24 inline-block" />
                  ) : user ? (
                    user.name
                  ) : (
                    `Author #${post.userId}`
                  )}
                </Link>
                {user && (
                  <>
                    <span className="mx-2">•</span>
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span className="text-gray-500">{user.company.name}</span>
                  </>
                )}
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted today</span>
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50">
              Post #{post?.id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post?.body}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>Share</span>
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <MessageCircle className="h-4 w-4 inline mr-1" />
            {comments?.length || 0} comments
          </div>
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <H2 className="text-xl font-semibold">Comments</H2>
          <Badge variant="secondary">{comments?.length || 0}</Badge>
        </div>
        <Separator />

        {isCommentsPending ? (
          <div className="space-y-4">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment: Comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <Card className="border border-dashed p-8">
            <div className="text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No comments yet</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  // Generate initials from email
  const initials = comment.email.split('@')[0].slice(0, 2).toUpperCase();

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.email}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">{comment.name}</CardTitle>
            <CardDescription className="text-xs">{comment.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{comment.body}</p>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-gray-500 flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            Reply
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            Like
          </Button>
        </div>
        <span>Just now</span>
      </CardFooter>
    </Card>
  );
}

function CommentSkeleton() {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  );
}
