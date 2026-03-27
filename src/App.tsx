import './App.css'
import Home from './pages/home/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const APOD = () => <h2>Photo of the Day Page</h2>;
const MarsRover = () => <h2>Mars Rover Page</h2>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="apod" element={<APOD />} />
                    <Route path="marsRover" element={<MarsRover />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;