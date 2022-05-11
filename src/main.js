import FilmModel from './model/film-model';
import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilterView from './view/filter-view';
import { generateFilter } from './mock/filter.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer .footer__statistics');
const headerPresenter = new HeaderPresenter();
const mainPresenter = new MainPresenter();
const filmModel = new FilmModel();

headerPresenter.init(siteHeaderElement);
render(new FilterView(generateFilter(filmModel.films)), siteMainElement);
mainPresenter.init(siteMainElement, filmModel);
render(new FooterStatisticsView(filmModel.films.length), siteFooterStatisticsElement);
