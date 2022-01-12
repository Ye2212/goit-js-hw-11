export default function fetchPixabay (data){

    return fetch(`https://pixabay.com/api/?key=25212904-bc289a80479625a5a070d2ccf&q=${data}`)
    .then(r=>r.json())
}