import { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("learner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { createUser } = use(AuthContext);

  function handleSignUp(e) {
    e.preventDefault();

    createUser()
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-violet-700">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=900&fit=crop&auto=format"
          alt="Mentors working"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="font-bold text-white text-xl">S</span>
            </div>

            <span className="font-bold text-2xl">SkillSwap</span>
          </div>

          <h2 className="text-3xl font-bold mb-3 max-w-xs leading-snug">
            Join 10,000+ learners growing faster with SkillSwap.
          </h2>

          <div className="flex -space-x-2 mt-4">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&auto=format"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-violet-700 object-cover bg-violet-300"
            />

            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&auto=format"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-violet-700 object-cover bg-violet-300"
            />

            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&auto=format"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-violet-700 object-cover bg-violet-300"
            />

            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&auto=format"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-violet-700 object-cover bg-violet-300"
            />

            <div className="w-9 h-9 rounded-full border-2 border-violet-700 bg-white/20 flex items-center justify-center text-xs font-semibold">
              +9K
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Create your account
          </h1>

          <p className="text-slate-500 mb-6">
            Start learning or mentoring today. Free to join.
          </p>

          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole("learner")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-left transition-all ${
                role === "learner"
                  ? "bg-white shadow-sm border border-slate-200"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="text-sm font-semibold text-slate-900">
                🎓 I want to learn
              </div>

              <div className="text-xs text-slate-500">
                Find mentors, book sessions
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole("mentor")}
              className={`flex-1 py-2.5 px-3 rounded-lg text-left transition-all ${
                role === "mentor"
                  ? "bg-white shadow-sm border border-slate-200"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="text-sm font-semibold text-slate-900">
                🏆 I want to mentor
              </div>

              <div className="text-xs text-slate-500">
                Share skills, earn money
              </div>
            </button>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Seikh Hasina"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);

                    if (value !== password) {
                      setPasswordError("Password is mismatched");
                    } else {
                      setPasswordError("");
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}

                  //   className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div>
                {passwordError && (
                  <p className="text-red-500">Incorrect password</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-slate-200" />

            <span className="text-xs text-slate-400">or</span>

            <hr className="flex-1 border-slate-200" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 py-3 rounded-xl text-sm font-medium text-slate-700 transition-colors"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 mt-3">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
