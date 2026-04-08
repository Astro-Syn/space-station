import React, { useEffect, useState } from "react";
import "./GeomagneticStorm.css";
import { GiAlienSkull } from "react-icons/gi";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

type GST = {
  startTime: string;
  allKpIndex?: {
    kpIndex: number;
    observedTime: string;
  }[];
};

const CACHE_KEY = "gst_data";
const CACHE_DURATION = 1000 * 60 * 30; 

const GeomagneticStorm: React.FC = () => {
  const [data, setData] = useState<GST[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const getDateRange = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);

    const format = (d: Date) => d.toISOString().split("T")[0];

    return {
      startDate: format(past),
      endDate: format(today),
    };
  };

  
  const fetchWithRetry = async (url: string, retries = 2): Promise<any> => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 503 && retries > 0) {
          console.warn("503 received, retrying...");
          await new Promise((r) => setTimeout(r, 1000));
          return fetchWithRetry(url, retries - 1);
        }
        throw new Error(`HTTP ${res.status}`);
      }

      return res.json();
    } catch (err) {
      if (retries > 0) {
        return fetchWithRetry(url, retries - 1);
      }
      throw err;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);

          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const { startDate, endDate } = getDateRange();

        const url = `https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`;

        const json = await fetchWithRetry(url);

        if (!Array.isArray(json)) {
          throw new Error("Invalid data format");
        }

        setData(json);

        
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: json,
            timestamp: Date.now(),
          })
        );
      } catch (err: any) {
        console.error("GST fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donki-rs-wrapper">
      <div className="donki-title2-container">
        <h2>Geomagnetic Storms</h2>
        <GiAlienSkull color={'black'} size={30} />
      </div>

      <div className="donki-rs-content">
        <div className="gms-img"></div>
        <div className='gms-content'>

        
        
        {loading && <p>Loading geomagnetic storm data...</p>}

        
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        
        {!loading && !error && data.length === 0 && (
          <p>No geomagnetic storm data found.</p>
        )}

       
        {!loading &&
          !error &&
          data.slice(0, 5).map((storm, i) => (
            <div key={i} className="donki-card">
              <p><strong>Start:</strong> {storm.startTime}</p>
              <p>
                <strong>Kp Index:</strong>{" "}
                {storm.allKpIndex?.[0]?.kpIndex ?? "Unknown"}
              </p>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default GeomagneticStorm;