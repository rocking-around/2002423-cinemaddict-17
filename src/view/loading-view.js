import AbstractView from '../framework/view/abstract-view';

const createNoFilmsTemplate = () => (`
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>
`);

export default class LoadingView extends AbstractView {

  get template() {
    return createNoFilmsTemplate();
  }
}
