import { useEffect, useState } from "react";

import axiosInstance from "../../../services/axios";

import Loading from "../../../components/shared/Loading";

import FacilityCard from "../../../components/facility/FacilityCard";

function FeaturedFacilities() {
  const [facilities, setFacilities] = useState([]);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchFacilities() {
    try {
      const res = await axiosInstance.get("/facilities");

      setFacilities(res.data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  fetchFacilities();
}, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-24 container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Facilities
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility) => (
          <FacilityCard key={facility._id} facility={facility} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedFacilities;
