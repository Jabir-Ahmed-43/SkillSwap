const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Discover a Skill",
      description:
        "Browse 50+ in-demand skills across tech, design, business, and creative fields.",
    },
    {
      number: "02",
      title: "Find the Right Mentor",
      description:
        "Filter by expertise, ratings, price, and availability to find your ideal match.",
    },
    {
      number: "03",
      title: "Book a Session",
      description:
        "Choose a time that works for you and confirm in seconds — no back-and-forth emails.",
    },
    {
      number: "04",
      title: "Start Learning",
      description:
        "Meet 1-on-1, get personalized guidance, and track your progress over time.",
    },
  ];

  return (
    <div className="bg-base-200">
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
      >
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
            How It Works
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Get from zero to skilled in four simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl font-display font-bold text-indigo-100 mb-3">
                {step.number}
              </div>
              <h3 className="font-display font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
