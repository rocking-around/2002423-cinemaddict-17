import BaseTemplateView from './base-template-view.js';

const getFilmListTemplate = () => (`
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>
`);

export default class FilmListView extends BaseTemplateView {

  constructor() {
    super(getFilmListTemplate());
  }
}
