import { slide as Menu } from 'react-burger-menu'
import './Menu.css'
import { useContext } from 'react'
import { MyContext } from '../context'

import React from 'react'

function Menubar() {

    const { user, setUser } = useContext(MyContext);
    console.log(user)
    return (
        <Menu>
            <div id="home" className="menu-item" href="/"><h3>Welcome  {user&&user.given_name}</h3></div>

        </Menu>
    )
}

export default Menubar
