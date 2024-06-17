import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Menubar from '../Menu/Menu';
import { MyContext } from '../context';
import './alert.css';

function AlertComponent() {
    const { setMessage ,user} = useContext(MyContext);

    // State to manage the input for a new or current alert message
    const [newAlertMessage, setNewAlertMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('Add alert message'); // Placeholder state
    const [isEditing, setIsEditing] = useState(false);

    // Fetch the current alert message when the component mounts
    const fetchCurrentAlertMessage = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAlert`);
            console.log(response.data)
            if (response.data && response.data.message) {
                setPlaceholder(response.data.data.message); // Set the fetched message as placeholder
                setMessage(response.data.data.message); // Update context if necessary
            }
        } catch (error) {
            console.error('Failed to fetch current alert message:', error);
        }
       
    };
    useEffect(() => {
        

        fetchCurrentAlertMessage();
    }, [setMessage]); // Dependency array to ensure this effect runs only once on mount

    const handleCreateOrUpdate = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/alert`, {
                message: newAlertMessage
            });

            console.log(response.data);
            setMessage(newAlertMessage);
            setPlaceholder(newAlertMessage); // Update placeholder to reflect the new message
            setNewAlertMessage('');
            setIsEditing(false);
        } catch (error) {
            console.error('There was a problem with the Axios request:', error);
        }
        const userId = user && user.given_name;
        const eventId_test = 'event789';
        const message = `${user && user.given_name} added alert message`;
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/createAlertActivity`, {
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

    const handleEdit = () => {
        setIsEditing(true);
        fetchCurrentAlertMessage();
        setNewAlertMessage(placeholder); // Use the current placeholder (existing message) as the value to edit
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deletealert`);
            setMessage('');
            setPlaceholder('Add alert message'); // Reset placeholder after deletion
            setNewAlertMessage('');
        } catch (error) {
            console.error('Problem with Axios request:', error);
        }
    };

    return (
        <>
        
            <div className='alert-container-main'>
                <div className="alert-container">
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="alert-input"
                        value={newAlertMessage}
                        onChange={(e) => setNewAlertMessage(e.target.value)}
                    />
                    {isEditing ? (
                        <button className="alert-button save-button" onClick={handleCreateOrUpdate}>Save Alert Message</button>
                    ) : (
                        <>
                            <button className="alert-button create-button" onClick={handleCreateOrUpdate}>Create/Update Alert Message</button>
                            <button className="alert-button edit-button" onClick={handleEdit}>Edit</button>
                            <button className="alert-button delete-button" onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default AlertComponent;
