import { createBrowserRouter, RouterProvider } from "react-router";
import "../styles/dashboard.scss";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProductList } from "../components/ProductList";
import { Profile } from "../components/Profile";



const routerAdmin = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout/>,
    children:[
      {
        index: true,
        element:<ProductList/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ]
  }
])

export const Dashboard = () => {
  return (
    <RouterProvider router={routerAdmin}/>
  );
};
