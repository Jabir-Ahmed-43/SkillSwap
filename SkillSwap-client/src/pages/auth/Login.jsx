import { useState } from "react";
import { Link } from "react-router";
import community from "../../assets/images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-600">
        <img
          src={community}
          alt="Students learning together"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="font-bold text-white text-xl">S</span>
            </div>

            <span className="font-bold text-2xl">SkillSwap</span>
          </div>

          <blockquote className="max-w-sm">
            <p className="text-lg font-medium leading-relaxed mb-3">
              "I landed my first engineering job 4 months after my first
              SkillSwap session. The personalized mentorship changed
              everything."
            </p>

            <div className="flex items-center gap-3">
              <img
                alt="Aisha"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/40"
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&auto=format"
              />

              <div>
                <p className="font-semibold text-sm">Aisha Okonkwo</p>
                <p className="text-indigo-200 text-xs">
                  Frontend Engineer @ Vercel
                </p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>

            <span className="font-bold text-slate-900 text-lg">SkillSwap</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Welcome back
          </h1>

          <p className="text-slate-500 mb-8">
            Log in to your account to continue learning.
          </p>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-indigo-600 w-4 h-4" />

              <span className="text-sm text-slate-600">
                Remember me for 30 days
              </span>
            </label>

            {/* Login Button */}
            <Link
              to="/dashboard"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Log In
            </Link>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-slate-200" />

            <span className="text-xs text-slate-400">or</span>

            <hr className="flex-1 border-slate-200" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 py-3 rounded-xl text-sm font-medium text-slate-700 transition-colors"
          >
            <img
              alt="Google"
              className="w-4 h-4"
              src="https://www.google.com/favicon.ico"
            />
            Continue with Google
          </button>

          {/* Register */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
