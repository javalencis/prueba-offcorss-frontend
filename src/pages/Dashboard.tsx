import {  Route, Routes } from "react-router";
import "../styles/dashboard.scss";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProductList } from "../components/ProductList";
import { Profile } from "../components/Profile";
import { ProductDetail } from "../components/ProductDetail";

export const Dashboard = () => {
 return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<ProductList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="product/:productId" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
};
