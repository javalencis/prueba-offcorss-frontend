import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";

export const AdminLayout = () => {
  return (
    <>
      <Header />
      <div className="dashboard__layout">
        <SideMenu />
        <main className="dashboard__content">
          <Outlet />
        </main>
      </div>
    </>
  );
};
