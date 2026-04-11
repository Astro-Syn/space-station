import { useEffect, useState, useRef } from 'react';
import './NASAImgs.css';

interface NasaItem {
  nasa_id: string;
  title: string;
  description: string;
  media_type: 'image';
  preview: string;
}

const NASAImgs = () => {
  const [query, setQuery] = useState('mars');
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<NasaItem | null>(null);

  const viewerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const fetchImages = async (search: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${search}&media_type=image`
      );

      if (!res.ok) throw new Error('Failed to fetch data');

      const data = await res.json();

      const results: NasaItem[] = data.collection.items
        .filter((item: any) => item.data && item.data[0])
        .map((item: any) => ({
          nasa_id: item.data[0].nasa_id,
          title: item.data[0].title || 'No title',
          description:
            item.data[0].description || 'No description available',
          media_type: 'image',
          preview: item.links?.[0]?.href || ''
        }))
        .filter((item: NasaItem) => item.preview !== '')
        .slice(0, 10);
        ;

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

  const startDrag = (e: React.MouseEvent) => {
    if (!viewerRef.current) return;
    isDragging.current = true;
    const rect = viewerRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging.current || !viewerRef.current) return;
    viewerRef.current.style.left = `${e.clientX - offset.current.x}px`;
    viewerRef.current.style.top = `${e.clientY - offset.current.y}px`;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, []);

  return (
    <div className="nasa-imgs-container">
      <div className="title-and-search">
        <div className="nasa-imgs-title">
          <div className="media-header-container">
            <h2>NASA Media Library</h2>
          </div>

          <div className="search-bar">
            <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search..."
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      fetchImages(query);
    }
  }}
/>
            <button 
            className='search-btn'
            onClick={() => fetchImages(query)}>
              Search
            </button>
          </div>
        </div>
      </div> 

      <div className="grid">
        {loading && <p>[Loading...]</p>}
        {error && <p>{error}</p>}

      
        {items.map((item) => (
          <div
            key={item.nasa_id}
            className="card"
            onClick={() => setActiveItem(item)}
          >
            <img src={item.preview} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

     {activeItem && (
  <div
    className="xp-overlay"
    onClick={() => setActiveItem(null)}
  >
    <div
      ref={viewerRef}
      className="xp-window"
     
      onClick={(e) => e.stopPropagation()}
    >
      <div className="xp-title-bar" onMouseDown={startDrag}>
        <span>{activeItem.title}</span>
        <button onClick={() => setActiveItem(null)}>✕</button>
      </div>

      <div className="xp-content">
        <img src={activeItem.preview} alt={activeItem.title} />
        <p>{activeItem.description}</p>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default NASAImgs;