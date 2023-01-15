import fetchImages from './fetch';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form');
const inputValue = input.value;
input.addEventListener('submit', onSubmitSearchForm);

const button = document.querySelector('.load-more');
button.classList.add('is-hidden');

const wraper = document.querySelector('.gallery');

let page = 1;

async function onSubmitSearchForm(e) {
  e.preventDefault();

  if (inputValue) {
    return;
  }

  const response = await fetchImages(inputValue, page);

  const d = response.totalHits;
  console.log(d);
}
