
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./DONKI.css";
import { useRef, useEffect } from "react";
import { FaAnglesUp } from "react-icons/fa6";



const DONKI = () => {
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
    if (window.innerWidth <= 768) {
        const id = location.pathname.split("/").pop();

        if (id) {
            setTimeout(() => {
                const el = document.getElementById(id);
                el?.scrollIntoView({ behavior: "smooth" });
            }, 150);
        }
    }
}, [location]);




    const scrollToTop = () => {
        containerRef.current?.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="donki-container" ref={containerRef}>

            <div className='donki-left-side'>
                <div className='donki-text'>
                    <h2>DONKI PAGE</h2>
                    <p>[ Database Of Notifications, Knowledge, Information ]</p>
                </div>

               <div className="donki-links-container">
    <NavLink to="cme">Coronal Mass Ejection</NavLink>
    <NavLink to="gst">Geomagnetic Storm</NavLink>
    <NavLink to="hss">High Speed Stream</NavLink>
    <NavLink to="flr">Solar Flare</NavLink>
    <NavLink to="mpc">Magnetopause Crossing</NavLink>
    <NavLink to="notifications">Notifications</NavLink>
    <NavLink to="rbe">Radion Belt Enhancement</NavLink>
    <NavLink to="sep">Solar Energetic Particle</NavLink>
    <NavLink to="wsaes">WSA + EnilSimulation</NavLink>
</div>

                <div className='left-side-deco'>
                    <img src='/Images/barcode.png' />
                </div>
            </div>

            <div className='donki-right-side'>
                <div className="donki-content">
                    <Outlet />
                </div>
            </div>

            <button
                className="back-to-top"
                onClick={scrollToTop}
            >
                <FaAnglesUp />
            </button>

        </div>
    );
};

export default DONKI;

