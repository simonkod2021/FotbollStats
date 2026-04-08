import { useEffect, useState } from "react";

export function useMatchData(matchRoute) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!matchRoute?.loadData) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    matchRoute
      .loadData()
      .then((module) => {
        setData(module.default);
      })
      .catch((err) => {
        console.error("Kunde inte ladda matchdata:", err);
        setError(err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [matchRoute]);

  return { data, loading, error };
}
