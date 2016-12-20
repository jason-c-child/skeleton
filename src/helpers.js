import 'whatwg-fetch'

export const fetchEndpoint = () =>
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(x => x.json())
    .catch(e => console.log('error fetching stuff', e.stack))

export const fetchPost = id =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(x => x.json())
    .catch(e => console.log('error fetching stuff', e.stack))
