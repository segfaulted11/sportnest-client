function Stats() {
  return (
    <section className="bg-primary text-primary-content py-20">
      <div className="container mx-auto">
        <div className="stats stats-vertical lg:stats-horizontal shadow flex justify-center w-full">
          <div className="stat">
            <div className="stat-value">100+</div>

            <div className="stat-title">Sports Facilities</div>
          </div>

          <div className="stat">
            <div className="stat-value">10K+</div>

            <div className="stat-title">Bookings</div>
          </div>

          <div className="stat">
            <div className="stat-value">99%</div>

            <div className="stat-title">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
