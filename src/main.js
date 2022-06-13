import FilmModel from './model/film-model';
import HeaderPresenter from './presenter/header-presenter';
import FilmListPresenter from './presenter/film-list-presenter';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmApiService from './film-api-service';
import FooterPresenter from './presenter/footer-presenter';

const AUTHORIZATION = 'Basic kcCefnkZYprbyR8Q7TSQ';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer .footer__statistics');

const filmModel = new FilmModel(new FilmApiService(END_POINT, AUTHORIZATION));
filmModel.init();
const filterModel = new FilterModel();
const headerPresenter = new HeaderPresenter(siteHeaderElement, filmModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);
const filmListPresenter = new FilmListPresenter(siteMainElement, filmModel, filterModel, filterPresenter);
const footerPresenter = new FooterPresenter(siteFooterStatisticsElement, filmModel);

headerPresenter.init();
filterPresenter.init();
filmListPresenter.init();
footerPresenter.init();
