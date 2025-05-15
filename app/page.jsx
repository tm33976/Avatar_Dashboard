import { Suspense } from "react"
import LoadingAvatars from "@/components/loading-avatars"
import { ErrorBoundary } from "@/components/error-boundary"
import { AvatarProvider } from "@/contexts/avatar-context"
import AvatarDashboard from "@/components/avatar-dashboard"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
            AI Avatar Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Welcome back, User! Manage your AI-generated avatars here.
          </p>
        </header>

        <ErrorBoundary
          fallback={<p className="text-red-500">Something went wrong loading the avatars. Please try again later.</p>}
        >
          <AvatarProvider>
            <Suspense fallback={<LoadingAvatars />}>
              <AvatarDashboard />
            </Suspense>
          </AvatarProvider>
        </ErrorBoundary>
      </div>
      <Toaster />
    </main>
  )
}
