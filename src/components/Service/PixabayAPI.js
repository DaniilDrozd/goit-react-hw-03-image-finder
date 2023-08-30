import axios from 'axios';

export const searchImages = async (topic, page) => { 
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '36910570-35daf5d8a5ff9002bcd25fc68';
  const PER_PAGE = 12;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${topic}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
    );
    return response.data;
  } catch (error) {
    console.error("Sorry, there are no images matching your search query. Please try again.");
    throw error; 
  }
};
