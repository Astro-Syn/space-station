import { Link, Outlet, useLocation } from 'react-router-dom';
import './Home.css';
import { RiAliensLine } from "react-icons/ri";
import { useState, useEffect, useRef } from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import { RiCloseLargeLine } from "react-icons/ri";

const Home = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

   
    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className='home-container'>
              
            <div className='home-wrapper'>
             

              
                <div className='links-container' ref={menuRef}>

                    <div
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                      
                        <BiMenuAltLeft className="icon menu-icon" size={40} />
                        <RiCloseLargeLine className="icon close-icon" size={40} />
                    </div>

                    <div className={`links ${menuOpen ? 'show' : ''}`}>
                        <Link to='/' onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/apod" onClick={() => setMenuOpen(false)}>Photo Of the Day</Link>
                        <Link to="marsWeather" onClick={() => setMenuOpen(false)}>Mars Weather</Link>
                        <Link to="nasaimgs" onClick={() => setMenuOpen(false)}>NASA Images and Video</Link>
                        <Link to='donki' onClick={() => setMenuOpen(false)}>DONKI</Link>
                    </div>
                </div>

            
                {location.pathname === '/' && (
                    <>
                        <div className='home-text-container'>


                            <div className='title-wrapper'>
                                <h1 className='title-text1'>Space </h1>
                                <h1 className='title-text2'>Station</h1>
                                 <span className='title2-txt'>
                                    <p>[  Featuring NASA API ]</p>
                                </span>
                            </div>
                           
                        </div>

                       <div className='home-side-text-wrapper'>
    <p className="cyber-line">
        Initiating Combat Mode__ <span></span>
    </p>
    <p className="cyber-line">
        System Redefined <span></span>
    </p>
</div>

                       
                        <div className='bottom-chaos'>
                            <div className='barcode-home'>
                                <img src='/Images/barcode.png'/>
                            </div>

                            <div className='credits'>
                                <div className='webdev'>
                                    <p>Web Dev</p>
                                    <p>Kelsey Balajti</p>
                                </div>
                                <span className='github-sec'>
                                    <p>Github <p className='gitname'>AstroSyn</p></p>
                                    <img src='/Images/githublogo.svg' className='gitlogo'/>
                                </span>
                            </div>

                            <div className='desc-section'>
                                <p>
                                    This website, developed by Kelsey, leverages the power of NASA’s public APIs to deliver an engaging and educational exploration of space. It offers a curated collection of pages featuring astronomical imagery, planetary data, and insights into ongoing space missions. Visitors can navigate through a variety of interactive and visually compelling content designed to inspire curiosity about the universe. Whether you are interested in daily cosmic phenomena, detailed views from Mars rovers, or the broader wonders of our solar system and beyond, this platform provides an accessible and immersive experience. Embark on a journey through space and discover the remarkable science and beauty that define our galaxy.
                                </p>
                                <div>
                                    <RiAliensLine />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <Outlet />
            </div>
        </div>
    );
};

export default Home;