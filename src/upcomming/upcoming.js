import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './upcomming.css'

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [editingId, setEditingId] = useState(null); // Track which event is being edited
    const [editedEvents, setEditedEvents] = useState({}); // Store edited event data
    const isoDateString = "2024-02-09T18:30:00.000+00:00";
    const dateObject = new Date(isoDateString);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recentEvents`);
            setEvents(response.data); // Assuming response.data is the array of events
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleEdit = (eventId) => {
        if (editingId === eventId) {
            setEditingId(null); // Exit editing mode if the same button is clicked again
        } else {
            setEditingId(eventId);
            // Initialize edited event data with current event data
            const currentEventData = events.find(event => event._id === eventId);
            setEditedEvents({ [eventId]: currentEventData });
        }
    };

    const handleFieldChange = (eventId, fieldName, value) => {
        setEditedEvents(prev => ({
            ...prev,
            [eventId]: { ...prev[eventId], [fieldName]: value }
        }));
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/delete/${eventId}`);
            fetchEvents(); // Refresh the events list after deletion
            if (editingId === eventId) {
                setEditingId(null); // Reset editing state if the deleted event was being edited
            }
        } catch (error) {

            console.error('Error deleting event:', error);
        }
    };

    // const handleSave = async (eventId) => {
    //     const updatedEventData = editedEvents[eventId];
    //     const data = new FormData();

    //     Object.entries(updatedEventData).forEach(([key, value]) => {
    //         if (value instanceof File) {
    //             data.append(key, value);
    //         } else if (typeof value === 'object' && value !== null) {
    //             // For objects (excluding Files and null), stringify them
    //             data.append(key, JSON.stringify(value));
    //         } else {
    //             // For all other data types
    //             data.append(key, value);
    //         }
    //     });

    //     try {
    //         const response = await axios.patch(`http://localhost:5000/api/edit/${eventId}`, data);
    //         console.log(response.data);
    //         await fetchEvents();
    //         setEditingId(null);
    //         setEditedEvents(prev => {
    //             const updated = { ...prev };
    //             delete updated[eventId];
    //             return updated;
    //         });
    //     } catch (error) {
    //         console.error('Error updating event:', error);
    //     }
    // };



    const handleSave = async (eventId) => {
        const updatedEventData = editedEvents[eventId];
        const data = new FormData();

        // // Iterate over updatedEventData to append non-file values.
        // Object.entries(updatedEventData).forEach(([key, value]) => {
        //     // Check if the value is a file to append it as a file
        //     if (value instanceof File) {
        //         data.append(key, value);
        //         console.log(key,value)
        //     } else {
        //         // For non-file fields, directly append the value
        //         console.log(key,value)
        //         data.append(key, value);
        //     }
        // });


        for (const key in updatedEventData) {

            data.append(key, updatedEventData[key]);
        }
        data.append("sjhsj", "hsh")
        console.log(data, "data")
        // Special handling for date and time fields
        // Assuming 'fromDate' and 'toDate' are stored in ISO string format or similar in editedEvents
        // and 'time' is stored in 'HH:mm' format.

        if (updatedEventData.fromDate) {
            // Append 'fromDate' as is or convert/format it as needed
            data.append('fromDate', updatedEventData.fromDate);
        }


        if (updatedEventData.toDate) {
            // Append 'toDate' as is or convert/format it as needed
            data.append('toDate', updatedEventData.toDate);
        }

        if (updatedEventData.time) {
            // Append 'time' as is
            data.append('time', updatedEventData.time);
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/edit/${eventId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            await fetchEvents();
            setEditingId(null);
            setEditedEvents(prev => {
                const updated = { ...prev };
                delete updated[eventId];
                return updated;
            });
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };


    // const handleFileChange = (eventId, fieldName, files) => {
    //     handleFieldChange(eventId, fieldName, files, true); // Pass true to indicate this is a file
    // };
    const handleFileChange = (eventId, fieldName, files) => {
        if (files.length > 0) {
            // Assuming you want to keep the file object for upload and the file name for display
            setEditedEvents(prev => ({
                ...prev,
                [eventId]: {
                    ...prev[eventId],
                    [fieldName]: files[0], // Store the File object for upload
                    [`${fieldName}Name`]: files[0].name // Store the file name for display
                }
            }));
        }
    };


    function toYYYYMMDD(date) {
        const year = date.getFullYear();
        // getMonth() returns 0-11; add 1 for 1-12, padStart to ensure two digits
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        // getDate() returns 1-31; padStart to ensure two digits
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const formattedDate = toYYYYMMDD(dateObject);



    return (
        <>
            {events.map((event, index) => (
                <div key={index} className="event-card">
                    <div className='buttons'>
                        {/* Add more fields as needed */}
                        <button onClick={() => handleEdit(event._id)}>
                            {editingId === event._id ? 'Cancel' : 'Edit'}
                        </button>
                        <button onClick={() => handleDelete(event._id)}>Delete</button>
                        {editingId === event._id && (
                            <button onClick={() => handleSave(event._id)}>Save</button>
                        )}
                    </div>
                    <div className='cardInner'>
                        <label >Category:</label>
                        <select name="category" value={editingId === event._id ? editedEvents[event._id]?.category || '' : event.category}
                            disabled={editingId !== event._id}
                            onChange={(e) => handleFieldChange(event._id, 'category', e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="event">Event</option>
                            <option value="recentUpdates">Recent Updates</option>
                        </select>
                    </div>
                    <div className='cardInner'>
                        <label>
                            Title:

                        </label>
                        <input
                            type="text"
                            value={editingId === event._id ? editedEvents[event._id]?.title || '' : event.title}
                            disabled={editingId !== event._id}
                            onChange={(e) => handleFieldChange(event._id, 'title', e.target.value)}
                        />
                    </div>
                    <div className='cardInner'>
                        <label >Tagline:</label>
                        <input
                            type="text"
                            name="tagline"
                            placeholder="Tagline"
                            value={editingId === event._id ? editedEvents[event._id]?.tagline || '' : event.tagline}
                            disabled={editingId !== event._id}
                            onChange={(e) => handleFieldChange(event._id, 'tagline', e.target.value)}
                        />
                    </div>

                    <div className='cardInner'>
                        <label>
                            Description:
                        </label>
                        <textarea
                            value={editingId === event._id ? editedEvents[event._id]?.description || '' : event.description}
                            disabled={editingId !== event._id}
                            onChange={(e) => handleFieldChange(event._id, 'description', e.target.value)}
                        />

                    </div>
                    <div className='cardInner'>
                        <label >Select a time:</label>
                        <input type="time" id="appt" value={editingId === event._id ? editedEvents[event._id]?.time || '' : event.time}
                            disabled={editingId !== event._id}
                            onChange={(e) => handleFieldChange(event._id, 'time', e.target.value)}></input>
                    </div>
                    <div className='cardInner'>
                        <label>Photo/Video:</label>
                        {/* Display the file URL if available and in edit mode */}
                        {editingId === event._id && editedEvents[event._id]?.photoVideoName ? (
                            <div>
                                {/* Display the file URL as a clickable link */}
                                <a href={editedEvents[event._id].photoVideoName} target="_blank" rel="noopener noreferrer">View Current File</a>
                            </div>
                        ) : null}

                        {/* Always show the file input to allow file upload; enable it during edit mode */}
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(event._id, 'photoVideo', e.target.files)}
                            disabled={editingId !== event._id}
                            style={{ display: editingId === event._id ? 'block' : 'none' }} // Optionally hide when not editing
                        />

                        {/* Optionally, display a message if a file is already linked but not in edit mode */}
                        {editingId !== event._id && event.photoVideo && (
                            <div>
                                <a href={event.photoVideo} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
                            </div>
                        )}
                    </div>


                    <div className='cardInner'>
                        <label >Bookmyshow:</label>
                        <input
                            type="text"
                            name="bookMyShowUrl"
                            placeholder="Book My Show URL"
                            value={editingId === event._id ? editedEvents[event._id]?.bookMyShowUrl || '' : event.bookMyShowUrl}
                            disabled={editingId !== event._id}
                            onChange={(e) => handleFieldChange(event._id, 'bookMyShowUrl', e.target.value)}
                        />

                    </div>

                    <div className='cardInner'>
                        <label>
                            From Date:
                        </label>
                        <input
                            type="date"
                            value={editingId === event._id ? (editedEvents[event._id]?.fromDate ? toYYYYMMDD(new Date(editedEvents[event._id]?.fromDate)) : '') : toYYYYMMDD(new Date(event.fromDate))}
                            onChange={(e) => handleFieldChange(event._id, 'fromDate', e.target.value)}
                            disabled={editingId !== event._id}
                        />


                    </div>


                    <div className='cardInner'>
                        <label>
                            ToDate:
                        </label>
                        <input
                            type="date"
                            value={editingId === event._id ? (editedEvents[event._id]?.toDate ? toYYYYMMDD(new Date(editedEvents[event._id]?.toDate)) : '') : toYYYYMMDD(new Date(event.toDate))}
                            onChange={(e) => handleFieldChange(event._id, 'fromDate', e.target.value)}
                            disabled={editingId !== event._id}
                        />
                    </div>



                </div>
            ))}
        </>
    );
};

export default UpcomingEvents;
