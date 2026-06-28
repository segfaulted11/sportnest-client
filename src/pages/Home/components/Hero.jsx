import { Link } from "react-router-dom";
import { Trophy, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero min-h-[85vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900"
          className="rounded-3xl shadow-2xl lg:w-[550px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge badge-primary badge-lg mb-5">
            #1 Sports Booking Platform
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Book Your
            <span className="text-primary"> Favorite Sports </span>
            Facility Instantly
          </h1>

          <p className="py-8 text-lg opacity-80">
            Football turfs, badminton courts, swimming pools and much more — all
            in one place.
          </p>

          <div className="flex gap-4">
            <Link to="/facilities" className="btn btn-primary">
              <CalendarCheck size={20} />
              Explore Facilities
            </Link>

            <button className="btn btn-outline">
              <Trophy size={20} />
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
