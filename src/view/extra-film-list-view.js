import AbstractView from '../framework/view/abstract-view.js';

const getFilmListTemplate = (title) => (`
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>
`);

export default class ExtraFilmListView extends AbstractView {

  #template = null;

  constructor(title) {
    super();
    this.#template = getFilmListTemplate(title);
  }

  get filmListContainer() {
    return this.element.querySelector('.films-list__container');
  }

  get template() {
    return this.#template;
  }
}
