import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../services/axios";
import useAuth from "../../hooks/useAuth";

function ManageFacilities() {
  const { data } = useAuth();

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    if (!data?.user) return;

    axiosInstance.get(`/facilities/owner/${data.user.email}`).then((res) => {
      setFacilities(res.data);
    });
  }, [data]);

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete facility?");

    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/facilities/${id}`);

      setFacilities((prev) => prev.filter((facility) => facility._id !== id));

      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold mb-8">Manage Facilities</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {facilities.map((facility) => (
              <tr key={facility._id}>
                <td>{facility.name}</td>

                <td>{facility.facility_type}</td>

                <td>{facility.location}</td>

                <td>৳ {facility.price_per_hour}</td>

                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(facility._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageFacilities;
