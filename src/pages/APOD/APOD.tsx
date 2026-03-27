import { useEffect, useState } from 'react';


interface APODData {
    title: string;
    date: string;
    explanation: string;
    url: string;
    media_type: 'image' | 'video';
}

const APOD = () => {
    const [data, setData] = useState<APODData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAPOD = async () => {
            try {
                const res = await fetch(
                    'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
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
        <div>
            <h2>{data.title}</h2>
            <p>{data.date}</p>

            {data.media_type === 'image' ? (
                <img
                    src={data.url}
                    alt={data.title}
                    style={{ width: '100%' }}
                />
            ) : (
                <iframe
                    src={data.url}
                    title={data.title}
                    width="100%"
                    height="400px"
                    allowFullScreen
                />
            )}

            <p>{data.explanation}</p>
        </div>
    );
};

export default APOD;