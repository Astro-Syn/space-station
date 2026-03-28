import { Link, Outlet, useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const location = useLocation();

    return (
        <div className='home-container'>
            <div className='links-container'>
                <Link to='/'>Home</Link>
                <Link to="/apod">Photo Of the Day</Link>
                <Link to="marsRover">Mars Rover</Link>
                <Link to="nasaimgs">
                NASA Images and Video
                </Link>
            </div>

            <div className='home-wrapper'>
                {location.pathname === '/' && 
                <div className='home-text-container'>
                <h1 className='title-text'>Space Station</h1>
                <span>[Site made by Kelsey]</span>
                    <div className='underbar'>
                        <span>Your one stop for <span>NASA News</span></span>
                        <div>
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