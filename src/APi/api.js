import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const postsEndpoint = `${API_BASE_URL}/admin`;

export const fetchPosts = async () => {
  return axios.get(postsEndpoint);
};

export const createPost = async (postData) => {
  return axios.post(postsEndpoint, postData);
};

export const updatePost = async (postId, updateData) => {
  return axios.patch(`${postsEndpoint}/${postId}`, updateData);
};

// Add more post-related API calls here
