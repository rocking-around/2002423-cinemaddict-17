import FilmDetailsPopupView from '../view/film-details-popup-view';
import {render, RenderPosition} from '../render.js';

export default class FooterPresenter {

  init = (container) => {
    render(new FilmDetailsPopupView(), container, RenderPosition.AFTEREND);
  };
}
