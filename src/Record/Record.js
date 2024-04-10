import React, { useState ,useContext} from 'react';
import DetailComponent from '../DetailComponent/DetailComponent'; // Adjust the path as necessary
import './Record.css';
import { MyContext } from '../context'

const Records = ({ data }) => {
//   const [selectedItem, setSelectedItem] = useState(null);
  const { selectedItem, setSelectedItem} = useContext(MyContext);
  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='displayContacts'>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
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
