import React, { useEffect, useState } from "react";
import "./SolarFlare.css";

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
  <div className="sf-img">
    </div>
    <div className='sf-content'>
  
  {data.slice(0, 5).map((flare, i) => (
    <div key={i} className="flare-card">
      
      <div className="flare-header">
        <span className={`flare-class flare-${flare.classType?.charAt(0)}`}>
          {flare.classType}
        </span>
      </div>


    <div className='time-container'>
      <div className="time base">
        {new Date(flare.peakTime).toLocaleString()}
      </div>

      <div className="time glitch red">
        {new Date(flare.peakTime).toLocaleString()}
      </div>

      <div className="time glitch blue">
        {new Date(flare.peakTime).toLocaleString()}
      </div>

    </div>
    </div>
  ))}
</div>
</div>
    </div>
  );
};

export default SolarFlare;