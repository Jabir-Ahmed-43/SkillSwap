import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const SidebarLayout = () => {
  const { user } = useAuth();
  const navigation = [
    { name: "Dashboard", icon: HomeIcon, navlink: "/dashboard" },
    { name: "Explore Skills", icon: ExploreIcon, navlink: "/explore-skills" },
    { name: "My Mentors", icon: UsersIcon, navlink: "/mymentor" },
    { name: "My Bookings", icon: MyBookingsIcon, navlink: "/mybookings" },
    // { name: "Messages", icon: MessageIcon, badge: "2" },
    // { name: "Schedule", icon: CalendarIcon },
    // { name: "Settings", icon: SettingsIcon },
  ];

  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div>
      {/* <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex"> */}
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
            SkillSwap
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-sm font-medium">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.navlink}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === item.name
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={`w-5 h-5 ${
                  activeTab === item.name ? "text-indigo-600" : "text-slate-400"
                }`}
              />
              {item.name}
            </div>
            {item.badge && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile (Bottom of Sidebar) */}
      <div className="p-4 border-t border-slate-200 shrink-0">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
          <img
            src={user.photoURL}
            alt="Alex Johnson"
            className="w-9 h-9 rounded-full object-cover bg-slate-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {user.displayName}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        </button>
      </div>
      {/* </aside> */}
    </div>
  );
};

export default SidebarLayout;
function HomeIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function ExploreIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
      />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

// function MessageIcon(props) {
//   return (
//     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//       />
//     </svg>
//   );
// }

// function CalendarIcon(props) {
//   return (
//     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//       />
//     </svg>
//   );
// }
function MyBookingsIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  );
}

// function SettingsIcon(props) {
//   return (
//     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//       />
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//       />
//     </svg>
//   );
// }
