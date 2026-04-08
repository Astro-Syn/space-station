import { useEffect, useState } from 'react';
import './RadiationBeltEnhancement.css';
import { GiAlienSkull } from "react-icons/gi";


const RadiationBeltEnhancement = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/RBE?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        
            <div className='donki-rs-wrapper'>
                  <div className='donki-title2-container'>
                <h2>Radiation Belt Enhancement</h2>
                <GiAlienSkull color={'black'} size={30} />
            </div>
            
          
            <div className='donki-rs-content'>
                <div className='rbe-img'></div>

                <div className='rbe-content'>

                
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.rbeID}</p>
                    <p><strong>Start:</strong> {item.eventTime}</p>
                </div>
            ))}
        </div>
        </div>
        </div>
    );
};

export default RadiationBeltEnhancement;