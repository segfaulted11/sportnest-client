import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import FacilityCard from "../../components/facility/FacilityCard";
import Loading from "../../components/shared/Loading";

function AllFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/facilities", {
          params: {
            search: debouncedSearch,
            type,
          },
        });

        // Change this if your API returns { data: [...] }
        setFacilities(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [debouncedSearch, type]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-10">
        All Facilities
      </h1>

      <div className="flex flex-col md:flex-row gap-5 mb-10">
        <input
          type="text"
          placeholder="Search facility..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered md:w-64"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Sports</option>
          <option value="Football">Football</option>
          <option value="Badminton">Badminton</option>
          <option value="Swimming">Swimming</option>
          <option value="Basketball">Basketball</option>
          <option value="Cricket">Cricket</option>
          <option value="Tennis">Tennis</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : facilities.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            No facilities found.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility._id}
              facility={facility}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AllFacilities;