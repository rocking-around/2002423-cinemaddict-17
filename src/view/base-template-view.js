import { createElement } from '../render.js';

export default class BaseTemplateView {

  constructor(template) {
    this.template = template;
  }

  getTemplate() {
    return this.template;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
