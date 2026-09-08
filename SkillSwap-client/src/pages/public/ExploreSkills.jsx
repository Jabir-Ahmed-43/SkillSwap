import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

import SkillCard from "../../components/skill/SkillCard";

const ExploreSkills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "All",
    "Development",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "Communication",
    "Career",
    "Other",
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:3000/skills");

        if (!response.ok) {
          throw new Error("Failed to fetch skills from database");
        }
        const data = await response.json();
        setSkills(data);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans text-gray-800">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Skills</h1>
        <p className="text-gray-500">
          Discover what you want to learn. Find the right mentor to guide you.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search for a skill..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="shrink-0">
          <select className="w-full md:w-48 appearance-none bg-white border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading && (
        // <p className="text-center text-gray-500 my-10">
        //   Loading skills from the database...
        // </p>

        <BounceLoader color="#4f39f6" />
      )}
      {error && (
        <p className="text-center text-gray-500 my-10">Error: {error} </p>
      )}

      <p className="text-gray-500 text-sm mb-4">{skills.length} skills found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill._id} skill={skill}></SkillCard>
        ))}
      </div>
    </div>
  );
};

export default ExploreSkills;
