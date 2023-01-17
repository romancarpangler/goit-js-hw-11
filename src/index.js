import fetchImages from './fetch';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSubmitSearchForm);
const input = document.querySelector('[name="searchQuery"]');

const button = document.querySelector('.load-more');
button.addEventListener('click', onClickLoadMoreBtn);
button.classList.add('is-hidden');

const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentHits = 0;

async function onSubmitSearchForm(e) {
  e.preventDefault();

  const inputValue = input.value;

  currentPage = 1;

  if (inputValue === '') {
    return;
  }

  const response = await fetchImages(inputValue, currentPage);
  currentHits += response.hits.length;

  if (response.totalHits > 40) {
    button.classList.remove('is-hidden');
  } else {
    button.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      renderCardImage(response.hits);

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * -100,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      button.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetchImages(inputValue, currentPage);

  currentHits += response.hits.length;

  if (currentHits === response.totalHits || currentHits > response.totalHits) {
    button.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }

  renderCardImage(response.hits);
}

function renderCardImage(arr) {
  const markup = arr
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
