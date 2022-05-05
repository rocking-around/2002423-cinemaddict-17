import FilmModel from './model/film-model';
import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const headerPresenter = new HeaderPresenter();
const mainPresenter = new MainPresenter();
const filmModel = new FilmModel();

headerPresenter.init(siteHeaderElement);
mainPresenter.init(siteMainElement, filmModel);
