import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

import MentorCard from "../../components/mentor/MentorCard";

const Mentors = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:3000/mentors");

        if (!response.ok) {
          throw new Error("Failed to fetch mentors data from database");
        }
        const data = await response.json();
        setMentors(data);
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory =
      activeCategory === "All" || mentor.category === activeCategory;

    const matchesSearch = mentor.name
      .toLowerCase()
      .includes(searchQuery.toLocaleLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans text-gray-800">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Mentor</h1>
        <p className="text-gray-500">
          Browse 180+ verified mentors across every skill and industry.
        </p>
      </div>

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
            placeholder="Search for a mentor..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center">
          <BounceLoader color="#4f39f6" />{" "}
        </div>
      )}
      {error && (
        <p className="text-center text-gray-500 my-10">Error: {error} </p>
      )}

      {!isLoading && !error && (
        <p className="text-gray-500 text-sm mb-4">
          {filteredMentors.length} mentors found
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMentors.map((mentor) => (
          <MentorCard key={mentor._id || mentor.mentorId} mentor={mentor} />
        ))}
      </div>

      {!isLoading && filteredMentors.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No mentors found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-4 text-indigo-600 hover:underline font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default Mentors;
