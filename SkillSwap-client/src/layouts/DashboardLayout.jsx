import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <button className="md:hidden text-slate-500 hover:text-slate-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex-1 max-w-md hidden sm:block ml-4 md:ml-0">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search mentors, skills, or sessions..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="md:hidden">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&auto=format"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back, {user.displayName}! 👋
              </h1>
              <p className="text-slate-500 mt-1">
                Here is what is happening with your learning journey today.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-800 text-indigo-100 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Starting in 45 mins
                  </span>
                  <h2 className="text-xl font-bold mb-1">
                    System Design Interview Prep
                  </h2>
                  <p className="text-indigo-200 text-sm mb-6">
                    with Marcus Williams
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="bg-white text-indigo-900 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                      Join Call
                    </button>
                    <button className="text-indigo-200 text-sm font-medium hover:text-white transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-800 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute top-10 right-10 w-24 h-24 bg-indigo-700 rounded-full opacity-50 blur-xl"></div>
              </div>

              {/* Stats / Goals Widget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Weekly Goal
                </h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-slate-900">2</span>
                  <span className="text-slate-500 mb-1">/ 3 sessions</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full"
                    style={{ width: "66%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500">
                  Book 1 more session to reach your goal!
                </p>
              </div>
            </div>

            {/* Recommended Mentors Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 text-lg">
                  Recommended Mentors
                </h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View all
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mentor Card 1 */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-200 hover:shadow-sm transition-all flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
                    alt="Mentor"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Sarah Chen
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">
                      Frontend @ Stripe
                    </p>
                    <div className="flex gap-1 text-[10px] font-medium text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                        React
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                        CSS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mentor Card 2 */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-200 hover:shadow-sm transition-all flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format"
                    alt="Mentor"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Priya Kapoor
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">
                      UX Lead @ Notion
                    </p>
                    <div className="flex gap-1 text-[10px] font-medium text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                        Figma
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                        UX
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
