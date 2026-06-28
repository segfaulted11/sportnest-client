import { Link } from "react-router-dom";

function FacilityCard({ facility }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <img
      src={facility.image}
        alt={facility.name}
        className="h-56 w-full object-cover"
      />

      <div className="card-body">
        <h2 className="card-title">{facility.name}</h2>

<p className="text-gray-500">
  📍 {facility.location}.
</p>

<div className="badge badge-secondary">
  {facility.facility_type}
</div>

   <p className="text-xl font-bold text-primary">
  ৳ {facility.price_per_hour}/hour
</p>

        <div className="card-actions justify-end">
<Link
  to={`/facility/${facility._id}`}
  className="btn btn-primary w-full"
>
  Book Now
</Link>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
