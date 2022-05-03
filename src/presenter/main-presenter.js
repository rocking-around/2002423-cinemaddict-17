import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmCardView from '../view/film-card-view';
import FilmDetailsPopupView from '../view/film-details-popup-view';
import { render } from '../render.js';
import { listToMap, isEscapeKey } from '../utils';

export default class MainPresenter {

  #filmListView = new FilmListView();
  #filmListContainerView = new FilmListContainerView();
  #filmModel = null;
  #filmById = null;
  #container = null;

  init = (container, filmModel) => {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#filmById = listToMap(this.#filmModel.films, (object) => object.id.toString());
    render(new FilterView(), container);
    render(new SortView(), container);
    this.#renderFilmCardList();
    render(new ShowMoreBtnView(), container);
  };

  #renderFilmCardList() {
    const onCardsListClick = (evt) => {
      const cardElement = FilmDetailsPopupView.getCardElementByLinkChildElement(evt.target);
      if (cardElement) {
        this.#openPopup(cardElement);
      }
    };
    this.#filmListView.element.addEventListener('click', onCardsListClick);
    render(this.#filmListView, this.#container);
    render(this.#filmListContainerView, this.#filmListView.element);
    for (let i = 0; i < 5; i++) {
      this.#renderFilmCard(Array.from(this.#filmById.values())[i], this.#filmListContainerView.element);
    }
  }

  #renderFilmCard = (film, filmContainerElement) => {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.element.dataset.id = film.id;
    render(filmCardComponent, filmContainerElement);
  };

  #openPopup(cardElement) {
    const onPageKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this.#closePopup();
      }
    };
    const film = this.#filmById.get(cardElement.dataset.id);
    const comments = [...this.#filmModel.getCommentsByFilmId(film.id)];
    const filmDetailPopupComponent = new FilmDetailsPopupView(film, comments);
    document.addEventListener(
      'keydown',
      document.escKeyDownEvt = (evt) => onPageKeyDown(evt)
    );
    filmDetailPopupComponent.getCloseBtnElement().addEventListener('click', this.#closePopup);
    document.body.classList.add('hide-overflow');
    document.body.appendChild(filmDetailPopupComponent.element);
  }

  #closePopup() {
    document.body.removeChild(FilmDetailsPopupView.getFilmDetailsElement());
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', document.escKeyDownEvt);
  }
}
