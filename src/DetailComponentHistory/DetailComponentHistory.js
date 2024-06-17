import React from 'react';
import axios from 'axios';
import './DetailComponentHistory.css';
import { useContext } from 'react';
import { MyContext } from '../context';

const DetailComponentHistory = ({ selectedItem, setSelectedItem,showContactedButton}) => {
  const {user}=useContext(MyContext);

  if (!selectedItem) return null; // Don't render if no item is selected
  const handleContactedClick = async () => {
    try {
   
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deleteContactHistory_test/${selectedItem._id}`);
      console.log(response.data);
      setSelectedItem(null); // Optionally remove the selected item from the UI state
      console.log('Contact has been archived and deleted!');
    } catch (error) {
      console.error('Error:', error);
      console.log('Failed to archive and delete the contact.');
    }
    const userId = user && user.given_name;
    const eventId_test = 'event789';
    const message = `${user && user.given_name} deleted contact`;
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/deleteContactHistoryActivity`, {
        userId,
        eventId_test,
        message,
      });
      // alert('Event created and notification sent');
    } catch (error) {
      console.error('Error creating event:', error);
      // alert('Failed to create event');
    }

  };

  return (
    <div className="detail-component">
      <h2>Details:</h2>
      <table>
        <tbody>
          <tr>
            <th className='head'>Name:</th>
            <td>{selectedItem.name}</td>
          </tr>
          <tr>
            <th className='head'>Email:</th>
            <td>{selectedItem.email}</td>
          </tr>
          <tr>
            <th className='head'>Phone Number:</th>
            <td>{selectedItem.phoneNumber}</td>
          </tr>
          <tr>
            <th className='head'>Message:</th>
            <td>{selectedItem.message}</td>
          </tr>
        </tbody>
      </table>
      <div className='detailpagebuttons'> <button onClick={() => setSelectedItem(null)}>Go Back</button>
      {showContactedButton&&<button onClick={handleContactedClick}>Contacted</button>}</div> 
      
    </div>
  );
};

export default DetailComponentHistory;
