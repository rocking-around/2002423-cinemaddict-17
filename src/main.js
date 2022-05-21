import FilmModel from './model/film-model';
import HeaderPresenter from './presenter/header-presenter';
import FilmListPresenter from './presenter/film-list-presenter';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer .footer__statistics');
const filmModel = new FilmModel();
const headerPresenter = new HeaderPresenter();
const filmListPresenter = new FilmListPresenter(filmModel);

headerPresenter.init(siteHeaderElement);
filmListPresenter.init(siteMainElement);
render(new FooterStatisticsView(filmModel.films.length), siteFooterStatisticsElement);
