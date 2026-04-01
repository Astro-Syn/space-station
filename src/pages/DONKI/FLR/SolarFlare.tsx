import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const SolarFlare: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/FLR?startDate=2023-01-01&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    
      <div className='donki-rs-wrapper'>
           <div className='donki-title2-container'>
            <h2>Solar Flares</h2>
      </div>
  
      
     <div>

     </div>
     <div className='donki-rs-content'>
      {data.slice(0, 5).map((flare, i) => (
        <div key={i}>
          <p>Class: {flare.classType}</p>
          <p>Peak Time: {flare.peakTime}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SolarFlare;