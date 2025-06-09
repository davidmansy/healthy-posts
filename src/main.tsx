import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppLayout } from './AppLayout.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Posts } from './app/posts/Posts.tsx';
import { Author } from './app/authors/Author.tsx';
import { Post } from './app/posts/Post.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Posts />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId" element={<Post />} />
          <Route path="authors/:authorId" element={<Author />} />
        </Route>
        <Route />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
