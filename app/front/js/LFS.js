import '../scss/lfs.scss';
import Countdown from './utils/Countdown';


class LFS {


  constructor() {
    this._version = '1.0.1';

    this._updateNav();
    this._handleCountDown();
    this._handlePageScroll();

    if (document.querySelector('#scene.race-details')) {
      this._handleTopologySelector();
      this._handleImageSlideshow();
    } else if (document.querySelector('#scene.faq')) {
      this._handleFaq();
    } else if (document.querySelector('#scene.volunteer')) {
      this._handleBecomeVolunteer();
    }
  }


  _updateNav() {
    const type = document.querySelector('#scene').dataset.nav;
    if (type) {
      const navChildren = document.querySelector('#nav-menu').children;
      for (let i = 0; navChildren.length; ++i) {
        if (navChildren[i].dataset.nav === type) {
          navChildren[i].classList.add('selected');
          break;
        }
      }
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


  _handleImageSlideshow() {
    const slideshow = document.querySelector('#slideshow').dataset.hamlets.split('/');
    const titles = {
      charpenterie: 'La Charpenterie',
      mesnil: 'Le Mesnil',
      blancheface: 'Blancheface',
      montflix: 'Monftlix',
      mondetour: 'Mondétour',
      bellanger: 'Bellanger',
      bourg: 'Le Bourg'
    };
    let idx = 0;
    let intervalId = -1;
    let backIdx = 1;
    const indicators = document.querySelector('#item-indicators');
    // Change slideshow image each 7 seconds
    const animateSlideshow = () => {
      intervalId = setInterval(() => {
        idx = (idx + 1) % slideshow.length;
        updateSlideshow();
      }, 7000);
    };
    // idx has been updated, update/animate image the restart slideshow animation
    const updateSlideshow = () => {
      if (backIdx === 0) {
        document.querySelector('#slideshow-0').src = `/assets/img/photo/${slideshow[idx]}-drone.webp`;
        document.querySelector('#slideshow-0').style.opacity = 1;
        document.querySelector('#slideshow-1').style.opacity = 0;
        backIdx = 1;
      } else {
        document.querySelector('#slideshow-1').src = `/assets/img/photo/${slideshow[idx]}-drone.webp`;
        document.querySelector('#slideshow-0').style.opacity = 0;
        document.querySelector('#slideshow-1').style.opacity = 1;
        backIdx = 0;
      }
      document.querySelector('#slideshow-label').innerHTML = titles[slideshow[idx]];
      updateIndicators();
    };
    // Update indicators selected item
    const updateIndicators = () => {
      for (let i = 0; i < indicators.children.length; ++i) {
        indicators.children[i].classList.remove('selected');
        if (i === idx) {
          indicators.children[i].classList.add('selected');
        }
      }

    };
    // Build item indicator
    for (let i = 0; i < slideshow.length; ++i) {
      const item = document.createElement('DIV');
      item.classList.add('item-indicator');
      document.querySelector('#item-indicators').appendChild(item);
      if (i === 0) {
        item.classList.add('selected');
      }
      item.addEventListener('click', () => {
        idx = i;
        updateSlideshow();
      });
    }

    // Start slideshow animation
    updateSlideshow();
    animateSlideshow();

    // Slideshow back button
    document.querySelector('#back-image').addEventListener('click', () => {
      idx = (idx - 1 + slideshow.length) % slideshow.length;
      updateSlideshow();
    });
    // Slideshow next button
    document.querySelector('#next-image').addEventListener('click', () => {
      idx = (idx + 1) % slideshow.length;
      updateSlideshow();
    });
    // Stop animation when mouse is over slideshow
    document.querySelector('#slideshow').addEventListener('mouseenter', () => {
      clearInterval(intervalId);
    });
    // Restart animation when mouse leave slideshow
    document.querySelector('#slideshow').addEventListener('mouseleave', () => {
      clearInterval(intervalId);
      animateSlideshow();
    });
    // Next image on click for both slideshow images
    document.querySelector('#slideshow-0').addEventListener('click', () => {
      idx = (idx + 1) % slideshow.length;
      updateSlideshow();
    });
    document.querySelector('#slideshow-1').addEventListener('click', () => {
      idx = (idx + 1) % slideshow.length;
      updateSlideshow();
    });
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
