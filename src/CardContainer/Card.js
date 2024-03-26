import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compressor from "compressorjs";

import './Card.css'
// Define the Card component
const Card = ({ cardData, updateCard, index, handleSubmit, handleEdit, isEditing }) => {
  // Handle input changes and update the state in the parent component


  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === 'file') {
      // For file inputs, directly use the file object
      const file = e.target.files[0]; // Get the first file
      if (file && file.type.startsWith('image/')) {
        // Create an image element to load the file
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          // Determine the image's orientation based on its width and height
          const isLandscape = img.width > img.height;
          // Set maxWidth and maxHeight based on the orientation
          const maxWidth = isLandscape ? 1920 : 1080;
          const maxHeight = isLandscape ? 1080 : 1920;

          // Use Compressorjs to compress the image with orientation-specific dimensions
          new Compressor(file, {
            quality: 0.6, // Adjust the quality as needed
            maxWidth,
            maxHeight,
            mimeType: "image/webp",
            success: (compressedFile) => {
              // Update the state with the compressed image file
              updateCard(index, name, compressedFile);
            },
            error: (err) => {
              console.error('Compression error:', err);
              // Handle the error as needed (e.g., fallback to original file)
              updateCard(index, name, file);
            },
          });
        };
      } else {
        // If the file is not an image, proceed as usual
        updateCard(index, name, file);
      }

      // updateCard(index, name, file); // Update the state
    } else {
      // For all other inputs, proceed as usual
      const value = e.target.value;
      updateCard(index, name, value);
    }
  };


  return (
    <form className="card" >
      <div className='cardInner'>
        <label >Category:</label>
        <select name="category" onChange={handleChange} data-index={index} value={cardData.category} disabled={cardData.isSaved}>
          <option value="">Select Category</option>
          <option value="event">Event</option>
          <option value="recentUpdates">Recent Updates</option>
        </select>
      </div>
      <div className='cardInner'>

        <label >From:</label>
        <input type="date" id="fromDate" data-index={index} name="fromDate" disabled={cardData.isSaved}></input>
      </div>
      <div className='cardInner'>
        <label >To:</label>
        <input type="date" id="ToDate" data-index={index} name="ToDate" disabled={cardData.isSaved}></input>
      </div>
      <div className='cardInner'>
        <label >Select a time:</label>
        <input type="time" id="appt" data-index={index} name="appt" disabled={cardData.isSaved}></input>
      </div>
      <div className='cardInner'>

      </div>
      <div className='cardInner'>
        <label >Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={cardData.title}
          onChange={handleChange}
          data-index={index}
          disabled={cardData.isSaved}
        />
      </div>
      <div className='cardInner'>
        <label >Tagline:</label>
        <input
          type="text"
          name="tagline"
          placeholder="Tagline"
          value={cardData.tagline}
          onChange={handleChange}
          data-index={index}
          disabled={cardData.isSaved}
        />
      </div>
      <div className='cardInner'>
        <label >Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={cardData.description}
          onChange={handleChange}
          data-index={index}
          disabled={cardData.isSaved}
        />
      </div>

      {/* Add more form fields as needed */}
      <div className='cardInner'>
        <label for="photoVideo">Photo(Max file size: 2MB<br />Resolution: 1920x1080 (landscape))</label>
        <input
          type="file"
          name="photoVideo"
          placeholder="Photo/Video URL"
          // value={cardData.photoVideo}
          onChange={handleChange}
          data-index={index}
          disabled={!isEditing && cardData.isSaved} // Enable file input only in edit mode
        />

      </div>
      <div className='cardInner'>
        <label for="photoPortrait">Photo(Max file size: 2MB<br />Resolution: 1080x1920 (portrait))</label>
        <input
          type="file"
          name="photoPortrait"
          placeholder="Photo/Video URL"
          // value={cardData.photoVideo}
          onChange={handleChange}
          data-index={index}
          disabled={!isEditing && cardData.isSaved} // Enable file input only in edit mode
        />

      </div>
      <div className='cardInner'>
        <label>Bookmyshow:</label>
        <input
          type="text"
          name="bookMyShowUrl"
          placeholder="Book My Show URL"
          value={cardData.bookMyShowUrl}
          onChange={handleChange}
          data-index={index}
          disabled={cardData.isSaved}
        />


      </div>

      <div>

        <div><button onClick={handleSubmit} style={{ margin: '20px' }}>Save</button></div>


      </div>

    </form>
  );
};

// Define the main component
const CardsContainer = () => {
  // Initialize the state with one default card
  const [cards, setCards] = useState([{
    fromDate: '',
    toDate: '',
    time: '',
    title: '',
    tagline: '',
    description: '',
    photovedio: " ",
    photoPortrait: "",
    bookMyShow: "",
    preferences: "",
    isSaved: false,
    _id: ""
  }]);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (e, index) => {
    e.preventDefault();
    setCards(currentCards =>
      currentCards.map((card, cardIndex) =>
        index === cardIndex ? { ...card, isSaved: false } : card
      )
    );

    // console.log(index)
    setEditingIndex(index); // Mark this card as being edited
  };



  async function fetchUpcomingEventsWithAxios() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recentEvents`);
      console.log(response.data);
      // Process the data

    } catch (error) {
      console.error('There was an error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchUpcomingEventsWithAxios();
    cards.forEach(async (card, index) => {
      const data = new FormData();
      Object.keys(card).forEach(key => {
        // Assuming all other fields are already being handled correctly
        data.append(key, card[key]);
      });

      // Capture and append 'fromDate', 'toDate', and 'time' values directly from the form inputs
      // These selectors might need to be adjusted based on your actual form structure
      const fromDateInput = document.querySelector(`input[name="fromDate"][data-index="${index}"]`);
      const toDateInput = document.querySelector(`input[name="ToDate"][data-index="${index}"]`); // Note: Ensure the name matches your form, might be "toDate"
      const timeInput = document.querySelector(`input[name="appt"][data-index="${index}"]`);


      if (fromDateInput) {
        data.append('fromDate', fromDateInput.value);
      }
      if (toDateInput) {
        data.append('toDate', toDateInput.value); // Ensure the field name matches your backend expectation
      }
      if (timeInput && timeInput.value) { // Ensure there's a value and it's a string

        data.append('time', timeInput.value); // Append it as a single string value
      }

      try {
        // Submit the FormData
        console.log(data)
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        // Handle the submission success
        // Inside the try block, after the successful axios.post call
        setCards(currentCards =>
          currentCards.map((item, itemIndex) =>
            index === itemIndex ? { ...item, isSaved: true } : item
          )
        );
        window.location.reload();
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        // Handle the submission error
      }





    });
  };








  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  return (
    <div className='admin_page'>

      {cards.map((card, index) => (
        <Card key={card._id || index} cardData={card} updateCard={updateCard} index={index} handleSubmit={handleSubmit} handleEdit={(e) => handleEdit(e, index)} />
      ))}







    </div>
  );
};

export default CardsContainer;

