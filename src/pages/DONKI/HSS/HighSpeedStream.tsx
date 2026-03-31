import React, { useEffect, useState } from "react";

const API_KEY = "DEMO_KEY";

const HighSpeedStream: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/HSS?startDate=2023-01-01&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>High Speed Streams</h2>
      {data.slice(0, 5).map((hss, i) => (
        <div key={i}>
          <p>Event Time: {hss.eventTime}</p>
        </div>
      ))}
    </div>
  );
};

export default HighSpeedStream;