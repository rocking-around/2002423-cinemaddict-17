import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFilmReleaseDate, humanizeFilmCommentDate } from '../utils/film.js';
import he from 'he';

const getGenres = (film) => {
  const genres = Array.from(film.genre).map(
    (genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  return `<td className="film-details__term">${film.genre.length > 1 ? 'Genres' : 'Genre'}</td>
  <td className="film-details__cell">
    ${genres}
  </td>`;
};

const getComments = (comments) => (
  comments.map((comment) => `
  <li class="film-details__comment" data-id=${comment.id}>
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${humanizeFilmCommentDate(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  ).join('')
);

const getNewCommentEmojiTemplate = (emoji) => {
  if (!emoji) {
    return '<div class="film-details__add-emoji-label"></div>';
  }
  return `
    <div style="background-image: url('./images/emoji/${emoji}.png'); background-size: cover" class="film-details__add-emoji-label">
      <input class="film-details__add-emoji-item visually-hidden" value="${emoji}">
    </div>
  `;
};

const getFilmDetailsPopupTemplate = ({film, emoji, comment}) => (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${film.poster}" alt="">

            <p class="film-details__age">${film.ageRestriction}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${film.title}</h3>
                <p class="film-details__title-original">Original: ${film.originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${film.rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${film.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${Array.from(film.writers).join(' ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${Array.from(film.actors).join(' ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeFilmReleaseDate(film.releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${film.runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${film.country}</td>
              </tr>
              <tr class="film-details__row">
                  ${getGenres(film)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${film.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${film.userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${film.userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${film.userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${getComments(film.comments)}
          </ul>

          <div class="film-details__new-comment">
            ${getNewCommentEmojiTemplate(emoji)}

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>
`);

export default class FilmDetailsPopupView extends AbstractStatefulView {

  constructor(film) {
    super();
    this._state = this.#convertObjectToState(film);
    this.#addEmojiClickHandler();
  }

  rerender(film, emoji, comment) {
    this.updateElement(
      this.#convertObjectToState(film, this.element.scrollTop, emoji, comment)
    );
  }

  #convertObjectToState = (film, scrollPosition, emoji, comment) => (
    {
      film,
      scrollPosition,
      emoji,
      comment
    }
  );

  #addEmojiClickHandler = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#onEmojiClickEventHandler);
  };

  #onEmojiClickEventHandler = (evt) => {
    if (evt.target.tagName === 'IMG') {
      const emojiInputElement = evt.target.parentElement.previousElementSibling;
      const commentInputElement = this.element.querySelector('.film-details__comment-input');
      this.rerender(this._state.film, emojiInputElement.value, commentInputElement.value);
    }
  };

  static get filmDetailsElement() {
    return document.querySelector('.film-details');
  }

  get template() {
    return getFilmDetailsPopupTemplate(this._state);
  }

  setCloseBtnClickHandler = (cb) => {
    this._callback.closeBtnClick = cb;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeBtnClick();
  };

  setAddToWatchlistBtnClickHandler = (cb) => {
    this._callback.addToWatchlistBtnClick = cb;
    const watchlistElement = this.element.querySelector('#watchlist');
    watchlistElement.addEventListener(
      'click',
      (evt) => this.#controlItemClickHandler(evt, watchlistElement, cb)
    );
  };

  setAddWatchedBtnClickHandler = (cb) => {
    this._callback.addToWatchedBtnClick = cb;
    const alreadyWatchedElement = this.element.querySelector('#watched');
    alreadyWatchedElement.addEventListener(
      'click',
      (evt) => this.#controlItemClickHandler(evt, alreadyWatchedElement, cb)
    );
  };

  setAddFavoriteBtnClickHandler = (cb) => {
    this._callback.addToFavoriteBtnClick = cb;
    const favoriteElement = this.element.querySelector('#favorite');
    favoriteElement.addEventListener(
      'click',
      (evt) => this.#controlItemClickHandler(evt, favoriteElement, cb)
    );
  };

  #controlItemClickHandler = (evt, targetButton, cb) => {
    evt.preventDefault();
    cb();
  };

  _restoreHandlers = () => {
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setAddToWatchlistBtnClickHandler(this._callback.addToWatchlistBtnClick);
    this.setAddWatchedBtnClickHandler(this._callback.addToWatchedBtnClick);
    this.setAddFavoriteBtnClickHandler(this._callback.addToFavoriteBtnClick);
    this.setDeleteCommentCallback(this._callback.deleteComment);
    this.setAddCommentCallback( this._callback.addComment);
    this.element.scrollTop = this._state.scrollPosition;
    this.#addEmojiClickHandler();
  };

  setAddCommentCallback = (cb) => {
    this._callback.addComment = cb;
  };

  setDeleteCommentCallback = (cb) => {
    this._callback.deleteComment = cb;
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#deleteCommentClickHandler);
  };

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'BUTTON') {
      const commentElement = evt.target.closest('.film-details__comment');
      const deletedComment = this._state.film.comments.find((c) => c.id === commentElement.dataset.id);
      this._callback.deleteComment(deletedComment);
    }
  };

  createComment = () => {
    const inputElem = this.element.querySelector('.film-details__comment-input');
    const comment =  {
      filmId: this._state.film.id,
      emoji: this._state.emoji,
      text: he.encode(inputElem.value)
    };
    this._state.emoji = null;
    this._state.comment = null;
    return comment;
  };
}
