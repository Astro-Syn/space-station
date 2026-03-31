import { useEffect, useState } from 'react';

const SolarEnergeticParticle = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/SEP?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div>
            <h2>Solar Energetic Particles</h2>
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.sepID}</p>
                    <p><strong>Start:</strong> {item.eventTime}</p>
                </div>
            ))}
        </div>
    );
};

export default SolarEnergeticParticle;