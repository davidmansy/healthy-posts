import { type FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md p-6 rounded-lg border-2 border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Something went wrong</h2>
        <div className="text-sm text-red-600 mb-4">
          <p>{error.message}</p>
        </div>
        <Button onClick={resetErrorBoundary} variant="outline" className="border-red-300 hover:bg-red-100">
          Try again
        </Button>
      </div>
    </div>
  );
}
