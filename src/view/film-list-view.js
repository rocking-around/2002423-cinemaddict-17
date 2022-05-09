import AbstractView from '../framework/view/abstract-view.js';

const getFilmListTemplate = () => (`
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">There are no movies in our database</h2>
    <div class="films-list__container">
    </div>
  </section>
`);

export default class FilmListView extends AbstractView {

  get filmListContainer() {
    return this.element.querySelector('.films-list__container');
  }

  get template() {
    return getFilmListTemplate();
  }

  setFilmCardClickHandler = (cb) => {
    this._callback.filmCardClick = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    const cardLinkElement = evt.target.closest('.film-card__link');
    if (cardLinkElement) {
      this._callback.filmCardClick(cardLinkElement.parentElement);
    }
  };

  showEmptyFilmListMessage() {
    this.element.querySelector('.films-list__title').classList.remove('visually-hidden');
  }
}
