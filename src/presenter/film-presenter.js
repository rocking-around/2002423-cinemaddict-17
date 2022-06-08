import {remove, render, replace} from '../framework/render.js';
import {showAlert} from '../utils/common.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import structuredClone from '@ungap/structured-clone';
import {FilterType, UpdateType, UserAction} from '../const.js';

export default class FilmPresenter {

  #filmListContainer = null;
  #film = null;
  #filmComponent = null;
  #changeDataCallback = null;
  #popupPresenter = null;
  #filterModel = null;

  constructor(filmListContainer, changeDataCallback, filterModel) {
    this.#filmListContainer = filmListContainer;
    this.#changeDataCallback = changeDataCallback;
    this.#filterModel = filterModel;
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
    if (this.#popupPresenter.isOpen()) {
      this.#openPopup();
    }
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
  };

  #renderFilm = () => {
    render(this.#filmComponent, this.#filmListContainer);
  };

  #openPopup = () => {
    this.#popupPresenter.init(this.#film);
  };

  #isValidForFilterChange = (filmAttribute, filerType) => {
    if (filmAttribute
      && this.#filterModel.filter === filerType
      && this.#popupPresenter.isOpen()
    ) {
      showAlert(
        `Cannot remove film from ${filerType.TEXT} list because this filter
         is applied and popup is openned`
      );
      return false;
    }
    return true;
  };

  #handleWatchedClick = () => {
    this.#changeFilmData((film) => {
      if (!this.#isValidForFilterChange(film.userDetails.alreadyWatched, FilterType.HISTORY)) {
        return;
      }
      film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched;
    });
  };

  #handleWatchListClick = () => {
    this.#changeFilmData((film) => {
      if (!this.#isValidForFilterChange(film.userDetails.watchlist, FilterType.WATCHLIST)) {
        return;
      }
      film.userDetails.watchlist = !film.userDetails.watchlist;
    });
  };

  #handleFavoriteClick = () => {
    this.#changeFilmData((film) => {
      if (!this.#isValidForFilterChange(film.userDetails.favorite, FilterType.FAVORITES)) {
        return;
      }
      film.userDetails.favorite = !film.userDetails.favorite;
    });
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
    this.#filmComponent = null;
  }
}
