
  import { createRoot } from "react-dom/client";
  import { createBrowserRouter, RouterProvider } from "react-router";
  import App from "./app/App.tsx";
  import { FaqPage } from "./app/pages/FaqPage.tsx";
  import "./styles/index.css";

  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/faq", element: <FaqPage /> },
  ]);

  createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
  );
