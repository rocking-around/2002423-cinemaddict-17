import { createElement } from '../render.js';

const getFilmListContainerTemplate = () => (`
  <div class="films-list__container">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </div>
`);

export default class FilmListContainerView {

  getTemplate() {
    return getFilmListContainerTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
