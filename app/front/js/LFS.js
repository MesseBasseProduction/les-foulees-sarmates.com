import '../scss/lfs.scss';
import Countdown from './utils/Countdown';

class LFS {


  constructor() {
    this._handleCountDown();
    this._handlePageScroll();

    if (document.querySelector('#scene.race-details')) {
      this._handleTopologySelector();
    } else if (document.querySelector('#scene.faq')) {
      this._handleFaq();
    } else if (document.querySelector('#scene.volunteer')) {
      this._handleBecomeVolunteer();
    }
  }


  _handleCountDown() {
    if (document.querySelector('#countdown')) {
      new Countdown({
        targetDate: new Date('2026-10-17T07:30:00'),
        targetDom: document.querySelector('#countdown'),
        color: 'var(--c-fg)',
        fontSize: 'var(--f-lg3)'
      });
    }
  }


  _handlePageScroll() {
    new window.ScrollBar({
      target: document.body,
      minSize: 200,
      style: {
        color: 'var(--c-primary)'
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


  _handleFaq() {
    const questionClicked = function() {
      const answer = this.nextElementSibling;
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        this.classList.add('active');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } 
    };

    const questions = document.querySelectorAll('.question');
    for (let i = 0; i < questions.length; ++i) {
      questions[i].addEventListener('click', questionClicked);
    } 
  }


  _handleBecomeVolunteer() {
    document.getElementById('become-volunteer').addEventListener('click', () => {
      window.open(`mailto:contact@messe-basse-production.com?subject=Les Foulées Sarmates 2026, je veux devenir bénévole!&body=Bonjour,%0D%0A%0D%0AJe souhaite devenir bénévole pour les foulées Sarmates, édition 2026. Pour cela, voici les informations me concernant :%0D%0A%0D%0APrénom :%0D%0ANom :%0D%0AAdresse mail :%0D%0ANuméro de téléphone :%0D%0A%0D%0AJ'attends votre retour avec impatience.%0D%0AAu revoir`, '_self');
    });
  }


}


export default LFS;
window.LFS = new LFS();
