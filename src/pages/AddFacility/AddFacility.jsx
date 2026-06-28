import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../services/axios";
import useAuth from "../../hooks/useAuth";

function AddFacility() {
  const navigate = useNavigate();
  const { data } = useAuth();

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    facility_type: "",
    image: null,
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

  async function uploadImage(file) {
    if (!file) {
      throw new Error("Please select an image.");
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      console.log("ImgBB Response:", result);

      if (!result.success) {
        throw new Error(result.error?.message || "Image upload failed");
      }

      return result.data.url;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(form.image);

      const facilityData = {
        name: form.name,
        facility_type: form.facility_type,
        image: imageUrl,
        location: form.location,
        price_per_hour: Number(form.price_per_hour),
        capacity: Number(form.capacity),
        available_slots: form.available_slots
          .split(",")
          .map((slot) => slot.trim()),
        description: form.description,
        owner_email: data.user.email,
        booking_count: 0,
      };

      console.log("Sending to MongoDB:", facilityData);

      await axiosInstance.post("/facilities", facilityData);

      toast.success("Facility Added!");

      navigate("/manage-facilities");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to add facility");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Add Facility
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          className="input input-bordered w-full"
          placeholder="Facility Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Facility Type"
          name="facility_type"
          value={form.facility_type}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Price Per Hour"
          type="number"
          name="price_per_hour"
          value={form.price_per_hour}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Capacity"
          type="number"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Available Slots (comma separated)"
          name="available_slots"
          value={form.available_slots}
          onChange={handleChange}
          required
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          name="description"
          rows="5"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : "Add Facility"}
        </button>

      </form>
    </div>
  );
}

export default AddFacility;