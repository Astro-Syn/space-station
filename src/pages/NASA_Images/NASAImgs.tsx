import { useEffect, useState } from 'react';
import './NASAImgs.css';

interface NasaItem {
    nasa_id: string;
    title: string;
    description: string;
    media_type: 'image' | 'video';
    preview: string;
}

const NASAImgs = () => {
    const [query, setQuery] = useState('mars');
    const [items, setItems] = useState<NasaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async (search: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `https://images-api.nasa.gov/search?q=${search}&media_type=image,video`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();

            const results: NasaItem[] = data.collection.items
                
                .filter((item: any) => item.data && item.data[0])
                .map((item: any) => ({
                    nasa_id: item.data[0].nasa_id,
                    title: item.data[0].title || 'No title',
                    description:
                        item.data[0].description || 'No description available',
                    media_type: item.data[0].media_type,
                    preview: item.links?.[0]?.href || ''
                }))
                
                .filter((item: NasaItem) => item.preview !== '');

            setItems(results);
        } catch (err) {
            console.error(err);
            setError('Something went wrong while fetching NASA media.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(query);
    }, []);

    return (
        <div className="nasa-imgs-container">
            <h2>NASA Media Library</h2>

            
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search space stuff..."
                />
                <button className='search-btn' onClick={() => fetchImages(query)}>Search</button>
            </div>

            
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            
            <div className="grid">
                {items.map((item) => (
                    <div key={item.nasa_id} className="card">
                        
                        {item.media_type === 'image' ? (
                            <img src={item.preview} alt={item.title} />
                        ) : (
                            <video src={item.preview} controls />
                        )}

                        
                        <h3>{item.title}</h3>
                        <p>{item.description.slice(0, 120)}...</p>
                    </div>
                ))}
            </div>

            
            {!loading && items.length === 0 && (
                <p>No results found. Try another search.</p>
            )}
        </div>
    );
};

export default NASAImgs;