import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { BounceLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";

const BookingCheckout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const bookingDataFromState = location.state?.bookingData;

  const [step, setStep] = useState(1);
  const [mentor, setMentor] = useState(null);

  const [selectedSkill, setSelectedSkill] = useState("System Design");
  const [duration, setDuration] = useState("60 min");
  const [selectedDate, setSelectedDate] = useState(
    bookingDataFromState?.date || "",
  );
  const [selectedTime, setSelectedTime] = useState(
    bookingDataFromState?.time || "",
  );

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/mentors/${id}`)
        .then((response) => {
          setMentor(response.data);
          if (response.data.skills?.length > 0) {
            setSelectedSkill(response.data.skills[0]);
          }
        })
        .catch((err) => {
          console.error("Error fetching mentor details:", err);
        });
    }
  }, [id]);

  if (!mentor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BounceLoader color="#4f39f6" />
      </div>
    );
  }

  const mentorName = mentor?.name || bookingDataFromState?.mentorName;
  const mentorRole = mentor?.role;
  const mentorCompany = mentor?.company;
  const mentorRating = mentor?.rating;
  const mentorSessions = mentor?.sessionCount;
  const mentorAvatar = mentor?.avatarUrl;
  const hourlyRate = mentor?.hourlyRate || bookingDataFromState?.hourlyRate;

  const calculateTotal = () => {
    if (duration === "30 min") return Math.round(hourlyRate * 0.5);
    if (duration === "90 min") return Math.round(hourlyRate * 1.5);
    return hourlyRate;
  };
  const totalAmount = calculateTotal();
  const skillsList =
    mentor?.skills && mentor.skills.length > 0
      ? mentor.skills
      : ["System Design", "Node.js", "PostgreSQL", "AWS"];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleConfirmBooking = async () => {
    if (!user) {
      setStatusMessage({
        type: "error",
        text: "Please log in before booking a session.",
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      setStatusMessage({
        type: "error",
        text: "Please ensure a date and time are selected.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const newBooking = {
      mentorId: mentor?._id || bookingDataFromState?.mentorId || id,
      mentorName,
      hourlyRate,
      date: selectedDate,
      time: selectedTime,
      duration,
      skill: selectedSkill,
      totalAmount,
      userEmail: user.email,
      userName: user.displayName || user.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/bookings",
        newBooking,
      );
      setStatusMessage({
        type: "success",
        text: response.data.message || "Session booked successfully!",
      });
      setTimeout(() => navigate("/find-mentors"), 2000);
    } catch (error) {
      console.error("Booking error:", error);
      setStatusMessage({
        type: "error",
        text:
          error.response?.data?.error ||
          "Failed to book session. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Select Mentor" },
    { num: 2, label: "Select Date" },
    { num: 3, label: "Select Time" },
    { num: 4, label: "Confirm" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-center mb-10 gap-2">
        {steps.map((s, index) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= s.num
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${step >= s.num ? "text-indigo-600" : "text-slate-400"}`}
              >
                {s.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 rounded ${step > s.num ? "bg-indigo-600" : "bg-slate-200"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm ${statusMessage.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-8">
        <div className="sm:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-display font-semibold text-slate-900 mb-6 text-lg">
                Your Selected Mentor
              </h2>
              <div className="flex items-start gap-4 mb-8">
                <img
                  alt={mentorName}
                  className="w-16 h-16 rounded-2xl object-cover bg-indigo-100"
                  src={mentorAvatar}
                />
                <div>
                  <h3 className="font-display font-semibold text-slate-900">
                    {mentorName}
                  </h3>
                  <p className="text-sm text-slate-500 mb-1">
                    {mentorRole} @ {mentorCompany}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-amber-400">★</span> {mentorRating} ·{" "}
                    {mentorSessions} sessions
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-slate-700 block mb-3">
                  What do you want to learn?
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        selectedSkill === skill
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-sm font-medium text-slate-700 block mb-3">
                  Session duration
                </label>
                <div className="flex gap-3">
                  {["30 min", "60 min", "90 min"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border cursor-pointer ${
                        duration === d
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-display font-semibold text-slate-900 mb-6 text-lg">
                Select a Date
              </h2>

              <div className="flex flex-wrap gap-3 mb-8">
                {mentor.bookingDetails?.availableDays?.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors border cursor-pointer ${
                      selectedDate === day
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {day}
                  </button>
                )) || (
                  <p className="text-sm text-slate-500">No dates available.</p>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedDate}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-display font-semibold text-slate-900 mb-6 text-lg">
                Select a Time
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {mentor.bookingDetails?.timeSlots?.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors border cursor-pointer ${
                      selectedTime === time
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {time}
                  </button>
                )) || (
                  <p className="text-sm text-slate-500 col-span-2">
                    No times available.
                  </p>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedTime}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-display font-semibold text-slate-900 mb-6 text-lg">
                Confirm Your Booking
              </h2>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex items-center gap-4">
                <img
                  alt={mentorName}
                  className="w-12 h-12 rounded-full object-cover"
                  src={mentorAvatar}
                />
                <div>
                  <p className="font-semibold text-slate-900">{mentorName}</p>
                  <p className="text-sm text-indigo-600 font-medium">
                    {selectedSkill}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 mb-8 border-b border-slate-100 pb-6">
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-semibold text-slate-900">
                    {selectedDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time</span>
                  <span className="font-semibold text-slate-900">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-slate-900">
                    {duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rate</span>
                  <span className="font-semibold text-slate-900">
                    ${hourlyRate}/hr
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  {isSubmitting
                    ? "Processing..."
                    : `Confirm Booking — $${totalAmount}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 h-fit sticky top-20 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-5">
            Booking Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <img
                alt={mentorName}
                className="w-10 h-10 rounded-full object-cover bg-indigo-100"
                src={mentorAvatar}
              />
              <span className="font-semibold text-slate-900">{mentorName}</span>
            </div>
            <div className="flex justify-between text-slate-500 pt-2">
              <span>Skill</span>
              <span className="font-medium text-slate-900">
                {selectedSkill || "-"}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Date</span>
              <span className="font-medium text-slate-900">
                {selectedDate || "-"}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Time</span>
              <span className="font-medium text-slate-900">
                {selectedTime || "-"}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Duration</span>
              <span className="font-medium text-slate-900">{duration}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-4 font-bold text-slate-900 text-base mt-2">
              <span>Total</span>
              <span className="text-indigo-600">${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;
