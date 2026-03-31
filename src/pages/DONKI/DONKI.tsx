import { NavLink, Outlet } from "react-router-dom";


const DONKI = () => {


    return (
        <div>
            <h2>DONKI PAGE</h2>

            <div className="donki-links-container">
                <NavLink to='cme'>Coronal Mass Ejection</NavLink>
                <NavLink to ='gst'>Geomagnetic Storm</NavLink>
                <NavLink to='hss'>High Speed Stream</NavLink>
            </div>
            <Outlet/>
        </div>
    )
}

export default DONKI;