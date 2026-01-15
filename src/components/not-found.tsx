import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mt-4 text-muted-foreground max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
