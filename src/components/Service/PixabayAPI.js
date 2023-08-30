import axios from 'axios';


const API_KEY = '36910570-35daf5d8a5ff9002bcd25fc68';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 10;

export const searchImages = async (query, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};