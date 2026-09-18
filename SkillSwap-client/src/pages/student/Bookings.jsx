import axios from "axios";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";

const Bookings = () => {
  const { user, loading: authLoading } = useAuth(); // If your hook exposes a loading state
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Upcoming", "Pending", "Completed", "Cancelled"];

  const userEmail = user?.email || user?.userEmail;

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/mybookings", {
          params: { email: userEmail },
        });

        setBookings(response.data);
      } catch (err) {
        console.error(
          "Error fetching bookings:",
          err.response?.data || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [userEmail]);

  const filterBookings = bookings.filter(
    (item) => item.status?.toLowerCase() === activeTab.toLowerCase(),
  );

  if (loading || authLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[400px]">
        <BounceLoader color="#4f39f6" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            My Bookings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage all your mentorship sessions in one place.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab.toLowerCase() === tab.toLowerCase()
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {filterBookings.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              No {activeTab.toLowerCase()} bookings found.
            </div>
          ) : (
            filterBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Mentor Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      alt={booking.mentorName}
                      className="w-11 h-11 rounded-full object-cover bg-indigo-100"
                      src={
                        booking.avatarUrl || "https://via.placeholder.com/80"
                      }
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {booking.mentorName}
                      </p>
                      <p className="text-sm text-indigo-600 font-medium">
                        {booking.skill}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {booking.date} · {booking.time}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize bg-indigo-50 text-indigo-700">
                      {booking.status}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      ${booking.totalAmount}
                    </span>

                    <div className="flex gap-2">
                      <button className="text-xs font-medium border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                        Join Session
                      </button>
                      <button className="text-xs font-medium border border-rose-200 hover:bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
