import AbstractView from '../framework/view/abstract-view.js';

const getCountElement = (filter) => (
  filter.count >= 0 ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''
);

const createFilterItemTemplate = (filter, isActive) => (`
  <a href="${filter.url}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">
    ${filter.name}
    ${getCountElement(filter)}
  </a>
`);

const getFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};

export default class FilterView extends AbstractView {

  #template = null;

  constructor(filters) {
    super();
    this.#template = getFilterTemplate(filters);
  }

  get template() {
    return this.#template;
  }
}
