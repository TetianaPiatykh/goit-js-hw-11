import './css/styles.css';
import {fetchImages} from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// import simpleLightbox from 'simplelightbox';
// import debounce from 'lodash.debounce';

const searchForm = document.querySelector("#search-form");
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let simpleLightBox;
let page = 1;
let searchQuery = '';
// let images = [];

searchForm.addEventListener('submit', fetchImagesSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

// loadMoreBtn.classList.add('invisible');
loadMoreBtn.classList.add('is-hidden');
function fetchImagesSearch(e) { 
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    page = 1;
    galleryContainer.innerHTML = '';
    
    // console.log(searchQuery);

    if (!searchQuery) { 
        return
    };

    fetchImages(searchQuery, page).then(({ data }) => {
        
            if (data.totalHits === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");  
        }
            else {
                
                Notify.success(`Hooray! We found ${data.totalHits} images.`);
                createGalleryMarkup(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, }).refresh(); 
            }
        if (data.totalHits > 40) {
            loadMoreBtn.classList.remove('is-hidden');
        }
            
       }).catch(error => console.log(error))
    // }

};

function onLoadMore() {
    page += 1;
fetchImages(searchQuery, page)
    .then(({ data }) => {
      createGalleryMarkup(data.hits);
        simpleLightBox.refresh();
        
      if (data.hits.length < 40) {
         Notify.info("We're sorry, but you've reached the end of search results.");
         loadMoreBtn.classList.add('is-hidden');
            }
    })
    .catch(error => console.log(error));
};


function createGalleryMarkup(images) {
    const markUp = images.map(image => {
        const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image; 
        return `<a class="gallery__link" href="${largeImageURL}">
        <div class="gallery__item">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
            <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
</a> `
    }).join('');

    galleryContainer.insertAdjacentHTML('beforeend', markUp);
};


// galleryContainer.addEventListener('click', simpleLightBox);



