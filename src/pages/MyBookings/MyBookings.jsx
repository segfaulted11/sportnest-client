import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../services/axios";
import useAuth from "../../hooks/useAuth";

function MyBookings() {
const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!user) {
    setLoading(false);
    return;
  }

  axiosInstance
    .get(`/bookings/my?email=${user.email}`)
    .then((res) => {
      setBookings(res.data);
    })
    .catch((err) => {
      console.error(err);
      toast.error("Failed to load bookings");
    })
    .finally(() => {
      setLoading(false);
    });
}, [user]);

  async function handleCancel(id) {
    try {
      await axiosInstance.patch(`/bookings/${id}/cancel`);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking,
        ),
      );

      toast.success("Booking cancelled");
    } catch (err) {
      toast.error("Failed");
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Facility</th>

              <th>Date</th>

              <th>Time Slot</th>

              <th>Hours</th>

              <th>Total</th>

              <th>Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.facility_name}</td>

                <td>{booking.booking_date}</td>

                <td>{booking.time_slot}</td>

                <td>{booking.hours}</td>

                <td>৳ {booking.total_price}</td>

                <td>
                  <span
                    className={`badge ${
                      booking.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td>
                  {booking.status === "pending" && (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyBookings;
