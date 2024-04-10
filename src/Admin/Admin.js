import React, { useState } from 'react';
import axios from 'axios';
import CardsContainer from '../CardContainer/Card';
import UpcomingEvents from '../upcomming/upcoming';
import Menubar from '../Menu/Menu';
import History from '../History/History';
import ContactDetails from '../ConatactDetails/Contact';
import './Admin.css'

const EventForm = () => {
  // const [toggle, settoggle] = useState(true)
  const [view, setView] = useState('Highlights'); // Changed toggle to view for clarity

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
    setView(viewName);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

  

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_UR}/api`, data, {
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
     
        <h2 onClick={() => handleViewChange('Highlights')}>Highlights</h2>
        <h2 onClick={() => handleViewChange('History')}>History</h2>
        <h2 onClick={() => handleViewChange('Contact')}>Contact details</h2> {/* New section */}
      </div>

      <div className={`section ${view === 'History' ? 'history-section' : ''}`}>
        {view === 'Highlights' && <CardsContainer />}
        {view === 'History' && <UpcomingEvents />}
        {view === 'Contact' && <ContactDetails />}
        {/* <div className='upcomming_events'><UpcomingEvents /></div>  */}
      </div>
    </div>
  </div>
);
};

export default EventForm;
