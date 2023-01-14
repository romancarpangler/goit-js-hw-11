import axios from 'axios';

export default async function fetchImages(value, page) {
  const url = 'https://pixabay.com/api/';
  const key = '32827257-9a0fc54d12c963eef1dafe00d';
  const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios
    .get(`${url}${filter}`)
    .then(response => console.log(response.data));
}
