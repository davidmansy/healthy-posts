import '@testing-library/jest-dom';

// Mock the useDebounce hook to avoid waiting for debounce in tests
vi.mock('./src/hooks/useDebounce', () => ({
  useDebounce: (value: any, _timeout: number) => value,
}));
