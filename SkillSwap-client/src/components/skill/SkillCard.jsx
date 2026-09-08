import { Link } from "react-router";

const SkillCard = ({ skill }) => {
  return (
    <div>
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <img src={skill.photoUrl} className="rounded-xl"></img>
          {skill.popular && (
            <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-1 rounded">
              Popular
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
        <p className="text-gray-500 text-sm flex-grow mb-6 line-clamp-2">
          {skill.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
          <span className="text-sm text-gray-500">
            {skill.mentors} mentors available
          </span>
          <Link
            href={`/explore/skills/${skill._id}`}
            className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
