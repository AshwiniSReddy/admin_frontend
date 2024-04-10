import React from 'react';
import './DetailComponent.css';

const DetailComponent = ({ selectedItem, setSelectedItem }) => {
  if (!selectedItem) return null; // Don't render if no item is selected

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
     
      <button onClick={() => setSelectedItem(null)}>Go Back</button>
    </div>
  );
};

export default DetailComponent;
