import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
          Ready to level up your skills?
        </h2>
        <p className="text-slate-500 mb-8">
          Join thousands of learners who found their mentor on SkillSwap.
        </p>
        <Link
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg transition-colors shadow-lg shadow-indigo-200 inline-block"
          to="/find-mentors"
          data-discover="true"
        >
          Find Your Mentor
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
