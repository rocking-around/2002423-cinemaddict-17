import { generateFilm } from '../mock/film';
import { genarateRandomComments } from '../mock/comment';

export default class FilmModel {

  constructor() {
    this.films = Array.from({ length: 5 }, (elem, i) => generateFilm(i));
    this.commentsByFilmId = new Map();
    this.films.forEach((film) => {
      for (let i = 0; i < film.commentsCount; i++) {
        this.commentsByFilmId.set(film.id, genarateRandomComments(film.commentsCount, film.id));
      }
    });
  }

  getFilms = () => this.films;

  getComments = () => this.commentsByFilmId;
}
