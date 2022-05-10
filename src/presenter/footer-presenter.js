import FooterStatisticsView from '../view/footer-statistics-view.js';
import { render } from '../framework/render.js';

export default class FooterPresenter {

  init = (container, filmsCount) => {
    render(new FooterStatisticsView(filmsCount), container);
  };
}
