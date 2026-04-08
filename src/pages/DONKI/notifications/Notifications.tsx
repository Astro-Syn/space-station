import { useEffect, useState } from 'react';
import "./Notifications.css";
import { GiAlienSkull } from "react-icons/gi";

type Notification = {
  messageBody: string;
  messageIssueTime: string;
};

const Notifications = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [data, setData] = useState<Notification[]>([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/DONKI/notifications?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className='donki-rs-wrapper'>
      <div className='donki-title2-container'>
        <h2>Transmission Feed</h2>
        <GiAlienSkull color={'black'} size={30} />
      </div>

      <div className='donki-rs-content'>
        {data.map((item, i) => (
          <div key={i} className='feed-item fade-in'>
            <p className='message'>{item.messageBody}</p>

            <div className='time-container'>
              <p className='time base'>
                [ {new Date(item.messageIssueTime).toLocaleString()} ]
              </p>
              <p className='time glitch red'>
                [ {new Date(item.messageIssueTime).toLocaleString()} ]
              </p>
              <p className='time glitch blue'>
                [ {new Date(item.messageIssueTime).toLocaleString()} ]
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;