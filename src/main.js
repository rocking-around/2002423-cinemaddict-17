import FooterPresenter from './presenter/footer-presenter';
import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const headerPresenter = new HeaderPresenter();
const mainPresenter = new MainPresenter();
const footerPresenter = new FooterPresenter();

headerPresenter.init(siteHeaderElement);
mainPresenter.init(siteMainElement);
footerPresenter.init(siteFooterElement);
