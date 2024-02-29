// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Card.css'
// // Define the Card component
// const Card = ({ cardData, updateCard, index, addCard, handleSubmit, handleEdit, isEditing }) => {
//   // Handle input changes and update the state in the parent component
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     updateCard(index, name, value);
//   };

//   return (
//     <form className="card" >
//       <div className='cardInner'>
//         <label htmlFor="category">Category:</label>
//         <select name="category" onChange={handleChange} data-index={index} value={cardData.category} disabled={cardData.isSaved}>
//           <option value="">Select Category</option>
//           <option value="event">Event</option>
//           <option value="recentUpdates">Recent Updates</option>
//         </select>
//       </div>
//       <div className='cardInner'>

//         <label for="birthday">From:</label>
//         <input type="date" id="fromDate" data-index={index} name="fromDate" disabled={cardData.isSaved}></input>
//       </div>
//       <div className='cardInner'>
//         <label for="birthday">To:</label>
//         <input type="date" id="ToDate" data-index={index} name="ToDate" disabled={cardData.isSaved}></input>
//       </div>
//       <div className='cardInner'>
//         <label for="appt">Select a time:</label>
//         <input type="time" id="appt" data-index={index} name="appt" disabled={cardData.isSaved}></input>
//       </div>
//       <div className='cardInner'>

//       </div>
//       <div className='cardInner'>
//         <label for="title">Title:</label>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={cardData.title}
//           onChange={handleChange}
//           data-index={index}
//           disabled={cardData.isSaved}
//         />
//       </div>
//       <div className='cardInner'>
//         <label for="tagline">Tagline:</label>
//         <input
//           type="text"
//           name="tagline"
//           placeholder="Tagline"
//           value={cardData.tagline}
//           onChange={handleChange}
//           data-index={index}
//           disabled={cardData.isSaved}
//         />
//       </div>
//       <div className='cardInner'>
//         <label for="description">Description:</label>
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={cardData.description}
//           onChange={handleChange}
//           data-index={index}
//           disabled={cardData.isSaved}
//         />
//       </div>

//       {/* Add more form fields as needed */}
//       <div className='cardInner'>
//         <label for="photoVideo">PhotoVedio:</label>
//         <input
//           type="file"
//           name="photoVideo"
//           placeholder="Photo/Video URL"
//           value={cardData.photoVideo}
//           onChange={handleChange}
//           data-index={index}
//           disabled={cardData.isSaved}
//         />
//       </div>
//       <div className='cardInner'>
//         <label for="bookMyShow">Bookmyshow:</label>
//         <input
//           type="text"
//           name="bookMyShowUrl"
//           placeholder="Book My Show URL"
//           value={cardData.bookMyShowUrl}
//           onChange={handleChange}
//           data-index={index}
//           disabled={cardData.isSaved}
//         />

//       </div>
//       <div className='cardInner'>
//         <label for="quantity">Peferences:</label>
//         <input type="number" data-index={index} id="preference" name="preference" min="1" max="5" disabled={cardData.isSaved}></input>
//       </div>
//       <div>
//         {/* <div><button onClick={addCard} style={{ margin: '20px' }}>Add</button></div> */}
//         <div><button onClick={handleSubmit} style={{ margin: '20px' }}>Save</button></div>
//         <div><button onClick={(e) => handleEdit(e, index)} style={{ margin: '20px' }}>Edit</button></div>
//         <div><button style={{ margin: '20px' }}>Delete</button></div>

//       </div>

//     </form>
//   );
// };

// // Define the main component
// const CardsContainer = () => {
//   // Initialize the state with one default card
//   const [cards, setCards] = useState([{
//     fromDate: '',
//       toDate: '',
//       time: '',
//       title: '',
//       tagline: '',
//       description: '',
//       photovedio: " ",
//       bookMyShow: "",
//       preferences: "",
//       isSaved: false,
//       _id:""
//   }]);

//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleEdit = (e, index) => {
//     e.preventDefault();
//     setCards(currentCards =>
//       currentCards.map((card, cardIndex) =>
//         index === cardIndex ? { ...card, isSaved: false } : card
//       )
//     );

