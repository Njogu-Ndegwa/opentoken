import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./error-page"
import { Login } from "./pages/authentication/login"
import { AuthProvider } from "./pages/authentication/hooks/useAuth"
import App from "./App"
import { ProtectedRoute } from "./pages/authentication/protectedRoute"
export const router = createBrowserRouter([

    {
      path: '',
      element: (
        <AuthProvider>
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        </AuthProvider>
    ),
      errorElement: <ErrorPage />,
  },
    {
      path: "login",
      element: <AuthProvider><Login/></AuthProvider>
    },
])