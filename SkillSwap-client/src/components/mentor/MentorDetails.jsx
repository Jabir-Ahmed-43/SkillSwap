import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BounceLoader } from "react-spinners";

const MentorDetails = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const getMentor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mentors/${id}`);
        setMentor(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMentor();
  }, [id]);

  if (!mentor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BounceLoader color="#4f39f6" />
      </div>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Profile Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative shrink-0">
                  <img
                    alt={mentor.name}
                    className="w-24 h-24 rounded-2xl object-cover bg-indigo-100"
                    src={mentor.avatarUrl}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl font-bold text-slate-900">
                      {mentor.name}
                    </h1>
                    {mentor.isVerified && (
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.52 3.819 3.745 3.745 0 01-3.819.52A3.745 3.745 0 0112 21a3.745 3.745 0 01-3.068-1.593 3.745 3.745 0 01-3.819-.52 3.745 3.745 0 01-.52-3.819A3.745 3.745 0 013 12a3.745 3.745 0 011.593-3.068 3.745 3.745 0 01.52-3.819 3.745 3.745 0 013.819-.52A3.745 3.745 0 0112 3a3.745 3.745 0 013.068 1.593 3.745 3.745 0 013.819.52 3.745 3.745 0 01.52 3.819A3.745 3.745 0 0121 12z" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-2">
                    {mentor.role} @{mentor.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span>
                      ⭐ {mentor.rating} ({mentor.reviewCount} reviews)
                    </span>
                    <span>🎓 {mentor.sessionCount} sessions</span>
                    <span>💼 {mentor.yearsExperience} years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-display font-semibold text-slate-900 mb-4">
                About
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {mentor.about}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">
                    Experience
                  </h3>
                  <div className="space-y-2">
                    {mentor.experience?.map((exp) => (
                      <div key={exp.id} className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-0.5">🏢</span>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {exp.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {exp.company} · {exp.period}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">
                    Education
                  </h3>
                  {mentor.education?.map((edu) => (
                    // 🐛 FIX: Added missing key prop here
                    <div key={edu.id} className="flex items-start gap-2 mb-2">
                      <span className="mt-0.5">🎓</span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-slate-500">
                          {edu.institution} {edu.period}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-display font-semibold text-slate-900 mb-4">
                Skills &amp; Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {mentor.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-display font-semibold text-slate-900 mb-5">
                Reviews
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-slate-900">
                    {mentor.reviewStats?.overall || 0}
                  </div>
                  <div className="flex justify-center gap-0.5 my-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`text-lg ${i <= Math.round(mentor.reviewStats?.overall || 0) ? "text-amber-400" : "text-slate-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">
                    {mentor.reviewStats?.totalReviews || 0} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = mentor.reviewStats?.distribution?.[star] || 0;
                    const total = mentor.reviewStats?.totalReviews || 1;
                    const percent = mentor.reviewStats?.totalReviews
                      ? (count / total) * 100
                      : 0;

                    return (
                      <div
                        key={star}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span className="text-slate-500 w-4">{star}</span>
                        <span className="text-amber-400 text-sm">★</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-500 w-6 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review Comments */}
              <div className="space-y-5">
                {mentor.reviews && mentor.reviews.length > 0 ? (
                  // If they have reviews, map through them like normal
                  mentor.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-t border-slate-100 pt-5"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          alt={review.reviewerName}
                          className="w-9 h-9 rounded-full object-cover bg-indigo-100"
                          src={review.reviewerAvatar}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm text-slate-900">
                              {review.reviewerName}
                            </p>
                            <span className="text-xs text-slate-400">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <span
                                key={i}
                                className={`text-sm ${i <= review.rating ? "text-amber-400" : "text-slate-200"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // 🔴 NEW: If the array is empty, show this friendly message
                  <div className="border-t border-slate-100 pt-8 pb-4 text-center">
                    <p className="text-slate-500 text-sm">
                      No reviews yet for this mentor.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Booking Widget) ================= */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-20">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display text-3xl font-bold text-slate-900">
                  ${mentor.hourlyRate}
                </span>
                <span className="text-slate-500 text-sm">/hour</span>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    Available Days
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {mentor.bookingDetails?.availableDays?.map((day) => (
                      <button
                        key={day}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors bg-slate-50 text-slate-600 hover:bg-indigo-50 border border-slate-200"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    Available Time Slots
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {mentor.bookingDetails?.timeSlots?.map((time) => (
                      <button
                        key={time}
                        className="px-3 py-2 rounded-lg text-xs font-medium transition-colors bg-slate-50 border border-slate-200 text-slate-600 hover:border-indigo-300"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors mb-2 cursor-pointer">
                Book a Session
              </button>
              <button className="w-full border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-medium py-2.5 rounded-xl transition-colors text-sm cursor-pointer">
                Send Message
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>
                    Languages: {mentor.bookingDetails?.languages?.join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🕐</span>
                  <span>{mentor.bookingDetails?.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>
                    {mentor.bookingDetails?.freeIntroCall
                      ? "Free 15-min intro call"
                      : "No free intro call"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorDetails;
