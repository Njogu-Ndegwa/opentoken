import { createBrowserRouter, Navigate } from "react-router-dom"
import Dashboard from "./pages/dashboard/dashboard"
import ErrorPage from "./error-page"
import { Reports } from "./pages/reports/reports"
import { ClientPage } from "./pages/clients/clientPage/clientpage"
import { Login } from "./pages/authentication/login"
import { ProtectedRoute } from "./pages/authentication/protectedRoute"
import { AuthProvider } from "./pages/authentication/hooks/useAuth"
import { AddTodo } from "./add-todo"
import App from "./App"
import TableStickyHeader from "./pages/test/test"
export const router = createBrowserRouter([
    {
        path: '',
        element: <Navigate to="/dashboard/reports" />,
        errorElement: <ErrorPage />,
    },
    {
      path: 'app',
      element: <App/>,
      errorElement: <ErrorPage />,
  },
  {
    path: 'todo',
    element: <AddTodo/>,
    errorElement: <ErrorPage />,
},
    {
      path: "login",
      element: <AuthProvider><Login/></AuthProvider>
    },
    {
        path: 'dashboard',
        exact: true,
        element: <AuthProvider><ProtectedRoute> <Dashboard/> </ProtectedRoute></AuthProvider> ,
        children: [
            {
              path: "reports",
              element: <Reports />,

            },
            {
              path: "clients",
              element: <ClientPage/>,
            },
            {
              path: "test",
              element: <TableStickyHeader/>,
            },
          ],
    }
])