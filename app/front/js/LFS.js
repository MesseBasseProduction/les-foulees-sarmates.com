import '../scss/lfs.scss';
import Countdown from './utils/Countdown';

class LFS {


  constructor() {
    if (document.querySelector('#scene.home') !== null) {
      this._buildHomepage();
    }
  }


  _buildHomepage() {
    new Countdown({
      targetDate: new Date('2026-10-17T07:30:00'),
      targetDom: document.querySelector('#countdown')
    });
    new window.ScrollBar({
      target: document.body,
      minSize: 200,
      style: {
        color: '#B93A58'
      }
    });
  }


}


export default LFS;
window.LFS = new LFS();
