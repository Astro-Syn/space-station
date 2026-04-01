import { Link, Outlet } from "react-router-dom";
import "./DONKI.css";

const DONKI = () => {
    return (
        <div className="donki-container">
           

            {/*Left Side */}
            <div className='donki-left-side'>
                <div className='donki-text'>
                     <h2>DONKI PAGE</h2>
                     <p>[ Database Of Notifications, Knowledge, Information ]</p>
                </div>
               
                <div className="donki-links-container">
                <Link to="cme">Coronal Mass Ejection</Link>
                <Link to="gst">Geomagnetic Storm</Link>
                <Link to="hss">High Speed Stream</Link>
                <Link to='flr'>Solar Flare</Link>
                <Link to='mpc'>High Speed Stream</Link>
                <Link to='notifications'>Notifications</Link>
                <Link to='rbe'>Radion Belt Enhancement</Link>
                <Link to='sep'>Solar Energetic Particle</Link>
                <Link to='wsaes'>WSA + EnilSimulation</Link>
            </div>
            <div className='left-side-deco'>
                <img src='/Images/barcode.png'/>
                </div>
                
            </div>


            {/*Right Side */}
            <div className='donki-right-side'>
                 <div className="donki-content">
                    <Outlet />
                 </div>
            </div>
            

           
        </div>
    );
};

export default DONKI;