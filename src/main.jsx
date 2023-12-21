import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Pages/ErrorPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import LogInPage from './Pages/LogInPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import AuthProvider from './Firebase/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Pages/Dashboard.jsx';
import PrivateRoute from './FireBase/PrivateRoute.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LogInPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
