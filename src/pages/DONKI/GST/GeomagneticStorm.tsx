import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const GeomagneticStorm: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/GST?startDate=2023-01-01&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className='donki-title2-container'>
        <h2>Geomagnetic Storms</h2>
      </div>
      
      {data.slice(0, 5).map((storm, i) => (
        <div key={i}>
          <p>Start: {storm.startTime}</p>
        </div>
      ))}
    </div>
  );
};

export default GeomagneticStorm;