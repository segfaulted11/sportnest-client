import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarCheck, MapPin, Users } from "lucide-react";
import toast from "react-hot-toast";

import Loading from "../../components/shared/Loading";
import useFacility from "../../hooks/useFacility";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../services/axios";

function FacilityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { facility, loading } = useFacility(id);
const { user } = useAuth();

  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);

  if (loading) return <Loading />;

  if (!facility) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold">Facility not found</h2>
      </div>
    );
  }

  const totalPrice = Number(hours) * facility.price_per_hour;

  async function handleBooking() {
    if (!bookingDate || !timeSlot) {
      return toast.error("Please complete the form.");
    }

    if (!user) {
      return toast.error("Please login first.");
    }

    try {
      await axiosInstance.post("/bookings", {
        facility_id: facility._id,
        facility_name: facility.name,
        user_email: user.email,
        booking_date: bookingDate,
        time_slot: timeSlot,
        hours: Number(hours),
        total_price: totalPrice,
      });

      toast.success("Booking successful!");

      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed.");
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <img
          src={facility.image}
          alt={facility.name}
          className="rounded-3xl w-full h-[450px] object-cover shadow-xl"
        />

        <div>
          <div className="badge badge-primary mb-4">
            {facility.facility_type}
          </div>

          <h1 className="text-5xl font-bold mb-6">
            {facility.name}
          </h1>

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

          <h3 className="text-2xl font-bold mb-4">
            Available Time Slots
          </h3>

          <div className="flex flex-wrap gap-3 mb-8">
            {facility.available_slots.map((slot) => (
              <div
                key={slot}
                className="badge badge-outline badge-lg"
              >
                {slot}
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-3">
            Description
          </h3>

          <p className="opacity-80 leading-8 mb-10">
            {facility.description}
          </p>

          {/* Booking Card */}

          <div className="card bg-base-200 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              Book This Facility
            </h2>

            <div className="space-y-4">
              <input
                type="date"
                className="input input-bordered w-full"
                value={bookingDate}
                onChange={(e) =>
                  setBookingDate(e.target.value)
                }
              />

              <select
                className="select select-bordered w-full"
                value={timeSlot}
                onChange={(e) =>
                  setTimeSlot(e.target.value)
                }
              >
                <option value="">
                  Select Time Slot
                </option>

                {facility.available_slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                className="input input-bordered w-full"
                value={hours}
                onChange={(e) =>
                  setHours(e.target.value)
                }
              />

              <div className="alert">
                <span className="font-bold">
                  Total Price: ৳ {totalPrice}
                </span>
              </div>

              <button
                onClick={handleBooking}
                className="btn btn-primary w-full"
              >
                <CalendarCheck size={20} />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FacilityDetails;