import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Shorten a URL
export const shortenUrl = async (originalUrl) => {
  try {
    const response = await api.post('/shorten', { originalUrl });
    return response.data;
  } catch (error) {
    console.error('Error shortening URL:', error.response?.data || error.message);
    throw error;
  }
};

// Get all shortened URLs (for analytics)
export const getAllUrls = async () => {
  try {
    const response = await api.get('/api/urls');
    return response.data;
  } catch (error) {
    console.error('Error fetching URLs:', error.response?.data || error.message);
    throw error;
  }
};

// Get URL stats by shortId
export const getUrlStats = async (shortId) => {
  try {
    const response = await api.get(`/api/urls/${shortId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching URL stats:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a shortened URL
export const deleteUrl = async (shortId) => {
  try {
    const response = await api.delete(`/api/urls/${shortId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting URL:', error.response?.data || error.message);
    throw error;
  }
};

export default api;