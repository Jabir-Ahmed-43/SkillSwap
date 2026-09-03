import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore-skills">Explore Skills</NavLink>
      </li>
      <li>
        <NavLink to="/find-mentors">Find Mentors</NavLink>
      </li>
      <li>
        <NavLink to="/how-it-works">How It Works</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm font-inter px-4 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold text-indigo-600"
          >
            SkillSwap
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center text-sm">
                  {(user.displayName || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline text-sm font-medium text-slate-700">
                {user.displayName || user.email}
              </span>
              <button
                className="btn btn-primary rounded-2xl"
                onClick={() => {
                  userSignOut().catch((err) =>
                    console.error("Sign out error:", err),
                  );
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost rounded-2xl">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary rounded-2xl">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
