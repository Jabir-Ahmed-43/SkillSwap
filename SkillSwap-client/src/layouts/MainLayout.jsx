import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/navbar/Navbar";
import SidebarLayout from "./SidebarLayout";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-1/5 bg-white border-r border-slate-200">
          <SidebarLayout />
        </aside>
        <main className="flex-1 w-4/5 bg-slate-50">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
