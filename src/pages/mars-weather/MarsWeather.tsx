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

  if (loading) return <p>Scanning Martian atmosphere...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>No data available</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Mars Weather (InSight)</h2>
      <p><strong>Sol:</strong> {sol}</p>

      <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
        <p>
          <strong>Temperature:</strong>{" "}
          {weather.AT
            ? `${weather.AT.av}°C (min: ${weather.AT.mn}°C / max: ${weather.AT.mx}°C)`
            : "No data"}
        </p>

        <p>
          <strong>Pressure:</strong>{" "}
          {weather.PRE ? `${weather.PRE.av} Pa` : "No data"}
        </p>

        <p>
          <strong>Wind Direction:</strong>{" "}
          {weather.WD?.most_common?.compass_point || "No data"}
        </p>
      </div>
    </div>
  );
};

export default MarsWeather;