import { createBrowserRouter, Navigate, Outlet } from "react-router"
import { isAuthenticated } from "./auth"

// Pages
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Dashboard from "../pages/Dashboard"

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
const ErrorBoundary = () => {
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

export default router;