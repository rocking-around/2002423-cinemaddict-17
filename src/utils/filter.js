import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL.VALUE]: (films) => films,
  [FilterType.FAVORITES.VALUE]: (films) => films.filter((film) => film.userDetails.favorite),
  [FilterType.HISTORY.VALUE]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.WATCHLIST.VALUE]: (films) => films.filter((film) => film.userDetails.watchlist)
};

export { filter };
