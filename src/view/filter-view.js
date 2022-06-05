import AbstractView from '../framework/view/abstract-view.js';
import { listToMap } from '../utils/common.js';

const getCountElement = (filter) => (
  filter.count >= 0 ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''
);

const createFilterItemTemplate = (filter, isActive) => (`
  <a href="${filter.type.VALUE}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">
    ${filter.type.TEXT}
    ${getCountElement(filter)}
  </a>
`);

const getFilterTemplate = (filterItems, filterValue) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, filter.type.VALUE === filterValue))
    .join('');
  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};

export default class FilterView extends AbstractView {

  // #template = null;
  #filters = null;
  #currentFilter = null;
  #filterByValue = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#filterByValue = listToMap(filters, (filter) => filter.type.VALUE);
  }

  get template() {
    return getFilterTemplate(this.#filters, this.#currentFilter.VALUE);
  }

  setFilterTypeChangeHandler = (cb) => {
    this._callback.filterTypeChange = cb;
    document.body.querySelector('.main-navigation').addEventListener('click', this.#onFilterClickHandler);
  };

  #onFilterClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(this.#filterByValue.get(evt.target.getAttribute('href')).type);
  };
}
