import { Link, Outlet, useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const location = useLocation();

    return (
        <div className='home-container'>
            <div className='home-wrapper'>

                
                <div className='links-container'>
                    <div className='links'>
                        <Link to='/'>Home</Link>
                        <Link to="/apod">Photo Of the Day</Link>
                        <Link to="marsRover">Mars Rover</Link>
                        <Link to="nasaimgs">NASA Images and Video</Link>
                    </div>
                </div>

                
                {location.pathname === '/' && (
                    <>
                        
                        <div className='galaxy-wrapper'>
                            <img
                                src='/Images/galaxy-top-layer.png'
                                className='galaxy-links'
                            />
                        </div>

                        
                       

                        
                        <div className='satellite-img-glitch'>
                            <img
                                src='/Images/floating-satellite.png'
                                className='satellite-img'
                            />
                            <div className='glitch-layers'>
                                <div className='glitch-layer'></div>
                                <div className='glitch-layer'></div>
                                <div className='glitch-layer'></div>
                            </div>
                        </div>

                        
                        <div className='home-text-container'>
                            <div className='title-wrapper'>
                                <h1 className='title-text'>
                                    Space Station
                                </h1>
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