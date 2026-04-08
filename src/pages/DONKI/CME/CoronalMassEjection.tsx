import React, { useEffect, useState } from "react";
import './CoronalMassEjection.css';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

type CME = {
  startTime: string;
  sourceLocation: string;
};

const CACHE_KEY = "cme_data";
const CACHE_DURATION = 1000 * 60 * 30;

const CoronalMassEjection: React.FC = () => {
  const [data, setData] = useState<CME[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const getDateRange = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);
    const format = (d: Date) => d.toISOString().split("T")[0];
    return { startDate: format(past), endDate: format(today) };
  };

  const fetchWithRetry = async (url: string, retries = 2): Promise<any> => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 503 && retries > 0) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchWithRetry(url, retries - 1);
        }
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    } catch (err) {
      if (retries > 0) return fetchWithRetry(url, retries - 1);
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
        const url = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`;
        const json = await fetchWithRetry(url);

        if (!Array.isArray(json)) throw new Error("Invalid data format");

        setData(json);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: json, timestamp: Date.now() })
        );
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="donki-rs-wrapper">
        <div className="donki-title2-container">
          <h2
            onMouseEnter={(e) => {
              setHover(true);
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({ x: rect.left, y: rect.bottom + 5 });
            }}
            onMouseLeave={() => setHover(false)}
          >
            Coronal Mass Ejections
          </h2>
        </div>

        <div className="donki-rs-content">
          <div className="cme-img"></div>

          {loading && <p>Loading CME data...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {!loading && !error && data.length === 0 && <p>No CME data found.</p>}

          {!loading &&
            !error &&
            data.slice(0, 5).map((item, i) => (
              <div key={i} className="donki-card">
                <p>
                  <strong>Date:</strong> {item.startTime}
                </p>
                <p>
                  <strong>Source:</strong> {item.sourceLocation || "Unknown"}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`description-portal ${hover ? "show" : ""}`}
        style={{ left: pos.x }}
      >
        Coronal Mass Ejections (CMEs) are massive bursts of solar wind and magnetic fields rising above the solar corona or being released into space, which can affect satellites, communications, and power grids on Earth.
      </div>
    </>
  );
};

export default CoronalMassEjection;