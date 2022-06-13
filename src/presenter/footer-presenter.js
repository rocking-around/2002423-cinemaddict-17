import {render, replace} from '../framework/render.js';
import { UpdateType } from '../const';
import FooterStatisticsView from '../view/footer-statistics-view';

export default class FooterPresenter {

  #footerView = null;
  #filmModel = null;
  #container = null;

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmModel = filmModel;
    filmModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    if (!this.#footerView) {
      this.#footerView = new FooterStatisticsView(this.#filmModel.films.length);
      render(this.#footerView, this.#container);
      return;
    }
    const oldView = this.#footerView;
    this.#footerView = new FooterStatisticsView(this.#filmModel.films.length);
    replace(this.#footerView, oldView);
  };

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT) {
      this.init();
    }
  };
}
