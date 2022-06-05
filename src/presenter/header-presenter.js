import UserRankView from '../view/user-rank-view';
import { render, replace } from '../framework/render.js';
import { UpdateType } from '../const';

export default class HeaderPresenter {

  #userRankView = null;
  #filmModel = null;
  #container = null;

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#userRankView = new UserRankView(this.#getWatchedFilmsCount());
    render(this.#userRankView, container);
    filmModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    render(this.#userRankView, this.#container);
  };

  #getWatchedFilmsCount = () => (
    this.#filmModel.films.filter((film) => film.userDetails.alreadyWatched).length
  );

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.PATCH) {
      const userRankViewPrev = this.#userRankView;
      this.#userRankView = new UserRankView(this.#getWatchedFilmsCount());
      replace(this.#userRankView, userRankViewPrev);
    }
  };
}
