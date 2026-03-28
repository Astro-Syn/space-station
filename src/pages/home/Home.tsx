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
                <img src='/Images/svg2.svg' className='svg2'/>
                

                {location.pathname === '/' && 
                    <div className='home-text-container'>
                        <div className='title-wrapper'>
                        <h1 className='title-text'>Space Station</h1>
                      
                        </div>
                        <img src='/Images/svg1.svg' className='svg1'/>

                        <div className='underbar'>
                            <div className='ticker'>
                                <span>NASA News</span>
                                <span>Images</span>
                                <span>Facts</span>
                                <span>Asteroids</span>
                            </div>
                        </div>
                    </div>
                }

                <Outlet />
            </div>
        </div>
    )
}

export default Home;