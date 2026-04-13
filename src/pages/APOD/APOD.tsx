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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchAPOD = async () => {
        let attempts = 0;

        while (attempts < 3) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 5000);

                const res = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
                    { signal: controller.signal }
                );

                clearTimeout(timeout);

                if (!res.ok) throw new Error("Bad response");

                const json: APODData = await res.json();

                
                if (json.media_type === "video") {
                    throw new Error("Got video, retrying...");
                }

                setData(json);
                return;

            } catch (err) {
                attempts++;
                if (attempts >= 3) {
                    setError("Failed to fetch NASA data");
                }
            }
        }

        setLoading(false);
    };

    fetchAPOD();
}, []);

    
    const [loadingText, setLoadingText] = useState("Looking for photo");

useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
        i = (i + 1) % 4;
        setLoadingText("Looking for photo" + ".".repeat(i));
    }, 400);

    return () => clearInterval(interval);
}, []);

if (loading) {
    return (
        <div className="apod-loading">
            <p>{loadingText}</p>
        </div>
    );
}


    if (error) return <p>{error}</p>;
    if (!data) return null;

    return (
        <div className='APOD-container'>
            {/* Info / Title */}
            <div className='info-container'>
                <div className='date-time'>
                    <h2>{data.title}</h2>
                    <p>{data.date}</p>
                </div>
            </div>

            {/* Media */}
            <div className='media-container'>
                  {/* Explanation */}
            <div className='explain-container'>
                <p>{data.explanation}</p>
            </div>
                {data.media_type === 'image' ? (
                    
                    <div className='img-wrapper'>
                        <div className='img-header-container'>
                            <h2>Photo</h2>
                        </div>
                        <div className='img-container'>
                            <img
                                className='APOD-img'
                                src={data.url}
                                alt={data.title}
                            />
                        </div>
                      
                    </div>
                    
                ) : (
                    <iframe
                        className='APOD-video'
                        src={data.url}
                        title={data.title}
                        allowFullScreen
                    />
                )}
            </div>

            
        </div>
    );
};

export default APOD;