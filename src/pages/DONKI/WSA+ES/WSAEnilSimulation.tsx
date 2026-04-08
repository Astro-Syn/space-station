import { useEffect, useState } from 'react';
import './WSAEnilSimulation.css';
import { GiAlienSkull } from "react-icons/gi";


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
                     <GiAlienSkull color={'black'} size={30}/>
            </div>
           
           <div className='donki-rs-content'>
            <div className='wsa-img'></div>

            <div className='wsa-content'>


            
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.simulationID}</p>
                    <p><strong>Start:</strong> {item.modelCompletionTime}</p>
                </div>
            ))}
        </div>
         </div>
         </div>
    );
};

export default WASEnilSimulation;