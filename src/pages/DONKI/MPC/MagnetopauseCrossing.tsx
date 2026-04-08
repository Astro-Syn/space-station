import { useEffect, useState } from 'react';
import './MagnetopauseCrossing.css';
import { GiAlienSkull } from "react-icons/gi";


const MagnetopauseCrossing = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/MPC?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div className='donki-rs-wrapper'>

            <div className='donki-title2-container'>
                <h2>Magnetopause Crossing</h2>
                <GiAlienSkull color={'black'} size={30} />
            </div>
            

            <div className='donki-rs-content'>
            <div className='mpc-img'></div>
            

            <div className='mpc-content'>

            
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.mpcID}</p>
                    <p><strong>Time:</strong> {item.eventTime}</p>
                </div>
            ))}
        </div>
        </div>
        </div>
    );
};

export default MagnetopauseCrossing;