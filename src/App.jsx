import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/landingPage'
import OnBoarding from './pages/onBoarding'
import JobListing from './pages/job-listing'
import PostJob from './pages/post-job'
import SavedJob from './pages/saved-job'
import MyJob from './pages/my-jobs'
import JobPage from './pages/job'
import { ThemeProvider } from './components/ui/theme-provider'
import ProtectedRoute from './components/ui/ProtectedRoute'

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element:<LandingPage />
        },
        {
          path: '/onBoarding',
          element: (
            <ProtectedRoute>
              <OnBoarding />
            </ProtectedRoute>
          )
        },
        {
          path: '/jobListing',
          element: (
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
          )
        },
        {
          path: '/job/:id',
          element: (
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/postJob',
          element: (
            <ProtectedRoute>
              <PostJob/>
            </ProtectedRoute>
          )
        },
        {
          path: '/savedJob',
          element: (
            <ProtectedRoute>
              <SavedJob />
            </ProtectedRoute>
          )
        },
        {
          path: '/myJob',
          element: (
            <ProtectedRoute>
              <MyJob />
            </ProtectedRoute>
          )
        },
      ]
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
