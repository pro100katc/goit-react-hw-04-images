import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '27889873-2722b63d94526c003d8bed25b',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios.get(`?q=${searchQuery}&page=${page}`);
  return data;
};