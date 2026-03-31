import { useEffect, useState } from 'react';

const MagnetopauseCrossing = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/MPC?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div>
            <h2>Magnetopause Crossing</h2>
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>ID:</strong> {item.mpcID}</p>
                    <p><strong>Time:</strong> {item.eventTime}</p>
                </div>
            ))}
        </div>
    );
};

export default MagnetopauseCrossing;