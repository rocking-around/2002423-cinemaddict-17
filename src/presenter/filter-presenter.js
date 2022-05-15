import { generateFilter } from '../mock/filter.js';
import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {

  #container = null;
  #filterComponent = null;

  constructor(container) {
    this.#container = container;
  }

  init = (films) => {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView(generateFilter(films));
    if (prevFilterComponent === null) {
      this.#renderFilter();
      return;
    }
    if (this.#container.contains(prevFilterComponent.element)) {
      replace(this.#filterComponent, prevFilterComponent);
    }
    remove(prevFilterComponent);
  };

  #renderFilter = () => {
    render(this.#filterComponent, this.#container);
  };
}
