import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import structuredClone from '@ungap/structured-clone';

export default class FilmPresenter {

  #filmListContainer = null;
  #film = null;
  #filmComponent = null;
  #changeDataCallback = null;

  constructor(filmListContainer, changeDataCallback) {
    this.#filmListContainer = filmListContainer;
    this.#changeDataCallback = changeDataCallback;
  }

  init = (film) => {
    this.#film = film;
    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmCardView(this.#film);
    this.#filmComponent.setAddToWatchlistBtnClickHandler(this.#handleWatchedListClick);
    this.#filmComponent.setAddWatchedBtnClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setAddFavoriteBtnClickHandler(this.#handleFavoriteClick);
    if (prevFilmComponent === null) {
      this.#renderFilm();
      return;
    }
    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }
    remove(prevFilmComponent);
  };

  #renderFilm = () => {
    render(this.#filmComponent, this.#filmListContainer);
  };

  #handleWatchedClick = () => {
    const filmClone = structuredClone(this.#film);
    filmClone.userDetails.alreadyWatched = !filmClone.userDetails.alreadyWatched;
    this.#changeDataCallback(filmClone);
  };

  #handleWatchedListClick = () => {
    const filmClone = structuredClone(this.#film);
    filmClone.userDetails.watchlist = !filmClone.userDetails.watchlist;
    this.#changeDataCallback(filmClone);
  };

  #handleFavoriteClick = () => {
    const filmClone = structuredClone(this.#film);
    filmClone.userDetails.favorite = !filmClone.userDetails.favorite;
    this.#changeDataCallback(filmClone);
  };
}
