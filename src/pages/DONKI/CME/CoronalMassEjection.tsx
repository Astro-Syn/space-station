import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const CoronalMassEjection: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/CME?startDate=2023-01-01&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Coronal Mass Ejections</h2>
      {data.slice(0, 5).map((item, i) => (
        <div key={i}>
          <p>Date: {item.startTime}</p>
          <p>Source: {item.sourceLocation}</p>
        </div>
      ))}
    </div>
  );
};

export default CoronalMassEjection;