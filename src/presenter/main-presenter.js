import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FilmListView from '../view/film-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmCardView from '../view/film-card-view';
import FilmDetailsPopupView from '../view/film-details-popup-view';
import { render, RenderPosition } from '../framework/render.js';
import { listToMap, mapValuesToList, isEscapeKey } from '../utils';

const MAX_FILMS_COUNT_AT_ONCE = 5;

export default class MainPresenter {

  #filmListView = new FilmListView();
  #showMoreBtnView = new ShowMoreBtnView();
  #filterView = new FilterView();
  #renderedFilmsCount = 0;
  #filmModel = null;
  #filmsById = null;
  #container = null;

  init = (container, filmModel) => {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#filmsById = listToMap(this.#filmModel.films, (object) => object.id.toString());
    render(this.#filterView, container);
    this.#renderFilmCardList();
  };

  #renderFilmCardList() {
    this.#filmListView.setFilmCardClickHandler((filmCard) => this.#openPopup(filmCard));
    render(this.#filmListView, this.#container);
    const filmsByIdValues = mapValuesToList(this.#filmsById);
    if (filmsByIdValues.length > MAX_FILMS_COUNT_AT_ONCE) {
      this.#showMoreBtnView.setClickHandler(() => this.#onShowMoreBtnClick(filmsByIdValues));
      render(this.#showMoreBtnView, this.#container);
    }
    if (filmsByIdValues.length > 0) {
      this.#onShowMoreBtnClick(filmsByIdValues);
      render(new SortView(), this.#filterView.element, RenderPosition.AFTEREND);
      return;
    }
    this.#filmListView.showEmptyFilmListMessage();
  }

  #renderFilmCard = (film, filmContainerElement) => {
    render(new FilmCardView(film), filmContainerElement);
  };

  #openPopup(cardElement) {
    const onPageKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this.#closePopup();
      }
    };
    const film = this.#filmsById.get(cardElement.dataset.id);
    const comments = [...this.#filmModel.getCommentsByFilmId(film.id)];
    const filmDetailPopupComponent = new FilmDetailsPopupView(film, comments);
    document.addEventListener(
      'keydown',
      document.escKeyDownEvt = (evt) => onPageKeyDown(evt)
    );
    filmDetailPopupComponent.setCloseBtnClickHandler(() => this.#closePopup());
    document.body.classList.add('hide-overflow');
    document.body.appendChild(filmDetailPopupComponent.element);
  }

  #closePopup() {
    document.body.removeChild(FilmDetailsPopupView.filmDetailsElement);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', document.escKeyDownEvt);
  }

  #onShowMoreBtnClick = (films) => {
    const maxPossibleCount = Math.min(films.length, this.#renderedFilmsCount + MAX_FILMS_COUNT_AT_ONCE);
    for (let i = this.#renderedFilmsCount; i < maxPossibleCount; i++) {
      this.#renderFilmCard(films[i], this.#filmListView.filmListContainer);
      this.#renderedFilmsCount++;
    }
    if (this.#renderedFilmsCount === films.length) {
      this.#showMoreBtnView.element.remove();
    }
  };
}
