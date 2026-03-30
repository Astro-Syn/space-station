import { Link, Outlet, useLocation } from 'react-router-dom';
import './Home.css';
import { RiAliensLine } from "react-icons/ri";

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
                                <span className='github-sec'>
                                    <p>Github <p className='gitname'>AstroSyn</p></p>
                                <img src='/Images/githublogo.svg' className='gitlogo'/>
                                </span>
                                
                            </div>
                            <div className='desc-section'>
                                <p>This website, developed by Kelsey, leverages the power of NASA’s public APIs to deliver an engaging and educational exploration of space. It offers a curated collection of pages featuring astronomical imagery, planetary data, and insights into ongoing space missions. Visitors can navigate through a variety of interactive and visually compelling content designed to inspire curiosity about the universe. Whether you are interested in daily cosmic phenomena, detailed views from Mars rovers, or the broader wonders of our solar system and beyond, this platform provides an accessible and immersive experience. Embark on a journey through space and discover the remarkable science and beauty that define our galaxy.</p>
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