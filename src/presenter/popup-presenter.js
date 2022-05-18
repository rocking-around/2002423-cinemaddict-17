import FilmDetailsPopupView from '../view/film-details-popup-view';
import { isEscapeKey } from '../utils/common.js';

export default class PopupPresenter {

  #film = null;
  #comments = null;
  #addToWatchListCallback = null;
  #addToWatchedCallback = null;
  #addToFavoriteCallback = null;

  constructor(addToWatchListCallback, addToWatchedCallback, addToFavoriteCallback) {
    this.#addToWatchListCallback = addToWatchListCallback;
    this.#addToWatchedCallback = addToWatchedCallback;
    this.#addToFavoriteCallback = addToFavoriteCallback;
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
        this.#closePopup();
      }
    };
    const filmDetailPopupComponent = new FilmDetailsPopupView(this.#film, this.#comments);
    document.addEventListener(
      'keydown',
      document.escKeyDownEvt = (evt) => onPageKeyDown(evt)
    );
    filmDetailPopupComponent.setCloseBtnClickHandler(() => this.#closePopup());
    filmDetailPopupComponent.setAddToWatchlistBtnClickHandler(this.#addToWatchListCallback);
    filmDetailPopupComponent.setAddWatchedBtnClickHandler(this.#addToWatchedCallback);
    filmDetailPopupComponent.setAddFavoriteBtnClickHandler(this.#addToFavoriteCallback);
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
}
