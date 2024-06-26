import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Records from '../Record/Record';
import Pagination from '../Pagination/Pagination';
import { MyContext } from '../context';
import DetailComponent from '../DetailComponent/DetailComponent';
import { socket } from '../socket/socket';

function Contact() {
<<<<<<< HEAD
    const { selectedItem,setSelectedItem,user} = useContext(MyContext);
=======
    const { selectedItem, setSelectedItem, user } = useContext(MyContext);
>>>>>>> b126f7cd9fb7317ee13dbc017ba4be065ced32ad
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const dataRef = useRef(data);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getContactdetails_test`);
                setData(response.data);
                dataRef.current = response.data;
            } catch (error) {
                alert('There was an error while retrieving the data');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();

        const handleContactRemoved = (contactId) => {
            const updatedData = dataRef.current.filter(item => item._id !== contactId);
            setData(updatedData);
<<<<<<< HEAD
        });
    }, []);
    useEffect(() => {
        socket.off('contact_removed');
        return () => setSelectedItem(null); // Cleanup function to reset on component unmount
      }, []);
    
      const handleItemContacted = (id) => {
=======
            dataRef.current = updatedData;
        };

        socket.on('contact_removed', handleContactRemoved);

        return () => {
            socket.off('contact_removed', handleContactRemoved);
            setSelectedItem(null); // Cleanup function to reset on component unmount
        };
    }, [setSelectedItem]);

    const handleItemContacted = (id) => {
>>>>>>> b126f7cd9fb7317ee13dbc017ba4be065ced32ad
        const updatedData = data.filter(item => item._id !== id);
        setData(updatedData);
        dataRef.current = updatedData;
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : selectedItem ? (
<<<<<<< HEAD
                <DetailComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem} showContactedButton={true} detetebutton={false} onItemContacted={handleItemContacted} user={user}/>
=======
                <DetailComponent
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    showContactedButton={true}
                    detetebutton={false}
                    onItemContacted={handleItemContacted}
                    user={user}
                />
>>>>>>> b126f7cd9fb7317ee13dbc017ba4be065ced32ad
            ) : (
                <>
                    <Records data={currentRecords} />
                    {data && (
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Contact;
