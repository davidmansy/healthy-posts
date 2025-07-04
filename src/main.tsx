import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppLayout } from './AppLayout.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Posts } from './app/posts/Posts.tsx';
import { Author } from './app/authors/Author.tsx';
import { Post } from './app/posts/Post.tsx';
import { Authors } from './app/authors/Authors.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Posts />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:postId" element={<Post />} />
            <Route path="authors" element={<Authors />} />
            <Route path="authors/:authorId" element={<Author />} />
          </Route>
          <Route />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
