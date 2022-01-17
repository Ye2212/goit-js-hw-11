import './sass/main.scss';
import { refs } from './js/refs';
import fetchPixabay from './js/fetch-pixabay';
import cardTemplate from './template-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import scroll from './js/scroll';

// ==================================================================onFormSubmit=======================
refs.form.addEventListener('submit', onFormSubmit);
let searchingData = '';
let page = 1;
let perPage = 0;

async function onFormSubmit(e){
e.preventDefault();

searchingData = e.currentTarget.searchQuery.value;
page = 1;
if(searchingData.trim() === '') {
    Notify.failure('Please enter your search data.');
    return;
}
const response = await fetchPixabay(searchingData, page);
perPage = response.hits.length;

    if (response.totalHits <= perPage) {
        addISHidden();
    } else {
        removeIsHidden();
        }

    if (response.totalHits === 0) {
        clearGalleryHTML();
        refs.endcollectionText.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again!');
    }
    try {
 
        if (response.totalHits > 0) {
            Notify.info(`Hooray! We found ${response.totalHits} images`);
            clearGalleryHTML();
            renderCard(response.hits);
        };
    } catch(error){
        console.log(error);
    }
}
// =====================================================================loadMore========================
refs.loadMoreBtn.addEventListener('click', loadMore);



async function loadMore(){
try{
    refs.loadMoreBtn.disabled = true;
pageIncrement();
const response = await fetchPixabay(searchingData, page);


    renderCard(response.hits);
    perPage += response.hits.length;
    scroll();

    if (perPage >= response.totalHits) {
        Notify.failure("We're sorry, but you've reached the end of search results.");
        addISHidden();
    }
    refs.loadMoreBtn.disabled = false;
} catch(error){
    console.log(error)

}

}

// =============================================================================API=====================
function addISHidden(){
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.endcollectionText.classList.remove('is-hidden');
}
function removeIsHidden(){
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.endcollectionText.classList.add('is-hidden');
}
function pageIncrement(){
    page += 1;
}
function clearGalleryHTML(){
    refs.gallery.innerHTML = '';
}
function lightbox(){
    let lightbox = new SimpleLightbox('.gallery a', { 
        captions: true,
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
});
    lightbox.refresh();
}
function renderCard(array){
    const cardMarkup = array.map(item => cardTemplate(item)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
lightbox();
}