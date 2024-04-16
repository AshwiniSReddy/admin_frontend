import { slide as Menu } from 'react-burger-menu';
import './Menu.css';
import { useContext } from 'react';
import { MyContext } from '../context';
import React from 'react';

function Menubar() {
    const { user, setUser, alert, setalert, setView,headerContent,setHeaderContent } = useContext(MyContext); // Assuming setView is added to context

    console.log(user);

    const handleAddClick = () => {
        setView('alert')
    };
    const handleHomeClick = () => {
        setalert(false);
    };
    const handleContactDetailsClick = () => {
        setView('Contact'); // Update view to show ContactDetails component
        setHeaderContent(["Contact","Contact history"])
    };
  

    return (
        <Menu>
            <div id="home" className="menu-item" onClick={handleHomeClick}><h3>Welcome {user && user.given_name}</h3></div>
            <div className='menuButtons'>
                <button onClick={handleAddClick} className='buttons'>Edit/Delete Alert</button>
                <button onClick={() => {setView('Highlights');setHeaderContent(["Highlights","History"])}} className='buttons'>Highlights</button>
                <button onClick={handleContactDetailsClick} className='buttons'>Contact Details</button>
               
            </div>
        </Menu>
    );
}

export default Menubar;