//     // console.log(index)
//     setEditingIndex(index); // Mark this card as being edited
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   cards.forEach(async (card, index) => {
//   //     const data = new FormData();
//   //     Object.keys(card).forEach(key => {
//   //       if (key !== 'photoVideo') { // Assuming 'photoVideo' is the name for your file input
//   //         data.append(key, card[key]);
//   //       }
//   //     });

//   //     // Handle file input separately
//   //     // Ensure you have a reference to the file input, or pass the file object directly
//   //     const fileInput = document.querySelector(`input[name="photoVideo"][data-index="${index}"]`);
//   //     if (fileInput && fileInput.files[0]) {
//   //       data.append('photoVideo', fileInput.files[0]);
//   //     }

//   //     try {
//   //       const response = await axios.post('http://localhost:5000/api/admin', data, {
//   //         headers: {
//   //           'Content-Type': 'multipart/form-data',
//   //         },
//   //       });
//   //       console.log(response.data);
//   //       // Handle success (clear form, show message, etc.)
//   //     } catch (error) {
//   //       console.error('There was an error submitting the form!', error);
//   //     }
//   //   });
//   // };



//   // async function fetchUpcomingEventsWithAxios() {
//   //   try {
//   //     const response = await axios.get('http://localhost:5000/api/recentEvents');
//   //     console.log(response.data);
//   //     // Process the data
//   //   } catch (error) {
//   //     console.error('There was an error:', error);
//   //   }
//   // }

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   fetchUpcomingEventsWithAxios();
//   //   cards.forEach(async (card, index) => {
//   //     const data = new FormData();
//   //     Object.keys(card).forEach(key => {
//   //       // Assuming all other fields are already being handled correctly
//   //       data.append(key, card[key]);
//   //     });

//   //     // Capture and append 'fromDate', 'toDate', and 'time' values directly from the form inputs
//   //     // These selectors might need to be adjusted based on your actual form structure
//   //     const fromDateInput = document.querySelector(`input[name="fromDate"][data-index="${index}"]`);
//   //     const toDateInput = document.querySelector(`input[name="ToDate"][data-index="${index}"]`); // Note: Ensure the name matches your form, might be "toDate"
//   //     const timeInput = document.querySelector(`input[name="appt"][data-index="${index}"]`);


//   //     if (fromDateInput) {
//   //       data.append('fromDate', fromDateInput.value);
//   //     }
//   //     if (toDateInput) {
//   //       data.append('toDate', toDateInput.value); // Ensure the field name matches your backend expectation
//   //     }
//   //     if (timeInput && timeInput.value) { // Ensure there's a value and it's a string

//   //       data.append('time', timeInput.value); // Append it as a single string value
//   //     }

//   //     try {
//   //       // Submit the FormData
//   //       const response = await axios.post('http://localhost:5000/api/admin', data, {
//   //         headers: {
//   //           'Content-Type': 'multipart/form-data',
//   //         },
//   //       });
//   //       console.log(response.data);
//   //       // Handle the submission success
//   //       // Inside the try block, after the successful axios.post call
//   //       setCards(currentCards =>
//   //         currentCards.map((item, itemIndex) =>
//   //           index === itemIndex ? { ...item, isSaved: true } : item
//   //         )
//   //       );

//   //     } catch (error) {
//   //       console.error('There was an error submitting the form!', error);
//   //       // Handle the submission error
//   //     }





//   //   });
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Call fetchUpcomingEventsWithAxios if necessary here or remove if not needed for submission logic

//     cards.forEach(async (card, index) => {
//       // Only proceed if editing or not saved yet (for simplicity, assuming all cards have a unique ID once saved)
//       if (editingIndex === index || !card.isSaved) {
//         const data = new FormData();
//         Object.keys(card).forEach(key => {
//           if (key !== 'photoVideo') { // Skip 'photoVideo' for now
//             data.append(key, card[key]);
//           }
//         });
        
      
//       // Capture and append 'fromDate', 'toDate', and 'time' values directly from the form inputs
//       // These selectors might need to be adjusted based on your actual form structure
//       const fromDateInput = document.querySelector(`input[name="fromDate"][data-index="${index}"]`);
//       const toDateInput = document.querySelector(`input[name="ToDate"][data-index="${index}"]`); // Note: Ensure the name matches your form, might be "toDate"
//       const timeInput = document.querySelector(`input[name="appt"][data-index="${index}"]`);


//       if (fromDateInput) {
//         data.append('fromDate', fromDateInput.value);
//       }
//       if (toDateInput) {
//         data.append('toDate', toDateInput.value); // Ensure the field name matches your backend expectation
//       }
//       if (timeInput && timeInput.value) { // Ensure there's a value and it's a string

//         data.append('time', timeInput.value); // Append it as a single string value
//       }

//         try {
//           let response;
//           if (editingIndex !== null && editingIndex === index) {
//             // PATCH request for updating an existing card
//             // Make sure your API supports PATCH and you have a valid endpoint and card ID
//             const cardId = card._id; // Assuming your card objects have an '_id' field when saved
//             console.log(card)
//             response = await axios.patch(`http://localhost:5000/api/admin/${cardId}`, data, {
//               headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log(response)
//           } else {
//             // POST request for adding a new card
//             response = await axios.post('http://localhost:5000/api/admin', data, {
//               headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             const data1 = response.data;
//             console.log(data1.data, "saves")
//             // Check if we're updating an existing card or adding a new one
//             if (index != null) {
//               // Update existing card
//               setCards(currentCards => currentCards.map((card, cardIndex) =>
//                 index === cardIndex ? { ...card, ...data1.data, _id: data1.data._id } : card
//               ));
//             } else {
//               // Add new card (assuming you handle adding cards differently)
//               setCards(currentCards => [...currentCards, { ...data1.data }]);
//             }
//           }

//           console.log(response.data,"response ");
//           // Update card state based on response if necessary
//           // For example, marking the card as saved or updating its ID
//           setCards(currentCards => currentCards.map((item, itemIndex) =>
//             index === itemIndex ? { ...item, isSaved: true, _id: response.data._id || item._id } : item
//           ));
//           console.log(cards,"cards")

//           if (editingIndex === index) {
//             setEditingIndex(null); // Reset editingIndex if editing was successful
//           }
//         } catch (error) {
//           console.error('There was an error submitting the form!', error);
//         }
//       }
//     });
//   };







//   const addCard = () => {
//     const newCard = {
//       fromDate: '',
//       toDate: '',
//       time: '',
//       title: '',
//       tagline: '',
//       description: '',
//       photovedio: " ",
//       bookMyShow: "",
//       preferences: "",
//       isSaved: false,
//       _id:""
//        // Add this line to track the save state
//     };
//     setCards(prevCards => [newCard, ...prevCards]);
//   };

//   const updateCard = (index, field, value) => {
//     const newCards = [...cards];
//     newCards[index][field] = value;
//     setCards(newCards);
//   };

//   return (
//     <>

//       {cards.map((card, index) => (
//         <Card key={card._id || index} cardData={card} updateCard={updateCard} index={index} addCard={addCard} handleSubmit={handleSubmit} handleEdit={(e) => handleEdit(e, index)} isEditing={editingIndex === index} />
//       ))}
//     </>
//   );
// };

// export default CardsContainer;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Card.css'
// Define the Card component
const Card = ({ cardData, updateCard, index, handleSubmit, handleEdit, isEditing }) => {
  // Handle input changes and update the state in the parent component
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   updateCard(index, name, value);
  // };
  
  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === 'file') {
      // For file inputs, directly use the file object
      const file = e.target.files[0]; // Get the first file
      updateCard(index, name, file); // Update the state
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
        <label for="photoVideo">PhotoVedio:</label>
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
      <div className='cardInner'>
        <label >Peferences:</label>
        <input type="number" data-index={index} id="preference" name="preference" min="1" max="5" disabled={cardData.isSaved}></input>
      </div>
      <div>
        {/* <div><button onClick={addCard} style={{ margin: '20px' }}>Add</button></div> */}
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
      bookMyShow: "",
      preferences: "",
      isSaved: false,
      _id:""
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
      const response = await axios.get('http://13.233.173.240/api/recentEvents');
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
        const response = await axios.post('http://13.233.173.240/api/admin', data, {
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
        <Card key={card._id || index} cardData={card} updateCard={updateCard} index={index}  handleSubmit={handleSubmit} handleEdit={(e) => handleEdit(e, index)} />
      ))}
  
     
      
     

    
     
    </div>
  );
};

export default CardsContainer;

