import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/featured-mentors")
      .then((result) => {
        setMentors(result.data);
      })
      .catch((err) => {
        console.error("Error fetching mentor details:", err);
      });
  }, []);
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Featured Mentors
            </h2>
            <p className="text-slate-500">
              Top-rated mentors trusted by thousands of learners.
            </p>
          </div>
          <Link
            className="text-indigo-600 font-semibold text-sm hover:underline hidden sm:block"
            to="find-mentors"
            data-discover="true"
          >
            View all mentors →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="relative shrink-0">
                  <img
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover bg-indigo-100"
                    src={mentor.avatarUrl}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-semibold text-slate-900 text-sm truncate">
                      {mentor.name}
                    </span>
                    <svg
                      className="w-4 h-4 text-indigo-600 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.52 3.819 3.745 3.745 0 01-3.819.52A3.745 3.745 0 0112 21a3.745 3.745 0 01-3.068-1.593 3.745 3.745 0 01-3.819-.52 3.745 3.745 0 01-.52-3.819A3.745 3.745 0 013 12a3.745 3.745 0 011.593-3.068 3.745 3.745 0 01.52-3.819 3.745 3.745 0 013.819-.52A3.745 3.745 0 0112 3a3.745 3.745 0 013.068 1.593 3.745 3.745 0 013.819.52 3.745 3.745 0 01.52 3.819A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {mentor.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                {mentor.about}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {mentor.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span className="font-semibold text-slate-700">
                    {mentor.rating}
                  </span>
                  <span>({mentor.reviewCount})</span>
                </span>
                <span className="text-slate-300">|</span>
                <span>{mentor.sessionCount} sessions</span>
              </div>

              <div className="flex gap-2">
                <Link
                  className="flex-1 text-center text-xs font-semibold border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 py-2 rounded-lg transition-colors"
                  to={`/mentors/${mentor._id}`}
                  data-discover="true"
                >
                  View Profile
                </Link>
                <Link
                  className="flex-1 text-center text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                  to={`/book/${mentor._id}`}
                  data-discover="true"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentors;
