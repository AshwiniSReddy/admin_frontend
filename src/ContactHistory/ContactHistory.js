import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Records from '../Record/Record';
import Pagination from '../Pagination/Pagination';
import { MyContext } from '../context';
import DetailComponent from '../DetailComponent/DetailComponent';

function ContactHistory() {
    const { selectedItem,setSelectedItem} = useContext(MyContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const [refresh, setRefresh] = useState(false);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);
     
    useEffect(() => {
         
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/form-history`);
                setData(response.data);
            } catch (error) {
                console.log('There was an error while retrieving the data',error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [refresh]);
    
    useEffect(() => {
        return () => setSelectedItem(null); // Cleanup function to reset on component unmount
      }, []);
      const handleRefresh = () => {
        setRefresh(!refresh);  // Toggle refresh state to trigger re-fetch
      }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : selectedItem ? (
                <DetailComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem}  detetebutton={true}/>
            ) : (
                <>
                    <Records data={currentRecords} detetebutton={true} handleRefresh={handleRefresh}/>
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
