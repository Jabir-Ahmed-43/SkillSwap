// SidebarLayout.jsx
import { NavLink } from "react-router";

const SidebarLayout = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/mybookings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
            }
          >
            My Bookings
          </NavLink>
        </nav>
      </div>

      <div className="shrink-0 border-t border-slate-200 p-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop"
            alt="Jabir Ahmed"
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              Jabir Ahmed
            </p>
            <p className="text-xs text-slate-500 truncate">
              jabir.ahmed484@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
