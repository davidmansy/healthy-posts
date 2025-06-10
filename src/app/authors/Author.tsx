import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { H2 } from '@/components/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Mail, Phone, Globe, MapPin, Briefcase, Building, User } from 'lucide-react';
import type { Author as AuthorType } from './Authors';
import type { Post } from '../posts/Posts';

type AuthorParam = 'authorId';
type AuthorParamsMap = Record<AuthorParam, string>;

export function Author() {
  const { authorId } = useParams<AuthorParamsMap>();

  // Fetch author data
  const {
    isPending: isAuthorPending,
    error: authorError,
    data: author,
  } = useQuery<AuthorType>({
    queryKey: ['author', authorId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`);
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });

  // Fetch author's posts
  const {
    isPending: isPostsPending,
    error: postsError,
    data: posts,
  } = useQuery<Post[]>({
    queryKey: ['authorPosts', authorId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}/posts`);
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });

  if (authorError) return <div className="text-red-500">Error loading author: {authorError.message}</div>;
  if (postsError) return <div className="text-red-500">Error loading posts: {postsError.message}</div>;

  // Generate initials from email
  const initials = author?.email ? author.email.split('@')[0].slice(0, 2).toUpperCase() : '';

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full py-6 px-4 space-y-8">
      <Link to="/authors" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to authors
      </Link>

      {isAuthorPending ? (
        <AuthorProfileSkeleton />
      ) : (
        author && (
          <>
            {/* Author Profile Card */}
            <Card className="border-2 border-gray-200 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-24 w-24 border-2 border-gray-100">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-2xl font-bold">{author.name}</CardTitle>
                      <Badge variant="outline" className="bg-blue-50">
                        #{author.id}
                      </Badge>
                    </div>
                    <p className="text-gray-500">@{author.username}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Website
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Company Information */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    Company
                  </h3>
                  <Card className="bg-gray-50">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <p className="font-medium">{author.company.name}</p>
                        <p className="text-sm text-gray-600 italic">"{author.company.catchPhrase}"</p>
                        <p className="text-sm text-gray-600">{author.company.bs}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${author.email}`} className="text-blue-600 hover:underline">
                        {author.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{author.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a
                        href={`https://${author.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {author.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    Address
                  </h3>
                  <Card className="bg-gray-50">
                    <CardContent className="pt-4">
                      <address className="not-italic">
                        <p>
                          {author.address.street}, {author.address.suite}
                        </p>
                        <p>
                          {author.address.city}, {author.address.zipcode}
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Geo: </span>
                          <span>
                            {author.address.geo.lat}, {author.address.geo.lng}
                          </span>
                        </div>
                      </address>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Author's Posts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <H2 className="text-xl font-semibold">Posts by {author.name}</H2>
                <Badge variant="secondary">{posts?.length || 0}</Badge>
              </div>
              <Separator />

              {isPostsPending ? (
                <div className="space-y-4">
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                </div>
              ) : posts && posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <Card className="border border-dashed p-8">
                  <div className="text-center text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>No posts found</p>
                  </div>
                </Card>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/posts/${post.id}`} state={{ post }} className="hover:text-blue-600 transition-colors">
            <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
          </Link>
          <Badge variant="outline">#{post.id}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-2">{post.body}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Link
          to={`/posts/${post.id}`}
          state={{ post }}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}

function AuthorProfileSkeleton() {
  return (
    <Card className="border-2 border-gray-200 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Information Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* Address Information Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Card className="bg-gray-50">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

function PostSkeleton() {
  return (
    <Card className="border border-gray-200">
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
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}
