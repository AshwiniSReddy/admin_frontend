import React from 'react';
import axios from 'axios';
import './DetailComponentHistory.css';

const DetailComponentHistory = ({ selectedItem, setSelectedItem,showContactedButton}) => {
  if (!selectedItem) return null; // Don't render if no item is selected
  const handleContactedClick = async () => {
    try {
   
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deleteContact-upadate-in-history/${selectedItem._id}`);
      console.log(response.data);
      setSelectedItem(null); // Optionally remove the selected item from the UI state
      console.log('Contact has been archived and deleted!');
    } catch (error) {
      console.error('Error:', error);
      console.log('Failed to archive and delete the contact.');
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
