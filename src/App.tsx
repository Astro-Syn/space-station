import './App.css'
import Home from './pages/home/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import APOD from './pages/APOD/APOD.tsx';
import MarsWeather from './pages/mars-weather/MarsWeather.tsx';
import NASAImgs from './pages/NASA_Images/NASAImgs.tsx';
import DONKI from './pages/DONKI/DONKI.tsx';



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="apod" element={<APOD />} />
                    <Route path="marsWeather" element={<MarsWeather />} />
                    <Route path='/nasaimgs' element={<NASAImgs/>} />
                    <Route path='donki' element={<DONKI/>}/>
                    <Route/>
                    <Route/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;