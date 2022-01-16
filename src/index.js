import './sass/main.scss';
import { refs } from './js/refs';
import fetchPixabay from './js/fetch-pixabay';
import cardTemplate from './template-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


// import axios from 'axios';


function renderCard(array){
 const cardMarkup = array.map(item => cardTemplate(item)).join('');
 refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
lightbox();
}
function lightbox(){
    let lightbox = new SimpleLightbox('.gallery a', { 
        captions: true,
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
    lightbox.refresh();
// scroll();
}

function scroll(){
    const { height: cardHeight } = document.querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
    });
}

refs.form.addEventListener('submit', onFormSubmit);
let searchingData = '';
let page = 1;
let per_page = 0;

function onFormSubmit(e){
e.preventDefault();

searchingData = e.currentTarget.searchQuery.value;
page = 1;
if(searchingData.trim() === '') {
    Notify.failure('Please enter your search data.');
    return;
}

fetchPixabay(searchingData, page)
.then(response => {

per_page = response.hits.length;

    if (response.totalHits === 0) {
        refs.gallery.innerHTML = '';
        Notify.failure('Sorry, there are no images matching your search query. Please try again!');
    }
    if (response.totalHits > 0) {
        Notify.info(`Hooray! We found ${response.totalHits} images`);
        refs.gallery.innerHTML = '';
        renderCard(response.hits);
        refs.loadMoreBtn.classList.remove('is-hidden');
        refs.endcollectionText.classList.add('is-hidden');
    };

});
}

refs.loadMoreBtn.addEventListener('click', loadmore);
refs.loadMoreBtn.classList.add('is-hidden');


function loadmore(){
page += 1;
fetchPixabay(searchingData, page).then(response => {
    renderCard(response.hits);
    per_page += response.hits.length;
    scroll();

    if (per_page >= response.totalHits) {
        Notify.failure("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.endcollectionText.classList.remove('is-hidden');
    }
});
}


