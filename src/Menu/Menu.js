import { slide as Menu } from 'react-burger-menu'
import './Menu.css'
import { useContext } from 'react'
import { MyContext } from '../context'

import React from 'react'

function Menubar() {

    const { user, setUser,alert,setalert } = useContext(MyContext);
    console.log(user)
    const handleAddClick = () => {
        setalert(true); // This will now trigger the display of AlertComponent
    };
    const handleHomeClick = () => {
        setalert(false); // This will now trigger the display of AlertComponent
    };
    
    return (
        <Menu>
            <div id="home" className="menu-item" href="/"><h3>Welcome  {user&&user.given_name}</h3></div>
           <button onClick={handleAddClick}>alert</button>
           <button onClick={handleHomeClick}>Home</button>
        </Menu>
    )
}

export default Menubar
