import React, { useEffect, useState } from "react";
import "./SolarFlare.css";
import { GiAlienSkull } from "react-icons/gi";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

type SolarFlareType = {
  classType: string;
  peakTime: string;
};

const SolarFlare: React.FC = () => {
  const [data, setData] = useState<SolarFlareType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { startDate, endDate } = getDateRange();
        const res = await fetch(
          `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!Array.isArray(json)) throw new Error("Invalid data format");
        setData(json);
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
            className="hover-trigger"
            onMouseEnter={(e) => {
              setHover(true);
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({ x: rect.left + -240, y: rect.top + -110 });
            }}
            onMouseLeave={() => setHover(false)}
          >
            Solar Flares
          </h2>
          <GiAlienSkull color={'black'} size={30} />
        </div>
        

        <div className="donki-rs-content">
          <div className="sf-img"></div>
          <div className="sf-content">
            {loading && <p className="loading">Collecting solar flare data...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && data.length === 0 && <p>No solar flare activity detected.</p>}
            {!loading &&
              !error &&
              data.slice(0, 5).map((flare, i) => (
                <div key={i} className="flare-card">
                  <div className="flare-header">
                    <span className={`flare-class flare-${flare.classType?.charAt(0)}`}>
                      {flare.classType}
                    </span>
                  </div>
                  <div className="time-container">
                    <div className="time base">{new Date(flare.peakTime).toLocaleString()}</div>
                    <div className="time glitch red">{new Date(flare.peakTime).toLocaleString()}</div>
                    <div className="time glitch blue">{new Date(flare.peakTime).toLocaleString()}</div>
                  </div>
                </div>
              ))}

            <div className="flare-wrapper">
              <div className="flare-strengths">
                <span>A - Tiny - No effect</span>
                <span>B - Small - Barely noticeable</span>
                <span>C - Minor - Minor communication issues</span>
                <span>M - Medium - Radio blackouts possible</span>
                <span>X - Extreme - Major disruptions</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="description-portal"
        style={{
          top: pos.y,
          left: pos.x,
          opacity: hover ? 1 : 0,
          pointerEvents: hover ? "auto" : "none",
        }}
      >
        A sudden burst of energy from the sun’s surface. Causes massive releases of radiation which are caused by magnetic energy snapping and reconnecting that can last minutes to hours.
      </div>
    </>
  );
};

export default SolarFlare;