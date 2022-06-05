import SortView from '../view/sort-view';
import FilmListView from '../view/film-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import ExtraFilmListView from '../view/extra-film-list-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import FilmPresenter from './film-presenter.js';
import FilterPresenter from './filter-presenter.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { sortByDate, sortByRating } from '../utils/film.js';

const MAX_FILMS_COUNT_AT_ONCE = 5;
const MAX_EXTRA_FILM_COUNT = 2;

export default class FilmListPresenter {

  #filmListView = new FilmListView();
  #showMoreBtnView = new ShowMoreBtnView();
  #sortView = new SortView();
  #renderedFilmsCount = 0;
  #filmModel = null;
  #filterModel = null;
  #container = null;
  #filmPresentersByFilmId = new Map();
  #filterPresenter = null;
  #currentSortType = SortType.DEFAULT;

  constructor(container, filmModel, filterModel) {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;
    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#filterPresenter = new FilterPresenter(this.#container, this.#filterModel, this.#filmModel);
    this.#filterPresenter.init();
    this.#renderFilmCardList();
  };

  get films() {
    const filterType = this.#filterModel.filter;
    const films = [...this.#filmModel.films];
    const filteredFilms = filter[filterType.VALUE](films);
    if (this.#currentSortType === SortType.DATE) {
      return filteredFilms.sort(sortByDate);
    } else if (this.#currentSortType === SortType.RATING) {
      return filteredFilms.sort(sortByRating);
    }
    return filteredFilms;
  }

  #handleViewAction = (actionType, updateType, update) => {
    if (actionType === UserAction.UPDATE_FILM) {
      this.#filmModel.updateFilm(updateType, update);
    } else if (actionType === UserAction.ADD_COMMENT) {
      this.#filmModel.addComment(updateType, update);
    } else if (actionType === UserAction.DELETE_COMMENT) {
      this.#filmModel.deleteComment(updateType, update);
    }
  };

  #handleModelEvent = (updateType, data) => {
    if (updateType === UpdateType.PATCH) {
      this.#updateSingleFilm(data);
    } else if (updateType === UpdateType.MAJOR) {
      this.#updateFilmList();
    }
  };

  #updateSingleFilm = (film) => {
    const filtered = filter[this.#filterModel.filter.VALUE]([film]);
    if (filtered.length === 0) {
      this.#filmPresentersByFilmId.get(film.id).forEach((presenter) => {
        presenter.destroy();
      });
      this.#filmPresentersByFilmId.set(film.id, []);
      this.#renderedFilmsCount--;
      this.#onShowMoreBtnClick(this.films, 1);
    } else {
      this.#filmPresentersByFilmId.get(film.id).forEach((presenter) => {
        presenter.init(film);
      });
    }
    this.#filterPresenter.init(this.#filmModel.films);
  };

  #updateFilmList = () => {
    this.#clearFilmCardList();
    this.#renderFilmCardList();
    this.#currentSortType = SortType.DEFAULT;
  };

  #renderFilmCardList() {
    render(this.#filmListView, this.#container);
    if (this.films.length > MAX_FILMS_COUNT_AT_ONCE) {
      this.#showMoreBtnView.setClickHandler(() => this.#onShowMoreBtnClick(this.films));
      render(this.#showMoreBtnView, this.#filmListView.filmListElement);
    }
    if (this.films.length > 0) {
      this.#onShowMoreBtnClick(this.films);
      this.#renderSort();
      this.#renderExtraFilmList('Top rated', this.#filmModel.topRatedFilms.slice(0, MAX_EXTRA_FILM_COUNT));
      this.#renderExtraFilmList('Most commented', this.#filmModel.mostCommentedFilms.slice(0, MAX_EXTRA_FILM_COUNT));
      return;
    }
    this.#filmListView.showEmptyFilmListMessage(this.#filterModel.filter.TEXT);
  }

  #clearFilmCardList = () => {
    remove(this.#filmListView);
    this.#filmPresentersByFilmId.clear();
    this.#renderedFilmsCount = 0;
    remove(this.#showMoreBtnView);
  };

  #renderSort = () => {
    render(this.#sortView, this.#filmListView.filmsElement, RenderPosition.BEFOREBEGIN);
    this.#sortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleViewAction);
    filmPresenter.init(film, this.#filmModel.getCommentsByFilmId(film.id));
    const presenters = this.#filmPresentersByFilmId.get(film.id);
    if (presenters) {
      presenters.push(filmPresenter);
      return;
    }
    this.#filmPresentersByFilmId.set(film.id, [filmPresenter]);
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

  #onShowMoreBtnClick = (films, count = MAX_FILMS_COUNT_AT_ONCE) => {
    const maxPossibleCount = Math.min(films.length, this.#renderedFilmsCount + count);
    for (let i = this.#renderedFilmsCount; i < maxPossibleCount; i++) {
      this.#renderFilm(films[i], this.#filmListView.filmListContainer);
      this.#renderedFilmsCount++;
    }
    if (this.#renderedFilmsCount === films.length) {
      this.#showMoreBtnView.element.remove();
    }
    if (this.#renderedFilmsCount === 0) {
      this.#filmListView.showEmptyFilmListMessage(this.#filterModel.filter.TEXT);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilmCardList();
    this.#renderFilmCardList();
  };
}
