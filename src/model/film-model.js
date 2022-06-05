import Ovservable from '../framework/observable.js';
import { listToMap } from '../utils/common.js';
import { generateFilm } from '../mock/film.js';

export default class FilmModel extends Ovservable {

  #films = Array.from({ length: 22 }, (elem, i) => generateFilm(i));
  #filmsById = null;

  constructor() {
    super();
    this.#createFilmsById();
  }

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = [...films];
  }

  #createFilmsById = () => {
    this.#filmsById = listToMap(this.#films, (film) => film.id);
  };

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Cannot update not existing film');
    }
    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1)
    ];
    this.#createFilmsById();
    this._notify(updateType, update);
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

  get topRatedFilms() {
    if (this.#films.filter((film) => film.rating > 0).length > 0) {
      return this.#films.slice().sort((a, b) => b.rating - a.rating);
    }
    return [];
  }

  get mostCommentedFilms() {
    if (this.#films.filter((film) => film.comments.length > 0).length > 0) {
      return this.#films.slice().sort((a, b) => (
        b.comments.length - a.comments.length
      ));
    }
    return [];
  }

  getCommentsByFilmId(filmId) {
    const comments = this.#filmsById.get(filmId).comments;
    if (comments) {
      return [...comments];
    }
    return [];
  }
}
