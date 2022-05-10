import { generateFilm } from '../mock/film';
import { genarateRandomComments } from '../mock/comment';

export default class FilmModel {

  #films = Array.from({ length: 22 }, (elem, i) => generateFilm(i));
  #commentsByFilmId = new Map();

  constructor() {
    this.#films.forEach((film) => {
      for (let i = 0; i < film.commentsCount; i++) {
        this.#commentsByFilmId.set(film.id, genarateRandomComments(film.commentsCount, film.id));
      }
    });
  }

  get films() {
    return this.#films;
  }

  get topRatedFilms() {
    if (this.#films.filter((film) => film.rating > 0).length > 0) {
      return this.#films.slice().sort((a, b) => b.rating - a.rating);
    }
    return [];
  }

  get mostCommentedFilms() {
    if (this.#films.filter((film) => this.getCommentsByFilmId(film.id).length > 0).length > 0) {
      return this.#films.slice().sort((a, b) => (
        this.getCommentsByFilmId(b.id).length - this.getCommentsByFilmId(a.id).length
      ));
    }
    return [];
  }

  getCommentsByFilmId(filmId) {
    const comments = this.#commentsByFilmId.get(filmId);
    if (comments) {
      return comments;
    }
    return [];
  }
}
