import { createBrowserRouter, RouterProvider } from "react-router";
import "../styles/dashboard.scss";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProductList } from "../components/ProductList";
import { Profile } from "../components/Profile";
import { ProductDetail } from "../components/ProductDetail";

const routerAdmin = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
      },
    ],
  },
]);

export const Dashboard = () => {
  return <RouterProvider router={routerAdmin} />;
};
