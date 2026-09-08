const TopMessage = () => {
  return (
    <div className="font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-indigo-600 mb-1">
            10K+
          </div>
          <div className="text-sm text-slate-500 font-medium">Learners</div>
        </div>
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-indigo-600 mb-1">
            2K+
          </div>
          <div className="text-sm text-slate-500 font-medium">Mentors</div>
        </div>
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-indigo-600 mb-1">
            50+
          </div>
          <div className="text-sm text-slate-500 font-medium">Skills</div>
        </div>
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-indigo-600 mb-1">
            25K+
          </div>
          <div className="text-sm text-slate-500 font-medium">Sessions</div>
        </div>
      </div>
    </div>
  );
};

export default TopMessage;
