import { FilterType, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {

  #container = null;
  #filterModel = null;
  #filmModel = null;
  #filterComponent = null;

  constructor(container, filterModel, filmModel) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;
    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [
      {
        type: FilterType.ALL,
        count: filter[FilterType.ALL.VALUE](this.#filmModel.films).length,
      },
      {
        type: FilterType.FAVORITES,
        count: filter[FilterType.FAVORITES.VALUE](this.#filmModel.films).length,
      },
      {
        type: FilterType.HISTORY,
        count: filter[FilterType.HISTORY.VALUE](this.#filmModel.films).length,
      },
      {
        type: FilterType.WATCHLIST,
        count: filter[FilterType.WATCHLIST.VALUE](this.#filmModel.films).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
      return;
    }
    if (this.#container.contains(prevFilterComponent.element)) {
      replace(this.#filterComponent, prevFilterComponent);
      this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    }
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
