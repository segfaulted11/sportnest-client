import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../services/axios";

function UpdateFacility() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    facility_type: "",
    image: "",
    location: "",
    price_per_hour: "",
    capacity: "",
    available_slots: "",
    description: "",
  });

  useEffect(() => {
    axiosInstance.get(`/facilities/${id}`).then((res) => {
      const facility = res.data;

      setForm({
        ...facility,
        available_slots: facility.available_slots.join(", "),
      });
    });
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
 const { _id, ...facilityData } = form;

await axiosInstance.put(`/facilities/${id}`, {
  ...facilityData,
  price_per_hour: Number(form.price_per_hour),
  capacity: Number(form.capacity),
  available_slots: form.available_slots
    .split(",")
    .map((slot) => slot.trim()),
});

      toast.success("Facility updated!");

      navigate("/manage-facilities");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-14 px-4">

      <h1 className="text-4xl font-bold mb-8">
        Update Facility
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          className="input input-bordered w-full"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          name="facility_type"
          value={form.facility_type}
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          type="number"
          name="price_per_hour"
          value={form.price_per_hour}
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          name="available_slots"
          value={form.available_slots}
          onChange={handleChange}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          rows="5"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-full">
          Update Facility
        </button>

      </form>

    </div>
  );
}

export default UpdateFacility;