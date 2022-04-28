import RenderComponentsPresenter from './presenter/render-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const renderComponentsPresenter = new RenderComponentsPresenter();

renderComponentsPresenter.init(siteHeaderElement, siteMainElement, siteFooterElement);
