const FilterType = {
  ALL: {
    TEXT: 'All movies',
    VALUE: '#all'
  },
  WATCHLIST: {
    TEXT: 'Watchlist ',
    VALUE: '#watchlist'
  },
  HISTORY: {
    TEXT: 'History',
    VALUE: '#history'
  },
  FAVORITES: {
    TEXT: 'Favorites',
    VALUE: '#favorites'
  }
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const UserRank = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export { FilterType, SortType, UserAction, UpdateType, UserRank };
