import { useEffect, useState } from 'react';

const SolarFlare = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/FLR?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div>
            <h2>Solar Flares</h2>
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.flrID}</p>
                    <p><strong>Class:</strong> {item.classType}</p>
                    <p><strong>Start:</strong> {item.beginTime}</p>
                </div>
            ))}
        </div>
    );
};

export default SolarFlare;