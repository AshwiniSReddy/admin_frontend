import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Records from '../Record/Record';
import Pagination from '../Pagination/Pagination';
import { MyContext } from '../context';
import DetailComponent from '../DetailComponent/DetailComponent';

function Contact() {
    const { selectedItem,setSelectedItem} = useContext(MyContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-form-submissions`);
                setData(response.data);
            } catch (error) {
                alert('There was an error while retrieving the data');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : selectedItem ? (
                <DetailComponent selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            ) : (
                <>
                    <Records data={currentRecords} />
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

export default Contact;
