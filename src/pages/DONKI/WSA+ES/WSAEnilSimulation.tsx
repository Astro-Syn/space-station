import { useEffect, useState } from 'react';

const WASEnilSimulation = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/WSAEnlilSimulations?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div className='donki-rs-wrapper'>
            <div className='donki-title2-container'>
                     <h2>WSA-Enlil Simulations</h2>
            </div>
           
           <div className='donki-rs-content'>
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.simulationID}</p>
                    <p><strong>Start:</strong> {item.modelCompletionTime}</p>
                </div>
            ))}
        </div>
         </div>
    );
};

export default WASEnilSimulation;