import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Navigate, Outlet } from "react-router"
import { RouterProvider } from "react-router/dom"
import { getAccessToken } from "./helpers/auth"

import "./styles/index.scss"

// Pages
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"

// Authentication check
const isAuthenticated = () => {
  return getAccessToken() != null
}

// Route protection for authentication
const ProtectedRoute = () => 
{
  if(isAuthenticated()) return <Outlet/>
  else return <Navigate to="/signin" replace />
}

// Public Routes
const UnprotectedRoute = () => 
{
  if(!isAuthenticated()) return <Outlet/>
  else return <Navigate to="/dashboard" replace />
}

// Error handeling for not found error
function ErrorBoundary()
{
  return <p>404 not found</p>
}

// Router
const router = createBrowserRouter([
  {
    path:"/",
    element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    element:<UnprotectedRoute />,
    children:
    [
      {
      path:"/signin",
      Component: SignIn
      },
      {
        path:"/signup",
        Component: SignUp
      }
    ]
  },
  {
    element:<ProtectedRoute />,
    children:
    [
      {
        path:"/dashboard",
        Component:Dashboard
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
