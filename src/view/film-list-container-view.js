import BaseTemplateView from './base-template-view.js';

const getFilmListContainerTemplate = () => (`
  <div class="films-list__container">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </div>
`);

export default class FilmListContainerView extends BaseTemplateView {

  constructor() {
    super(getFilmListContainerTemplate());
  }
}
