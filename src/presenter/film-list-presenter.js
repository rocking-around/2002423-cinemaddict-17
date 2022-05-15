import SortView from '../view/sort-view';
import FilmListView from '../view/film-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import ExtraFilmListView from '../view/extra-film-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { listToMap, mapValuesToList, updateItem } from '../utils/common.js';
import FilmPresenter from './film-presenter.js';
import PopupPresenter from './popup-presenter.js';
import FilterPresenter from './filter-presenter.js';

const MAX_FILMS_COUNT_AT_ONCE = 5;
const MAX_EXTRA_FILM_COUNT = 2;

export default class FilmListPresenter {

  #filmListView = new FilmListView();
  #showMoreBtnView = new ShowMoreBtnView();
  #renderedFilmsCount = 0;
  #filmModel = null;
  #filmsById = null;
  #container = null;
  #filmPresentersByFilmId = new Map();
  #popupPresenter = null;
  #filterPresenter = null;

  init = (container, filmModel) => {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#filmsById = listToMap(this.#filmModel.films, (object) => object.id);
    this.#popupPresenter = new PopupPresenter(this.#handleFilmChange);
    this.#filterPresenter = new FilterPresenter(container);
    this.#filterPresenter.init(filmModel.films);
    this.#renderFilmCardList();
  };

  #renderFilmCardList() {
    this.#filmListView.setFilmCardClickHandler((filmCard) => this.#openPopup(filmCard));
    render(this.#filmListView, this.#container);
    const filmsByIdValues = mapValuesToList(this.#filmsById);
    if (filmsByIdValues.length > MAX_FILMS_COUNT_AT_ONCE) {
      this.#showMoreBtnView.setClickHandler(() => this.#onShowMoreBtnClick(filmsByIdValues));
      render(this.#showMoreBtnView, this.#filmListView.filmListElement);
    }
    if (filmsByIdValues.length > 0) {
      this.#onShowMoreBtnClick(filmsByIdValues);
      render(new SortView(), this.#filmListView.filmsElement, RenderPosition.BEFOREBEGIN);
      this.#renderExtraFilmList('Top rated', this.#filmModel.topRatedFilms.slice(0, MAX_EXTRA_FILM_COUNT));
      this.#renderExtraFilmList('Most commented', this.#filmModel.mostCommentedFilms.slice(0, MAX_EXTRA_FILM_COUNT));
      return;
    }
    this.#filmListView.showEmptyFilmListMessage();
  }

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleFilmChange);
    filmPresenter.init(film);
    this.#renderedFilmsCount++;
    const presenters = this.#filmPresentersByFilmId.get(film.id);
    if (presenters) {
      presenters.push(filmPresenter);
      return;
    }
    this.#filmPresentersByFilmId.set(film.id, [filmPresenter]);
  };

  #openPopup = (cardElement) => {
    const film = this.#filmsById.get(cardElement.dataset.id);
    const comments = [...this.#filmModel.getCommentsByFilmId(film.id)];
    this.#popupPresenter.init(film, comments);
  };

  #renderExtraFilmList(title, films) {
    if (films.length === 0) {
      return;
    }
    const view = new ExtraFilmListView(title);
    render(view, this.#filmListView.filmsElement);
    films.forEach((film) => {
      this.#renderFilm(film, view.filmListContainer);
    });
  }

  #onShowMoreBtnClick = (films) => {
    const maxPossibleCount = Math.min(films.length, this.#renderedFilmsCount + MAX_FILMS_COUNT_AT_ONCE);
    for (let i = this.#renderedFilmsCount; i < maxPossibleCount; i++) {
      this.#renderFilm(films[i], this.#filmListView.filmListContainer);
    }
    if (this.#renderedFilmsCount === films.length) {
      this.#showMoreBtnView.element.remove();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    const updatedFilms = updateItem(mapValuesToList(this.#filmsById), updatedFilm);
    this.#filmsById = listToMap(updatedFilms, (film) => film.id);
    this.#filmPresentersByFilmId.get(updatedFilm.id).forEach((presenter) => {
      presenter.init(updatedFilm);
    });
    this.#filterPresenter.init(updatedFilms);
  };
}