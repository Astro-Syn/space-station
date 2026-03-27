import { Link, Outlet } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='links-container'>
                <Link to="/apod">Photo Of the Day</Link>
                <Link to="marsRover">Mars Rover</Link>
            </div>

            <div className='home-wrapper'>
                <h1>Space Station</h1>

               
                <Outlet />
            </div>
        </div>
    )
}

export default Home;