import FilmDetailsPopupView from '../view/film-details-popup-view';
import { isEscapeKey } from '../utils/common.js';
import structuredClone from '@ungap/structured-clone';

export default class PopupPresenter {

  #film = null;
  #changeDataCallback = null;
  #comments = null;

  constructor(changeDataCallback) {
    this.#changeDataCallback = changeDataCallback;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;
    this.#openPopup(film);
  };

  #openPopup = () => {
    this.#closePopup();
    const onPageKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this.closePopup();
      }
    };
    const filmDetailPopupComponent = new FilmDetailsPopupView(this.#film, this.#comments);
    document.addEventListener(
      'keydown',
      document.escKeyDownEvt = (evt) => onPageKeyDown(evt)
    );
    filmDetailPopupComponent.setCloseBtnClickHandler(() => this.#closePopup());
    filmDetailPopupComponent.setAddToWatchlistBtnClickHandler(this.#handleWatchListClick);
    filmDetailPopupComponent.setAddWatchedBtnClickHandler(this.#handleWatchedClick);
    filmDetailPopupComponent.setAddFavoriteBtnClickHandler(this.#handleFavoriteClick);
    document.body.classList.add('hide-overflow');
    document.body.appendChild(filmDetailPopupComponent.element);
  };

  #closePopup =() => {
    if (!document.body.contains(FilmDetailsPopupView.filmDetailsElement)) {
      return;
    }
    document.body.removeChild(FilmDetailsPopupView.filmDetailsElement);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', document.escKeyDownEvt);
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

  #changeFilmData = (changeFilmCallback) => {
    const filmClone = structuredClone(this.#film);
    changeFilmCallback(filmClone);
    this.#film = filmClone;
    this.#changeDataCallback(filmClone);
  };
}
