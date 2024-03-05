import React, { useState } from 'react';
import axios from 'axios';
import CardsContainer from '../CardContainer/Card';
import UpcomingEvents from '../upcomming/upcoming';
import Menubar from '../Menu/Menu';
import History from '../History/History';
import './Admin.css'

const EventForm = () => {
  const [toggle, settoggle] = useState(true)
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

  

    try {
      const response = await axios.post('http://13.233.173.240/api', data, {
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
    // <form onSubmit={handleSubmit}>
    //   <input type="text" name="eventUpdates" placeholder="Event/Recent Updates" value={formData.eventUpdates} onChange={handleInputChange} />
    //   <input type="file" name="photo" onChange={handleFileChange} />
    //   <input type="file" name="video" onChange={handleFileChange} />
    //   <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
    //   <input type="text" name="tagline" placeholder="Tagline" value={formData.tagline} onChange={handleInputChange} />
    //   <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
    //   <button type="submit">Submit</button>
    // </form>
    // <div className='Admin'>
    //   <Menubar />


    //   <div className='AdminCard'>
    //     <div className='header'>
    //       <div onClick={() => settoggle(true)}><h2>Highlights</h2></div>
    //       <div onClick={() => settoggle(false)}><h2>History</h2></div>
    //     </div>

    //     <div> {toggle ? <CardsContainer /> : <History />}</div>
    //     {/* <UpcomingEvents/> */}
    //     <div className='AdminCard2'>
    //       <UpcomingEvents />
    //     </div>
    //   </div>


    // </div>

    <div className='Admin'>
      <Menubar />
      <div className='AdminCard'>
        <div className='header'>
          <h2 onClick={() => settoggle(true)}>Highlights</h2>
          <h2 onClick={() => settoggle(false)}>History</h2>
        </div>

        <div className='section'> {toggle ? <CardsContainer /> : <History />}
         <div className='upcomming_events'><UpcomingEvents /></div> 
        </div>

      </div>

    </div>


  );
};

export default EventForm;
