import React, { useEffect, useState } from "react";
import './HighSpeedStream.css';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const HighSpeedStream: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/HSS?startDate=2023-01-01&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className='donki-rs-wrapper'>
      <div className="donki-title2-container">
          <h2>High Speed Streams</h2>
      </div>
    
    <div className='donki-rs-content'>
      <div className='hss-img'></div>
      <div className='hss-content'>

      
      {data.slice(0, 5).map((hss, i) => (
        <div key={i} className="donki-rs-text">
          <p>Event Time: {hss.eventTime}</p>
        </div>
      ))}
    </div>
      
    </div>
    </div>
  );
};

export default HighSpeedStream;