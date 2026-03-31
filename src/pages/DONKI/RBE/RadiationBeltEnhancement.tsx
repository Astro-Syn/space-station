import { useEffect, useState } from 'react';

const RadiationBeltEnhancement = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/RBE?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div>
            <h2>Radiation Belt Enhancement</h2>
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.rbeID}</p>
                    <p><strong>Start:</strong> {item.eventTime}</p>
                </div>
            ))}
        </div>
    );
};

export default RadiationBeltEnhancement;