export default function fetchPixabay (data, page){
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25212904-bc289a80479625a5a070d2ccf';
const PARAMETRES = `key=${KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    return fetch(`${BASE_URL}?${PARAMETRES}`)
    .then(res => res.json())
}