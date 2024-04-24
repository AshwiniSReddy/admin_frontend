// src/socket.js
import io from 'socket.io-client';
export const socket = io(process.env.REACT_APP_BACKEND_URL); // Adjust your server URL accordingly
