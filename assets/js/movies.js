import {
  addMovieToList,
  clearMovieMarkup,
  createElement,
  createMarkup,
  createStyle,
  movieList,
  inputSearch,
  triggerMode
} from './dom.js';

let siteUrl = null;
let searchLast = null;

const debounce = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms);
  };
})();

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((json) => {
    if (!json || !json.Search) throw Error('The server returned the wrong object');

    return json.Search;
  });

const inputSearchHandler = (e) => {
  debounce(() => {

    const searchString = e.target.value.trim();

    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMovieMarkup();

      getData(`${siteUrl}?s=${searchString}&apikey=2645125e`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.log(err));
        
    } 

    searchLast = searchString;

  }, 2000);
};

export const appInit = () => {
  createStyle();
  createMarkup();
  siteUrl = 'https://www.omdbapi.com/';

  inputSearch.addEventListener('keyup', inputSearchHandler);
};
