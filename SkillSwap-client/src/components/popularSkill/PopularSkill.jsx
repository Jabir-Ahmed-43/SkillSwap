import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const PopularSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/popular-skills")
      .then((response) => {
        setSkills(response.data);
      })
      .catch((err) => {
        console.error("Error fetching mentor details:", err);
      });
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
          Popular Skills
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Browse the most in-demand skills with expert mentors ready to help you
          grow.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {skills?.map((skill, index) => (
          <Link
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-indigo-200 hover:shadow-md transition-all group"
            to="/explore-skills"
            data-discover="true"
          >
            <div className="text-3xl mb-3">
              <img src={skill.photoUrl} alt="" />
            </div>
            <div className="font-display font-semibold text-slate-900 text-sm mb-1">
              {skill.name}
            </div>
            <div className="text-xs text-slate-500">{skill.mentorCount}</div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          className="text-indigo-600 font-semibold text-sm hover:underline"
          to="/explore-skills"
          data-discover="true"
        >
          View all skills →
        </Link>
      </div>
    </section>
  );
};

export default PopularSkills;
