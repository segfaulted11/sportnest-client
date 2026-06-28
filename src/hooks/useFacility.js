import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";

function useFacility(id) {
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/facilities/${id}`)
      .then((res) => {
        setFacility(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { facility, loading };
}

export default useFacility;