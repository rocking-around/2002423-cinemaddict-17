import AbstractView from '../framework/view/abstract-view.js';
import { UserRank } from '../const.js';

const getUserRank = (watchedFilmsCount) => {
  if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    return UserRank.NOVICE;
  }
  if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return UserRank.FAN;
  }
  if (watchedFilmsCount >= 21) {
    return UserRank.MOVIE_BUFF;
  }
  return UserRank.NONE;
};

const getUserRankTemplate = (watchedFilmsCount, isLoaded) => (`
  <section class="header__profile profile">
    <p class="profile__rating">${getUserRank(watchedFilmsCount)}</p>
    <img class="profile__avatar ${!isLoaded ? 'visually-hidden' : ''}" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`);

export default class UserRankView extends AbstractView {

  #isModelLoaded = false;
  #watchedFilmsCount = null;

  constructor(watchedFilmsCount, isModelLoaded) {
    super();
    this.#watchedFilmsCount = watchedFilmsCount;
    this.#isModelLoaded = isModelLoaded;
  }

  get template() {
    return getUserRankTemplate(this.#watchedFilmsCount, this.#isModelLoaded);
  }
}
