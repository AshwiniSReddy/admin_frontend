import { slide as Menu } from 'react-burger-menu';
import './Menu.css';
import { useContext,useState } from 'react';
import { MyContext } from '../context';
import React from 'react';

function Menubar() {
    const { user, setUser, alert, setalert, setView,headerContent,setHeaderContent } = useContext(MyContext); // Assuming setView is added to context
    const [menuOpen, setMenuOpen] = useState(false); 
    console.log(user);

    const handleAddClick = () => {
        setView('alert')
        setMenuOpen(false); // Close the menu
    };
    const handleHomeClick = () => {
        setalert(false);
        setMenuOpen(false); // Close the menu
    };
    const handleContactDetailsClick = () => {
        setView('Contact'); // Update view to show ContactDetails component
        setHeaderContent(["Contact","Contact history"])
        setMenuOpen(false); // Close the menu
    };
    // Function to handle menu state
    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };
    const handleActivityFeed=()=>{
        setView('Activity feed');
        setHeaderContent(["Activity feed"])
        setMenuOpen(false)
    }

    return (
        <Menu isOpen={menuOpen} onStateChange={handleStateChange}>
            <div id="home" className="menu-item" onClick={handleHomeClick}><h3>Welcome {user && user.given_name}</h3></div>
            <div className='menuButtons'>
                <button onClick={handleAddClick} className='buttons'>Edit/Delete Alert</button>
                <button onClick={() => {setView('Highlights');setHeaderContent(["Highlights","History"]);setMenuOpen(false);}} className='buttons'>Highlights</button>
                <button onClick={handleContactDetailsClick} className='buttons'>Contact Details</button>
                <button onClick={handleActivityFeed} className='buttons'>Activity feed</button>
            </div>
        </Menu>
    );
}

export default Menubar;
