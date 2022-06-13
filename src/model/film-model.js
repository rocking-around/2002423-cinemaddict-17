import Ovservable from '../framework/observable.js';
import { listToMap } from '../utils/common.js';
import { UpdateType } from '../const.js';
import dayjs from 'dayjs';

export default class FilmModel extends Ovservable {

  #films = [];
  #filmsById = null;
  #apiService = null;
  #isLoading = true;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get films() {
    return this.#films;
  }

  get isLoaded() {
    return !this.#isLoading;
  }

  init = async () => {
    try {
      const films = await this.#apiService.films;
      this.#films = films.map(this.#adaptFilmToClient);
    } catch (err) {
      this.#films = [];
    }
    this.#isLoading = false;
    this.#createFilmsById();
    this._notify(UpdateType.INIT);
  };

  set films(films) {
    this.#films = [...films];
  }

  #createFilmsById = () => {
    this.#filmsById = listToMap(this.#films, (film) => film.id);
  };

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Cannot update not existing film');
    }
    const updated = this.#adaptFilmToClient(await this.#apiService.updateFilm(update));
    this.#films = [
      ...this.#films.slice(0, index),
      updated,
      ...this.#films.slice(index + 1)
    ];
    this.#createFilmsById();
    this._notify(updateType, updated);
  };

  addComment = (updateType, comment) => {
    const film = this.#filmsById.get(comment.filmId);
    film.comments.push(comment);
    film.commentsCount = film.comments.length;
    this._notify(updateType, film);
  };

  deleteComment = (updateType, comment) => {
    const film = this.#filmsById.get(comment.filmId);
    film.comments = film.comments.filter((c) => c.id !== comment.id);
    film.commentsCount = film.comments.length;
    this._notify(updateType, film);
  };

  getCommentsByFilmId = async (filmId) => {
    const film = this.#filmsById.get(filmId);
    if (!film.comments || film.comments.length === 0) {
      try {
        film.comments = (await this.#apiService.getComments(film.id))
          .map((comment) => this.#adaptCommentToClient(film.id, comment));
      } catch (err) {
        film.comments = [];
      }
    }
    return [...film.comments];
  };

  #adaptFilmToClient = (film) => {
    const adaptedFilm = {
      ...film.film_info,
      id: film.id,
      ageRestriction: film.film_info.age_rating,
      originalTitle: film.film_info.alternative_title,
      rating: film.film_info.total_rating,
      releaseDate: dayjs(film.film_info.release.date).toDate(),
      country: film.film_info.release.release_country,
      commentsCount: film.comments.length,
      userDetails: {
        ...film.user_details,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date,
      },
      comments: []
    };
    delete adaptedFilm.age_rating;
    delete adaptedFilm.alternative_title;
    delete adaptedFilm.total_rating;
    delete adaptedFilm.release;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;
    return adaptedFilm;
  };

  #adaptCommentToClient = (filmId, comment) => {
    const adaptedComment = {
      ...comment,
      emoji: comment.emotion,
      text: comment.comment,
      filmId
    };
    delete adaptedComment.emotion;
    delete adaptedComment.comment;
    return adaptedComment;
  };
}
