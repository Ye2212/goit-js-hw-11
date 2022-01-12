import './sass/main.scss';
import { refs } from './js/refs';
import fetchPixabay from './js/fetch-pixabay';
import cardTemplate from './template-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import axios from 'axios';



function renderCard(array){
 const cardMarkup = array.map(item => cardTemplate(item)).join('');
 refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
}


refs.form.addEventListener('submit', onFormSubmit);
let searchingData = '';
let page = 0;
let totalHits;

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
    // refs.form.reset();
    // console.log(response);
    if (response.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again!');
    }
    if (response.totalHits > 0) {
        Notify.info(`Hooray! We found ${response.totalHits} images`);
        refs.gallery.innerHTML = '';
        renderCard(response.hits);
    }
});

}




