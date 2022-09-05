   import axios from 'axios';
   import { Notify } from 'notiflix/build/notiflix-notify-aio';
   export { fetchImages };

    const API_KEY = 'key=29651354-06221cc15eb0ca625c8b2fb12';
    const mainUrl = 'https://pixabay.com/api/?';
    const parametersUrl = '&image_type=photo&orientation=horizontal&safesearch=true';

  async function fetchImages(searchQuery, page, perPage) {

    try {
    const response = await axios.get(`${mainUrl}${API_KEY}&q=${searchQuery}${parametersUrl}&per_page=${perPage}&page=${page}`);
        return response;
  } catch (error) {
        Notify.failure(error.message)
  }  
}
