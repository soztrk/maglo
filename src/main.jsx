import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Navigate, Outlet } from "react-router"
import { RouterProvider } from "react-router/dom"

import "./styles/index.scss"

// Pages
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"

// Authentication
const isAuthenticated = () => {
  return false
}

const ProtectedRoute = () => 
{
  if(isAuthenticated()) return <Outlet/>
  else return <Navigate to="signin" replace />
}


function ErrorBoundary()
{
  return <p>Error is happened</p>
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <Navigate to="/signin" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path:"/signin",
    Component: SignIn
  },
  {
    path:"/signup",
    Component: SignUp
  },
  {
    /* path:"/dashboard",
    loader:protectedLoader,
    Component:DashboardPage, */
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
