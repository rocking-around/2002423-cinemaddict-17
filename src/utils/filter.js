import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL]: {getCount: () => -1, url: '#all'},
  [FilterType.FAVORITIES]: {getCount: (films) => films.filter((film) => film.userDetails.favorite).length, url: '#favorities'},
  [FilterType.HISTORY]: {getCount: (films) => films.filter((film) => film.userDetails.alreadyWatched).length, url: '#history'},
  [FilterType.WATCHLIST]: {getCount: (films) => films.filter((film) => film.userDetails.watchlist).length, url: '#watchlist'},
};

export { filter };
