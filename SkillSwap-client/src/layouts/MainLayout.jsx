import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/navbar/Navbar";
import SidebarLayout from "./SidebarLayout";

const MainLayout = () => {
  return (
    // 1. h-screen and overflow-hidden locks the entire app to exactly the height of the browser window
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      {/* 2. Top Navbar stays fixed at the top */}
      <div className="shrink-0 z-10">
        <Navbar />
      </div>

      {/* 3. The container for the sidebar and main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Fixed width, won't scroll the whole page (has its own scrollbar if menu gets too long) */}
        <aside className="w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
          <SidebarLayout />
        </aside>

        {/* Right Content Area: Takes up remaining space and scrolls vertically */}
        <main className="flex-1 overflow-y-auto flex flex-col relative">
          {/* Outlet (My Bookings) grows to take available space */}
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Footer is moved inside the scrollable area so it doesn't permanently block the bottom of the screen */}
          <div className="shrink-0 mt-auto">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
