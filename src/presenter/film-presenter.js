import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import structuredClone from '@ungap/structured-clone';
import { UserAction, UpdateType } from '../const.js';

export default class FilmPresenter {

  #filmListContainer = null;
  #film = null;
  #filmComponent = null;
  #changeDataCallback = null;
  #popupPresenter = null;

  constructor(filmListContainer, changeDataCallback) {
    this.#filmListContainer = filmListContainer;
    this.#changeDataCallback = changeDataCallback;
    this.#popupPresenter = new PopupPresenter(
      this.#handleWatchListClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick,
      this.#addCommentClick,
      this.#deleteCommentClick,
    );
  }

  init = (film) => {
    this.#film = film;
    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmCardView(this.#film);
    this.#filmComponent.setFilmCardClickHandler(this.#openPopup);
    this.#filmComponent.setAddToWatchlistBtnClickHandler(this.#handleWatchListClick);
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
    if (this.#popupPresenter.isOpen()) {
      this.#openPopup();
    }
  };

  #renderFilm = () => {
    render(this.#filmComponent, this.#filmListContainer);
  };

  #openPopup = () => {
    this.#popupPresenter.init(this.#film);
  };

  #handleWatchedClick = () => {
    this.#changeFilmData((film) => (film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched));
  };

  #handleWatchListClick = () => {
    this.#changeFilmData((film) => (film.userDetails.watchlist = !film.userDetails.watchlist));
  };

  #handleFavoriteClick = () => {
    this.#changeFilmData((film) => (film.userDetails.favorite = !film.userDetails.favorite));
  };

  #addCommentClick = (comment) => {
    this.#changeDataCallback(UserAction.ADD_COMMENT, UpdateType.PATCH, comment);
  };

  #deleteCommentClick = (comment) => {
    this.#changeDataCallback(UserAction.DELETE_COMMENT, UpdateType.PATCH, comment);
  };

  #changeFilmData = (changeFilmCallback) => {
    const filmClone = structuredClone(this.#film);
    changeFilmCallback(filmClone);
    this.#film = filmClone;
    this.#changeDataCallback(UserAction.UPDATE_FILM, UpdateType.PATCH, filmClone);
  };

  destroy() {
    remove(this.#filmComponent);
  }
}
