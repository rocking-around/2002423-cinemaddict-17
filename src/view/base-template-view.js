import { createElement } from '../render.js';

export default class BaseTemplateView {

  #template = null;
  #element = null;

  constructor(template) {
    this.#template = template;
  }

  get template() {
    return this.#template;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
