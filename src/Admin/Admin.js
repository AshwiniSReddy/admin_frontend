import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { MyContext } from '../context';
import CardsContainer from '../CardContainer/Card';
import UpcomingEvents from '../upcomming/upcoming';
import Menubar from '../Menu/Menu';
import History from '../History/History';
import ContactDetails from '../ConatactDetails/Contact';
import './Admin.css'
import AlertComponent from '../alter/alert';
import ContactHistory from '../ContactHistory/ContactHistory';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

const EventForm = () => {
  // const [toggle, settoggle] = useState(true)
  const { view, setView,headerContent,setHeaderContent ,selectedItem,setSelectedItem} = useContext(MyContext); // Assuming setView is added to context

  const [formData, setFormData] = useState({
    eventUpdates: '',
    photo: null,  // Changed to null, as this will be a file
    video: null,  // Changed to null, as this will be a file
    title: '',
    tagline: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  const handleViewChange = (viewName) => {
    if (view === viewName && selectedItem) {
      setSelectedItem(null);
    }
    setView(viewName);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

  

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_UR}/api/admin`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle success (clear form, show message, etc.)
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
  <div className='Admin'>
     <Menubar />
    <div className='AdminCard'>
      <div className='header'>
     
        <h2 onClick={() => handleViewChange(headerContent[0])}>{headerContent[0]}</h2>
        <h2 onClick={() => handleViewChange(headerContent[1])}>{headerContent[1]}</h2>
        
      </div>

      <div className={`section ${view === 'History' ? 'history-section' : ''}`}>
        {view === 'Highlights' && <CardsContainer />}
        {view === 'History' && <UpcomingEvents />}
        {view === 'Contact' && <ContactDetails />}
        {view==="alert" && <AlertComponent/>}
        {view==="Contact history" && <ContactHistory/>}
        {view=="Activity feed" && <ActivityFeed/>}
        {/* <div className='upcomming_events'><UpcomingEvents /></div>  */}
      </div>
    </div>

    
  </div>
);
};

export default EventForm;
