import { useEffect, useState } from 'react';
import './SolarEnergeticParticle.css';
import { GiAlienSkull } from "react-icons/gi";

const SolarEnergeticParticle = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/SEP?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div className='donki-rs-wrapper'>
            
            <div className='donki-title2-container'>
                <h2>Solar Energetic Particles</h2>
                <GiAlienSkull color={'black'} size={30}/>
            </div>
            
            <div className='donki-rs-content'>
                <div className='sep-img'></div>

                <div className='sep-content'>

                
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.sepID}</p>
                    <p><strong>Start:</strong> {item.eventTime}</p>
                </div>
            ))}
        </div>
        </div>
        </div>
    );
};

export default SolarEnergeticParticle;