import { useParams } from "react-router-dom";
import { CalendarCheck, MapPin, Users } from "lucide-react";

import Loading from "../../components/shared/Loading";
import useFacility from "../../hooks/useFacility";

function FacilityDetails() {
  const { id } = useParams();

  const { facility, loading } = useFacility(id);

  if (loading) return <Loading />;

  if (!facility) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold">Facility not found</h2>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <img
          src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200"
          alt={facility.name}
          className="rounded-3xl w-full h-[450px] object-cover shadow-xl"
        />

        <div>
          <div className="badge badge-primary mb-4">
            {facility.facility_type}
          </div>

          <h1 className="text-5xl font-bold mb-6">{facility.name}</h1>

          <div className="space-y-4 text-lg">
            <p className="flex items-center gap-2">
              <MapPin size={20} />
              {facility.location}
            </p>

            <p>
              💰
              <span className="font-bold text-primary">
                {" "}
                ৳ {facility.price_per_hour}/hour
              </span>
            </p>

            <p className="flex items-center gap-2">
              <Users size={20} />
              Capacity: {facility.capacity}
            </p>

            <p>📈 Total Bookings: {facility.booking_count}</p>
          </div>

          <div className="divider"></div>

          <h3 className="text-2xl font-bold mb-4">Available Time Slots</h3>

          <div className="flex flex-wrap gap-3 mb-8">
            {facility.available_slots.map((slot) => (
              <div key={slot} className="badge badge-outline badge-lg">
                {slot}
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-3">Description</h3>

          <p className="opacity-80 leading-8 mb-10">{facility.description}</p>

          <button className="btn btn-primary btn-lg">
            <CalendarCheck size={20} />
            Book This Facility
          </button>
        </div>
      </div>
    </section>
  );
}

export default FacilityDetails;
