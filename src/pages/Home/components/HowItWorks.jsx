function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Browse Facilities",
      description:
        "Explore football fields, basketball courts, swimming pools and many more.",
    },
    {
      number: "02",
      title: "Choose Your Slot",
      description:
        "Select the available time slot that fits your schedule.",
    },
    {
      number: "03",
      title: "Book Instantly",
      description:
        "Confirm your booking and start playing without any hassle.",
    },
  ];

  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-3 opacity-70">
            Booking a sports facility has never been easier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body text-center">

                <div className="text-5xl font-bold text-primary">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

                <p>{step.description}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;