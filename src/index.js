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
let currentHits = 0;

async function onSubmitSearchForm(e) {
  e.preventDefault();

  if (!inputValue) {
    return;
  }
  console.log('ff');
  const response = await fetchImages(inputValue, page);
  // currentHits = response.hits.length;

  // if ((response.totalHits = currentHits)) {
  //   button.classList.add('is-hidden');
  // }
  // button.classList.remove('is-hidden');
  // if (response.totalHits > 40) {
  //   button.classList.remove('is-hidden');
  // } else {
  //   button.classList.add('is-hidden');
  // }
}
