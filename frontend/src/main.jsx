import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectListPage";
import LoginPage from "./pages/Admin/LoginPage";
import RegisterPage from "./pages/Admin/RegisterPage";
import AdminPage from "./pages/Admin/AdminPage";
import EditProjectPage from "./pages/Admin/EditProjectPage";
import CreateProjectPage from "./pages/Admin/CreateProjectPage";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminPage />,
  },
  {
    path: "/admin/edit/:projectId",
    element: <EditProjectPage />,
  },
  {
    path: "/admin/create",
    element: <CreateProjectPage />,
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  </React.StrictMode>
);
