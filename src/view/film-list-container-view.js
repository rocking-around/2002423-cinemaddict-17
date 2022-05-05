import BaseTemplateView from './base-template-view.js';

const getFilmListContainerTemplate = () => (`
  <div class="films-list__container">
  </div>
`);

export default class FilmListContainerView extends BaseTemplateView {

  constructor() {
    super(getFilmListContainerTemplate());
  }
}
