import { Link } from "react-router";

export default function MentorCard({ mentor }) {
  const {
    name,
    mentorId,
    bio,
    role,
    company,
    reviewCount,
    sessionCount,
    skills,
    hourlyRate,
    rating,
    avatarUrl,
  } = mentor;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all group">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <img
            alt={name}
            className="w-12 h-12 rounded-full object-cover bg-indigo-100"
            src={avatarUrl}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-semibold text-slate-900 text-sm truncate">
              {name}
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
            {role} @ {company}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
        {bio}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {skills?.slice(0, 3).map((singleSkill, index) => (
          <span
            key={index}
            className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium"
          >
            {singleSkill}
          </span>
        ))}

        {skills?.length > 3 && (
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
            +{skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <span className="text-amber-500">★</span>
          <span className="font-semibold text-slate-700">{rating}</span>
          <span>({reviewCount})</span>
        </span>
        <span className="text-slate-300">|</span>
        <span>{sessionCount} sessions</span>
        <span className="ml-auto font-semibold text-slate-900">
          ${hourlyRate}/hr
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/mentors/${mentorId}`}
          className="flex-1 text-center text-xs font-semibold border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 py-2 rounded-lg transition-colors"
        >
          View Profile
        </Link>
        <a
          href="/book/1"
          className="flex-1 text-center text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
        >
          Book Session
        </a>
      </div>
    </div>
  );
}
