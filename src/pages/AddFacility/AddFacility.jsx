import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../services/axios";
import useAuth from "../../hooks/useAuth";

function AddFacility() {
  const navigate = useNavigate();
  const { data } = useAuth();

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

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axiosInstance.post("/facilities", {
        ...form,
        price_per_hour: Number(form.price_per_hour),
        capacity: Number(form.capacity),
        available_slots: form.available_slots
          .split(",")
          .map((slot) => slot.trim()),
        owner_email: data.user.email,
        booking_count: 0,
      });

      toast.success("Facility Added!");

      navigate("/manage-facilities");
    } catch (err) {
      console.log(err);
      toast.error("Failed");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-14 px-4">

      <h1 className="text-4xl font-bold mb-8">
        Add Facility
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          className="input input-bordered w-full"
          placeholder="Facility Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Facility Type"
          name="facility_type"
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Image URL"
          name="image"
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Location"
          name="location"
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Price Per Hour"
          type="number"
          name="price_per_hour"
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Capacity"
          type="number"
          name="capacity"
          onChange={handleChange}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Available Slots (comma separated)"
          name="available_slots"
          onChange={handleChange}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          name="description"
          rows="5"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-full"
        >
          Add Facility
        </button>

      </form>

    </div>
  );
}

export default AddFacility;