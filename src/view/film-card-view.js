import AbstractView from '../framework/view/abstract-view.js';

const MAX_DESCRIPTION_LENGTH = 139;

const truncateString = (str, n) => (
  str.length > n ? `${str.substr(0, n - 1)}...` : str
);

const getCardTemplate = (film) => (`
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${film.runtime}</span>
        <span class="film-card__genre">${film.genres[0]}</span>
      </p>
      <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${truncateString(film.description, MAX_DESCRIPTION_LENGTH)}</p>
      <span class="film-card__comments">${film.commentsCount} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>
`);

export default class FilmCardView extends AbstractView {

  #template = null;
  #film = null;

  constructor(film) {
    super();
    this.#template = getCardTemplate(film);
    this.#film = film;
    this.element.dataset.id = film.id;
  }

  get template() {
    return this.#template;
  }

  get id() {
    return this.#film.id;
  }
}
