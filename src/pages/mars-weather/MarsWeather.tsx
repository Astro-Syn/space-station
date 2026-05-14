import React, { useEffect, useState } from "react";
import './MarsWeather.css';

interface SolData {
  AT?: {
    av: number; // average temp
    mn: number; // min temp
    mx: number; // max temp
  };
  PRE?: {
    av: number; // pressure
  };
  WD?: {
    most_common?: {
      compass_point: string;
    };
  };
}

interface WeatherResponse {
  sol_keys: string[];
  [key: string]: any;
}

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const MarsWeather: React.FC = () => {
  const [weather, setWeather] = useState<SolData | null>(null);
  const [sol, setSol] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
      );

      if (!res.ok) throw new Error("Failed to fetch Mars weather");

      const data: WeatherResponse = await res.json();

      if (!data.sol_keys || data.sol_keys.length === 0) {
        throw new Error("No weather data available");
      }

      const latestSol = data.sol_keys[data.sol_keys.length - 1];
      setSol(latestSol);
      setWeather(data[latestSol]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading Mars Weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>No data available</p>;

 return (
  <div className="mars-container">
    <div className="mars-content">

      {/* LEFT PANEL */}
      <div className="mars-visual">
        <div className="mars-header">
          <h2>MARS WEATHER SYSTEM</h2>
          
        </div>

        <div className="mars-art">
          
          <div className="mars-overlay" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="mars-info">

        <div className="mars-title">
          <h2>INSIGHT DATA STREAM</h2>
          <p><span className='sol-deco'>///////////////////</span> Sol {sol} </p>
          
        </div>

        <div className="mars-data">
          <div className='mars-scroll'>

          
          <div className="data-card">
            <h3>Temperature</h3>
            <p>
              {weather.AT
                ? `${weather.AT.av}°C (min ${weather.AT.mn}° / max ${weather.AT.mx}°)`
                : "No data"}
            </p>
          </div>

          <div className="data-card">
            <h3>Pressure</h3>
            <p>{weather.PRE ? `${weather.PRE.av} Pa` : "No data"}</p>
          </div>

          <div className="data-card">
            <h3>Wind Vector</h3>
            <p>{weather.WD?.most_common?.compass_point || "No data"}</p>
          </div>

        </div>
      </div>
      </div>

    </div>
  </div>
);
};

export default MarsWeather;