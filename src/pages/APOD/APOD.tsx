import { useEffect, useState } from 'react';
import './APOD.css';

interface APODData {
    title: string;
    date: string;
    explanation: string;
    url: string;
    media_type: 'image' | 'video';
}

const APOD = () => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const [data, setData] = useState<APODData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAPOD = async () => {
            try {
                const res = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
                );

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const json: APODData = await res.json();
                setData(json);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchAPOD();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!data) return null;

    return (
        <div className='APOD-container'>
            <div className='date-time'>
            <h2>{data.title}</h2>
            <p>{data.date}</p>
            </div>
            
            <div className='img-info-container'>
            {data.media_type === 'image' ? (
                <div className='APOD-img-container'>
                <img
                    className='APOD-img'
                    src={data.url}
                    alt={data.title}
                    
                />
                </div>
            ) : (
                <iframe
                    src={data.url}
                    title={data.title}
                    
                    allowFullScreen
                />
            )}
            <div>
            <p>{data.explanation}</p>
            </div>
        </div>
        </div>
    );
};

export default APOD;