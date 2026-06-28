import { Link } from "react-router-dom";

function FacilityCard({ facility }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800"
        alt={facility.name}
        className="h-56 w-full object-cover"
      />

      <div className="card-body">
        <h2 className="card-title">{facility.name}</h2>

        <p>📍 {facility.location}</p>

        <p>🏅 {facility.facility_type}</p>

        <p>৳ {facility.price_per_hour}/hour</p>

        <div className="card-actions justify-end">
          <Link to={`/facility/${facility._id}`} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
