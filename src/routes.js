import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./error-page"
import { Login } from "./pages/authentication/login"
import { AuthProvider } from "./pages/authentication/hooks/useAuth"
import App from "./App"
export const router = createBrowserRouter([

    {
      path: '',
      element: <App/>,
      errorElement: <ErrorPage />,
  },
    {
      path: "login",
      element: <AuthProvider><Login/></AuthProvider>
    },
])