import { H2 } from '@/components/typography';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Briefcase, Globe, Mail } from 'lucide-react';

export interface Author {
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

export function Authors() {
  const {
    isPending,
    error,
    data: authors,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const allAuthors = await response.json();
      return allAuthors;
    },
    placeholderData: keepPreviousData,
  });

  if (error) return <div className="text-red-500">An error has occurred: {error.message}</div>;

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <H2 className="text-3xl font-bold mb-4 md:mb-0">Authors</H2>
      </div>

      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <AuthorSkeleton key={index} />
          ))}
        </div>
      )}

      {authors && authors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author: Author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  );
}

interface AuthorCardProps {
  author: Author;
}

function AuthorCard({ author }: AuthorCardProps) {
  // Generate initials from email
  const initials = author.email.split('@')[0].slice(0, 2).toUpperCase();

  return (
    <Card className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      <Link to={`/authors/${author.id}`} className="block">
        <CardHeader className="pb-2">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="text-lg font-semibold hover:text-blue-600 transition-colors">{author.name}</span>
                <Badge variant="outline" className="ml-2 bg-blue-50">
                  #{author.id}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">@{author.username}</p>
            </div>
          </div>
        </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium">{author.company.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span>
            {author.address.city}, {author.address.zipcode}
          </span>
        </div>
      </CardContent>
      </Link>
      <CardFooter className="pt-2 border-t flex flex-wrap gap-2 text-xs">
        <Link to={`mailto:${author.email}`} className="flex items-center text-gray-500 hover:text-blue-600">
          <Mail className="h-3 w-3 mr-1" />
          <span>{author.email}</span>
        </Link>
        <Link
          to={`https://${author.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-500 hover:text-blue-600"
        >
          <Globe className="h-3 w-3 mr-1" />
          <span>{author.website}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

function AuthorSkeleton() {
  return (
    <Card className="border-2 border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="flex items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-10 ml-2" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </CardFooter>
    </Card>
  );
}
