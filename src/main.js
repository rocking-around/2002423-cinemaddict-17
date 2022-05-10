import FilmModel from './model/film-model';
import FooterPresenter from './presenter/footer-presenter';
import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const headerPresenter = new HeaderPresenter();
const mainPresenter = new MainPresenter();
const footerPresenter = new FooterPresenter();
const filmModel = new FilmModel();

headerPresenter.init(siteHeaderElement);
mainPresenter.init(siteMainElement, filmModel, generateFilter(filmModel.films));
footerPresenter.init(siteFooterElement, filmModel.films.length);
