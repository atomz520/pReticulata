import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

export function useFishInfo() {
  const [fishInfo, setFishInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/info`)
      .then((res) => res.json())
      .then(setFishInfo)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { fishInfo, loading, error };
}
