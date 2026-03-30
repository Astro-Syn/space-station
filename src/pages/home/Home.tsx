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
                        

                        
                      

                        
                        

                        
                        <div className='home-text-container'>
                            <div className='title-wrapper'>
                                <h1 className='title-text'>
                                    Space Station
                                </h1>
                                <span className='title2-txt'>
                                    <p>NASA API</p>
                                </span>
                            </div>
                        </div>
                         <img src='/Images/space-texture.jpg' className='space-texture'/>

                         <div className='bottom-chaos'>
                            <div className='barcode-home'>
                                <img src='/Images/barcode.png'/>
                            </div>

                            <div className='credits'>
                                <div className='webdev'>
                                    <p>Web Dev</p>
                                    <p>Kelsey Balajti</p>
                                </div>
                                <span>
                                    <p>Github</p>
                                <img src='/Images/githublogo.svg' className='gitlogo'/>
                                </span>
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