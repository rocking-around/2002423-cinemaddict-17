import BaseTemplateView from './base-template-view.js';

const showMoreBtnTemplate = '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreBtnView extends BaseTemplateView {

  constructor() {
    super(showMoreBtnTemplate);
  }
}
