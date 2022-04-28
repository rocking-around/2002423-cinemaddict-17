import UserRankView from '../view/user-rank-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmCardView from '../view/film-card-view';
import FilmDetailsPopupView from '../view/film-details-popup-view';
import {render, RenderPosition} from '../render.js';

export default class RenderComponentsPresenter {

  filmListView = new FilmListView();
  filmListContainerView = new FilmListContainerView();
  init = (headerContainer, mainContainer, footerContainer) => {
    render(new UserRankView(), headerContainer);
    render(new FilterView(), mainContainer);
    render(new SortView(), mainContainer);
    render(this.filmListView, mainContainer);
    render(this.filmListContainerView, this.filmListView.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListContainerView.getElement());
    }
    render(new ShowMoreBtnView(), mainContainer);
    render(new FilmDetailsPopupView(), footerContainer, RenderPosition.AFTEREND);
  };
}
