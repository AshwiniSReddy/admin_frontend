import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Records from '../Record/Record';
import Pagination from '../Pagination/Pagination';
import { MyContext } from '../context';
import DetailComponent from '../DetailComponent/DetailComponent';
import { socket } from '../socket/socket';

function ContactHistory() {
    const { selectedItem, setSelectedItem } = useContext(MyContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const [refresh, setRefresh] = useState(false);
    const dataRef = useRef(data);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);
<<<<<<< HEAD
    
     
=======

>>>>>>> b126f7cd9fb7317ee13dbc017ba4be065ced32ad
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getContactdetails_test`);
                setData(response.data);
                dataRef.current = response.data;
            } catch (error) {
                console.log('There was an error while retrieving the data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [refresh]);
<<<<<<< HEAD
    
=======

>>>>>>> b126f7cd9fb7317ee13dbc017ba4be065ced32ad
    useEffect(() => {
        const handleRecordDeleted = (deletedRecordId) => {
            const updatedData = dataRef.current.filter(item => item._id !== deletedRecordId);
            setData(updatedData);
            dataRef.current = updatedData;
        };

        socket.on('recordDeleted', handleRecordDeleted);

        return () => {
            socket.off('recordDeleted', handleRecordDeleted);
            setSelectedItem(null); // Cleanup function to reset on component unmount
        };
    }, [setSelectedItem]);

    const handleRefresh = () => {
        setRefresh(!refresh);  // Toggle refresh state to trigger re-fetch
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : selectedItem ? (
                <DetailComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem} detetebutton={true} />
            ) : (
                <>
                    <Records data={currentRecords} detetebutton={true} handleRefresh={handleRefresh} />
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}

export default ContactHistory;
