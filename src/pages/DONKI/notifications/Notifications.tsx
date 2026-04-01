import { useEffect, useState } from 'react';

const Notifications = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/notifications?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div>
            <div className='donki-title2-container'>
                     <h2>Notifications</h2>
            </div>
           
            {data.map((item, i) => (
                <div key={i}>
                    <p><strong>Message:</strong> {item.messageBody}</p>
                    <p><strong>Time:</strong> {item.messageIssueTime}</p>
                </div>
            ))}
        </div>
    );
};

export default Notifications;