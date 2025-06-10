import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Posts } from './Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the react router
vi.mock('react-router', () => ({
  Link: ({ to, state, className, children }: any) => (
    <a href={to} className={className} data-state={JSON.stringify(state)}>
      {children}
    </a>
  ),
}));

// Mock data for posts
const mockPosts = [
  {
    userId: 1,
    id: 1,
    title: 'First Post Title',
    body: 'This is the body of the first post',
  },
  {
    userId: 1,
    id: 2,
    title: 'Second Post Title',
    body: 'This is the body of the second post',
  },
  {
    userId: 2,
    id: 3,
    title: 'Third Post Title',
    body: 'This is the body of the third post',
  },
];

// Setup for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Posts Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock the fetch API
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockPosts),
    });
  });

  it('renders the component with a title', async () => {
    render(<Posts />, { wrapper: createWrapper() });

    // Check if the title is rendered
    expect(screen.getByText('Explore Posts')).toBeInTheDocument();

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText('Search by title...')).toBeInTheDocument();

    // Wait for posts to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument();
      expect(screen.getByText('Second Post Title')).toBeInTheDocument();
      expect(screen.getByText('Third Post Title')).toBeInTheDocument();
    });
  });

  it('filters posts based on search input', async () => {
    const user = userEvent.setup();
    render(<Posts />, { wrapper: createWrapper() });

    // Wait for posts to be loaded
    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument();
    });

    // Type in the search input
    const searchInput = screen.getByPlaceholderText('Search by title...');
    await user.type(searchInput, 'First');

    // Mock the filtered fetch response
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([mockPosts[0]]),
    });

    // Wait for debounce and check if only the matching post is displayed
    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument();
      expect(screen.queryByText('Second Post Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Third Post Title')).not.toBeInTheDocument();
    });
  });

  it('shows loading state while fetching posts', async () => {
    // Delay the fetch response to ensure loading state is visible
    global.fetch = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve(mockPosts),
          });
        }, 100);
      });
    });

    render(<Posts />, { wrapper: createWrapper() });

    // Check if the component is in a loading state
    expect(screen.getByTestId('loading-skeletons')).toBeInTheDocument();

    // Wait for posts to be loaded
    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    // Mock a failed fetch
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch posts'));

    render(<Posts />, { wrapper: createWrapper() });

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
    });
  });
});
