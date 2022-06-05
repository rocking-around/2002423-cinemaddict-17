import FilmModel from './model/film-model';
import HeaderPresenter from './presenter/header-presenter';
import FilmListPresenter from './presenter/film-list-presenter';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './framework/render.js';
import FilterModel from './model/filter-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer .footer__statistics');

const filmModel = new FilmModel();
const filterModel = new FilterModel();
const headerPresenter = new HeaderPresenter(siteHeaderElement, filmModel);
const filmListPresenter = new FilmListPresenter(siteMainElement, filmModel, filterModel);

headerPresenter.init();
filmListPresenter.init();
render(new FooterStatisticsView(filmModel.films.length), siteFooterStatisticsElement);
