import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmCardView from '../view/film-card-view';
import { render } from '../render.js';

export default class MainPresenter {

  filmListView = new FilmListView();
  filmListContainerView = new FilmListContainerView();
  init = (container) => {
    render(new FilterView(), container);
    render(new SortView(), container);
    render(this.filmListView, container);
    render(this.filmListContainerView, this.filmListView.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListContainerView.getElement());
    }
    render(new ShowMoreBtnView(), container);
  };
}
