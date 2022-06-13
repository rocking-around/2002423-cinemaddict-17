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
    filmModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    if (!this.#userRankView) {
      this.#userRankView = new UserRankView(
        this.#filmModel.films.length,
        this.#filmModel.isLoaded
      );
      render(this.#userRankView, this.#container);
      return;
    }
    const oldView = this.#userRankView;
    this.#userRankView = new UserRankView(
      this.#getWatchedFilmsCount(),
      this.#filmModel.isLoaded
    );
    replace(this.#userRankView, oldView);
  };

  #getWatchedFilmsCount = () => (
    this.#filmModel.films.filter((film) => film.userDetails.alreadyWatched).length
  );

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.PATCH || updateType === UpdateType.INIT) {
      this.init();
    }
  };
}
