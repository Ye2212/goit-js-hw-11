import './sass/main.scss';
import fetchPixabay from './js/fetch-pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import cardTemplate from './template-card.hbs';


const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
e.preventDefault();

const searchingData = e.currentTarget.searchQuery.value;
fetchPixabay(searchingData).then();
}




