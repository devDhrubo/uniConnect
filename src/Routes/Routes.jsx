import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <div>Page not found</div>,
    children: [
        {
            path: "/",
            element: <Home/>
        }
    ]
  },
]);
