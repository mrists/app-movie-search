export let movieList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  evt = null,
  handler = null
}) => {
  const el = document.createElement(type);

  for (let key in attrs) if (key !== 'innerText') el.setAttribute(key, attrs[key]);
  else el.innerHTML = attrs[key];

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);
  if (evt && handler) el.addEventListener(evt, handler);

  return el;
};

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerText: `
        * {
        box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
        }
        .container {
          padding: 20px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .movies {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .movie {
          display: flex;
          align-content: center;
          justify-content: center;
          border: 1px solid black;
          border-radius: 25px;
          overflow: hidden;
        }
        .movie__image {
          width: 100%;
          object-fit: cover;
        }
        .search {
          margin-bottom: 30px;
        }
        .search__label-input {
          display: block;
          margin-bottom: 7px;
        } 
        .search__input {
          display: block;
          padding: 10px 15px;
          width: 400px;
          border: 1px solid gray;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .search__label-checkbox {
          display: block;
          font-size: 12px;
          margin-top: -17px;
          margin-left: 25px;
        }`
    },
    container: document.head
  });
};

export const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: {class: 'container'},
    container: document.body,
    position: 'prepend'
  });

  createElement({
    type: 'h1',
    attrs: {innerText: 'App-movie-search'},
    container
  });

  const searchBox = createElement({
    type: 'div',
    attrs: {class: 'search'},
    container
  })

  createElement ({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerText: 'Movie search'
    },
    container: searchBox
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      type: 'text',
      placeholder: 'Enter movie title',
      id: 'search'
    },
    container: searchBox
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox'
    },
    container: searchBox,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerText: 'Add movies to an existing list'
    },
    container: searchBox
  });

  movieList = createElement({
    type: 'div',
    attrs: {class: 'movies'},
    container
  });
};

export const addMovieToList = (m) => {
  const item = createElement({
    type: 'div',
    attrs: {class: 'movie'},
    container: movieList
  });
 
  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^(http|https):\/\//i.test(m.Poster)? m.Poster : 'assets/img/no-image.jpeg',
      alt: m.Title,
      title: m.Title
    },
    container: item
  });
};

export const clearMovieMarkup = () => movieList && (movieList.innerHTML = '');

