import { Outlet } from "react-router"
import { Header } from "../components/Header"
import { SideMenu } from "../components/SideMenu"

export const AdminLayout = () => {
  return (
    <>
        <Header/>
        <div className="dashboard__layout">
            <SideMenu/>
            <Outlet/>
        </div>

    </>
  )
}
