import UserRankView from '../view/user-rank-view';
import { render } from '../render.js';

export default class HeaderPresenter {

  init = (container) => {
    render(new UserRankView(), container);
  };
}
