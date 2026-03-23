import '../scss/lfs.scss';
import Countdown from './utils/Countdown';

class LFS {


  constructor() {
    this._handleCountDown();
    this._handlePageScroll();

    if (document.querySelector('#scene.race-details')) {
      this._handleTopologySelector();
    }
  }


  _handleCountDown() {
    new Countdown({
      targetDate: new Date('2026-10-17T07:30:00'),
      targetDom: document.querySelector('#countdown')
    });
  }


  _handlePageScroll() {
    new window.ScrollBar({
      target: document.body,
      minSize: 200,
      style: {
        color: '#B93A58'
      }
    });
  }


  _handleTopologySelector() {
    const selectors = document.querySelector('#topology-selector');

    const selectorClicked = (e) => {
      for (let i = 0; i < selectors.children.length; ++i) {
        selectors.children[i].classList.remove('selected');

        if (e.target.dataset.type === selectors.children[i].dataset.type) {
          selectors.children[i].classList.add('selected');
          document.querySelector('#topology-label').innerHTML = e.target.dataset.label;
          document.querySelector('#topology-image').src = e.target.dataset.image;
        }
      }
    };

    for (let i = 0; i < selectors.children.length; ++i) {
      selectors.children[i].addEventListener('click', selectorClicked);
    }
  }


}


export default LFS;
window.LFS = new LFS();
