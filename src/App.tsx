import './App.css'
import Home from './pages/home/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import APOD from './pages/APOD/APOD.tsx';
import MarsWeather from './pages/mars-weather/MarsWeather.tsx';
import NASAImgs from './pages/NASA_Images/NASAImgs.tsx';
import DONKI from './pages/DONKI/DONKI.tsx';
import CoronalMassEjection from './pages/DONKI/CME/CoronalMassEjection.tsx';
import GeomagneticStorm from './pages/DONKI/GST/GeomagneticStorm.tsx';
import HighSpeedStream from './pages/DONKI/HSS/HighSpeedStream.tsx';
import SolarFlare from './pages/DONKI/FLR/SolarFlare.tsx';
import MagnetopauseCrossing from './pages/DONKI/MPC/MagnetopauseCrossing.tsx';
import RadiationBeltEnhancement from './pages/DONKI/RBE/RadiationBeltEnhancement.tsx';
import Notifications from './pages/DONKI/notifications/Notifications.tsx';
import WASEnilSimulation from './pages/DONKI/WSA+ES/WSAEnilSimulation.tsx';
import SolarEnergeticParticle from './pages/DONKI/SEP/SolarEnergeticParticle.tsx';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="apod" element={<APOD />} />
                    <Route path="marsWeather" element={<MarsWeather />} />
                    <Route path='/nasaimgs' element={<NASAImgs/>} />

                    {/*DONKI pages */}
                    <Route path='donki' element={<DONKI/>}>

                    <Route path='cme' element={<CoronalMassEjection/>}/>
                    <Route path='gst' element={<GeomagneticStorm/>}/>
                    <Route path='hss' element={<HighSpeedStream/>}/>
                  <Route path='flr' element={<SolarFlare />} />
<Route path='mpc' element={<MagnetopauseCrossing />} />
<Route path='notifications' element={<Notifications />} />
<Route path='rbe' element={<RadiationBeltEnhancement />} />
<Route path='sep' element={<SolarEnergeticParticle />} />
<Route path='wsaes' element={<WASEnilSimulation />} />
                    
                    
                    
                    </Route>
                   
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;