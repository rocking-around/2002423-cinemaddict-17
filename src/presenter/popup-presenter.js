import FilmDetailsPopupView from '../view/film-details-popup-view';
import { isEscapeKey, isCtrlEnterKey } from '../utils/common.js';
import { nanoid } from 'nanoid';

export default class PopupPresenter {

  #film = null;
  #addToWatchListCallback = null;
  #addToWatchedCallback = null;
  #addToFavoriteCallback = null;
  #addCommentCallback = null;
  #deleteCommentCallback = null;
  #filmDetailPopupComponent = null;
  #isOpen = false;

  constructor(
    addToWatchListCallback,
    addToWatchedCallback,
    addToFavoriteCallback,
    addCommentCallback,
    deleteCommentCallback,
  ) {
    this.#addToWatchListCallback = addToWatchListCallback;
    this.#addToWatchedCallback = addToWatchedCallback;
    this.#addToFavoriteCallback = addToFavoriteCallback;
    this.#addCommentCallback = addCommentCallback;
    this.#deleteCommentCallback = deleteCommentCallback;
  }

  init = (film) => {
    this.#film = film;
    if (this.isOpen()) {
      this.#filmDetailPopupComponent.rerender(film);
    } else {
      this.#openPopup(film);
    }
  };

  #openPopup = () => {
    this.#closePopup();
    const onEscapePageKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this.#closePopup();
      }
    };
    const onCtrlEnterPageKeyDown = (evt) => {
      if (isCtrlEnterKey(evt)) {
        this.#addComment();
      }
    };
    this.#filmDetailPopupComponent = new FilmDetailsPopupView(this.#film);
    document.addEventListener(
      'keydown',
      document.escKeyDownEvt = (evt) => onEscapePageKeyDown(evt)
    );
    document.addEventListener(
      'keydown',
      document.ctrlEnterKeyDownEvt = (evt) => onCtrlEnterPageKeyDown(evt)
    );
    this.#filmDetailPopupComponent.setCloseBtnClickHandler(() => this.#closePopup());
    this.#filmDetailPopupComponent.setAddToWatchlistBtnClickHandler(this.#addToWatchListCallback);
    this.#filmDetailPopupComponent.setAddWatchedBtnClickHandler(this.#addToWatchedCallback);
    this.#filmDetailPopupComponent.setAddFavoriteBtnClickHandler(this.#addToFavoriteCallback);
    this.#filmDetailPopupComponent.setAddCommentCallback(this.#addComment);
    this.#filmDetailPopupComponent.setDeleteCommentCallback(this.#deleteCommentCallback);
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#filmDetailPopupComponent.element);
    this.#isOpen = true;
  };

  #addComment = () => {
    const {text, emoji, filmId} = this.#filmDetailPopupComponent.createComment();
    const comment = {
      id: nanoid(),
      text: text,
      emoji: emoji,
      author: 'user',
      date: Date.now(),
      filmId: filmId
    };
    this.#addCommentCallback(comment);
  };

  #closePopup =() => {
    if (!this.#isOpen) {
      return;
    }
    document.body.removeChild(FilmDetailsPopupView.filmDetailsElement);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', document.escKeyDownEvt);
    document.removeEventListener('keydown', document.ctrlEnterKeyDownEvt);
    this.#isOpen = false;
  };

  isOpen() {
    return this.#isOpen;
  }
}
