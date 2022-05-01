import FilmDetailsPopupView from '../view/film-details-popup-view';
import {render, RenderPosition} from '../render.js';

export default class FooterPresenter {

  init = (container, filmModel) => {
    this.filmModel = filmModel;
    this.films = [...this.filmModel.getFilms()];
    this.currentFilm = this.filmModel.getFilms()[0];
    this.currentFilmComments = [...this.filmModel.getComments().get(this.currentFilm.id)];
    render(new FilmDetailsPopupView(this.currentFilm, this.currentFilmComments), container, RenderPosition.AFTEREND);
  };
}
