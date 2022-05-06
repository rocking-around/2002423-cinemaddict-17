import BaseTemplateView from './base-template-view.js';

const getFilmListTemplate = () => (`
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">There are no movies in our database</h2>
  </section>
`);

export default class FilmListView extends BaseTemplateView {

  constructor() {
    super(getFilmListTemplate());
  }

  showEmtyFilmListMessage() {
    return this.element.querySelector('.films-list__title').classList.remove('visually-hidden');
  }
}
