
import React, { useState ,useContext} from 'react';
import axios from 'axios';
import DetailComponent from '../DetailComponent/DetailComponent'; // Adjust the path as necessary
import './Record.css';
import { MyContext } from '../context'
import { socket } from '../socket/socket';

const Records = ({ data ,detetebutton,handleRefresh}) => {
//   const [selectedItem, setSelectedItem] = useState(null);
  const { selectedItem, setSelectedItem,user} = useContext(MyContext);
  const handleRowClick = (item) => {
    setSelectedItem(item);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deleteContactHistory/${id}`);
      socket.emit('recordDeleted',id); 
      console.log('Record deleted successfully');
      handleRefresh();
      // Optionally refresh the data or use state to remove the item visually
    } catch (error) {
      console.error('Failed to delete the record:', error);
      console.log('Failed to delete the record');
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
   // Function to format the date
 // Function to format the date to only show year, month, and day
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


  return (
    <div className='displayContacts'>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone number</th>
            <th scope='col'>Date </th>
          {detetebutton &&  <th scope='col'>Delete</th>} 
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr >
              <td key={index} onClick={() => handleRowClick(item)}>{item.name}</td>
              <td key={index} onClick={() => handleRowClick(item)}>{item.email}</td>
              <td key={index} onClick={() => handleRowClick(item)}>{item.phoneNumber}</td>
              <td>{formatDate(item.createdAt)}</td>
             {detetebutton && <td className='deletehistory'>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>} 
            </tr>
          ))}
        </tbody>
      </table>
      {/* Conditionally render the DetailComponent */}
      {selectedItem && <DetailComponent selectedItem={selectedItem} />}
    </div>
  );
};

export default Records;
