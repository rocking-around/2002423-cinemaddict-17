import AbstractView from '../framework/view/abstract-view.js';

const showMoreBtnTemplate = '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreBtnView extends AbstractView {

  get template() {
    return showMoreBtnTemplate;
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
