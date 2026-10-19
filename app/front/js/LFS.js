import '../scss/lfs.scss';
import Countdown from './utils/Countdown';


class LFS {


  constructor() {
    this._version = '1.1.0';

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
    } else if (document.querySelector('#scene.finisher')) {
      this._handleFinishers();
    }
  }


  _updateNav() {
    const type = document.querySelector('#scene').dataset.nav;
    if (type) {
      const navChildren = document.querySelector('#nav-menu').children;
      for (let i = 0; i < navChildren.length; ++i) {
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


  /* Poster specific methods */


  _handleFinishers() {
    document.getElementById('submit-poster').addEventListener('click', this._modalPoster.bind(this));
  }


  async _modalPoster() {
    let rawData = {};
    const csvData = [];
    try {
      const csvResponse = await fetch('/assets/csv/lfs26-results.csv');
      rawData = await csvResponse.text();
      const lines = rawData.split('\n');
      const headers = lines[0].split(',');
      // Format output object with header values
      for (let i = 1; i < lines.length; ++i) {
        const obj = {};
        if (lines[i] == undefined || lines[i].trim() == '') {
          continue;
        }
        const words = lines[i].split(',');
        for (let j = 0; j < words.length; ++j) {
          obj[headers[j].trim()] = words[j].replace('\r', '');
        }
        csvData.push(obj);
      }
    } catch (error) {
      document.querySelector('#error-message').innerHTML = 'Erreur lors de la lecture du fichier de participants. Veuillez contacter l\'administrateur du site :  contact@messe-basse-production.com';
      console.error(error)
      return;
    }
    // Now fetch modal
    this._fetchPage('/modal/poster').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('credit');
      modal.appendChild(dom);
      document.getElementById('overlay').appendChild(modal);
      this._openModal(modal);
      // Poster generation specific
      modal.querySelector('#generate-poster').addEventListener('click', () => {
        // First we need to validate submitted input with race csv dump
        let runner = null;
        for (let i = 0; i < csvData.length; ++i) {
          if (csvData[i].Dossard === modal.querySelector('#race-number').value) {
            runner = csvData[i];
            break;
          }
        }
        if (!runner) {
          modal.querySelector('#error-message').innerHTML = 'Aucun dossard correspondant dans la liste des participants.';
          return;
        }
        // Then, we extract runner data to update the map if matching
        const race = runner.Course.replace('km', '');
        const time = runner.Temps.split(':');
        const pace = `${this._precisionRound(60 / runner.Vitesse, 2)}`.split('.');
        document.getElementById('building-overlay').style.display = 'flex';
        setTimeout(() => document.getElementById('building-overlay').style.opacity = 1, 100);
        setTimeout(() => {
          this._fetchPage('/modal/postercontent').then(posterDom => {
            const renderZone = document.createElement('DIV');
            renderZone.classList.add('poster-render-zone');
            document.body.appendChild(renderZone);
            renderZone.appendChild(posterDom);
            // Customize output map
            renderZone.querySelector('#trace-image').src = `/assets/img/poster/trace-${race}.png`;
            renderZone.querySelector('#back-image').src = `/assets/img/poster/oldschool-${race}.png`;
            renderZone.querySelector('#map-topology').src = `/assets/img/poster/profile-${race}.png`;
            renderZone.querySelector('#race-name').innerHTML = (race === '21') ? 'Le Semi des Hameaux' : (race === '10') ? 'Les 10k de la Plaine' : 'Les 5k de la Plaine';
            renderZone.querySelector('#runner-number').innerHTML = runner.Dossard;
            renderZone.querySelector('#runner-surname').innerHTML = runner.Prenom;
            renderZone.querySelector('#runner-name').innerHTML = `${String(runner.Nom[0]).toUpperCase()}${String(runner.Nom).slice(1).toLowerCase()}`;
            renderZone.querySelector('#race-distance').innerHTML = (race === '21') ? '21,02 km' : (race === '10') ? '10,07 km' : '5,69 km';
            renderZone.querySelector('#race-elevation').innerHTML = (race === '21') ? '260 m' : (race === '10') ? '113 m' : '91 m';
            renderZone.querySelector('#race-time').innerHTML = `${(time[0] !== '00' || time[0] !== '0') ? time[0] + 'h' : ''}${time[1]}'${time[2].split('.')[0]}"`;
            renderZone.querySelector('#race-pace').innerHTML = `${pace[0]}${pace[1] ? ',' + pace[1] : ''} min/km`;

            this._saveMapToDisk(renderZone).then(() => {
              document.body.removeChild(renderZone);
              setTimeout(() => {
                document.getElementById('building-overlay').style.opacity = 0;
                setTimeout(() => {
                  document.getElementById('building-overlay').style.display = 'none';
                  document.getElementById('building-overlay').innerHTML = '';
                }, 300);
              }, 300);
            }).catch(err => console.error(err));
          });
        }, 300);
      });
    });
  }


  /**
   * @method
   * @name _dlPerformMapPrint
   * @private
   * @memberof LFS
   * @author Arthur Beaulieu
   * @since September 2026
   * @description
   * <blockquote>
   * The method will perform its logic only if all tiles are loaded. If so, it will use html2canvas library
   * to perform a conversion between poster into a canvas that will be later used to save the poster
   * to the user disk. Call this method in a setInterval to regulary test if tiles are loaded.
   * </blockquote>
  **/
  _saveMapToDisk(dom) {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        // Execute html2canvas with output div
        window.html2canvas(dom, {
          width: dom.offsetWidth,
          height: dom.offsetHeight,
          dpi: 300
        }).then(canvas => {
          if (document.querySelector('#cmyk-output').checked === true) {
            const { jsPDF } = window.jspdf;
            let pdf = new jsPDF({
              orientation: 'portrait',
              format: 'A3',
              precision: 32
            });
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, width, height, '', 'FAST');
            pdf.setProperties({
              title: 'Poster Finsher LFS2026',
              subject: 'Poster de finisher des Foulées Sarmates 2026',
              author: 'Messe Basse Production',
              keywords: 'LFS, Les Foulées Sarmates, MBP, Messe Basse Production, 2026, Finisher, Poster',
              creator: 'Messe Basse Production'
            });
            pdf.save(`LFS2026-Poster-Finisher.pdf`);
          } else {
            const link = document.createElement('A');
            link.download = `LFS2026-Poster-Finisher.png`;
            link.href = canvas.toDataURL(`image/png`, 1.0);
            link.click();
          }

          resolve();
        }).catch(reject);
      });
    });
  }


  /* Utils */


  _precisionRound(value, precision) {
    if (typeof value !== 'number' || typeof precision !== 'number') {
      return -1;
    }
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  _openModal(modal, closingCallback) {
    // Modal opening/closing animation
    const closeModal = e => {
      if (['overlay', 'close-modal'].indexOf(e.target.id) === -1) {
        return;
      }

      if (closingCallback) {
        closingCallback();
      }
      document.getElementById('overlay').removeEventListener('click', closeModal);
      document.getElementById('close-modal').removeEventListener('click', closeModal);

      document.getElementById('overlay').style.opacity = 0;
      setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('overlay').innerHTML = '';
      }, 300);
    };

    document.getElementById('overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('overlay').style.opacity = 1, 100);
    setTimeout(() => {
      modal.style.opacity = 1;
      document.getElementById('overlay').addEventListener('click', closeModal);
      document.getElementById('close-modal').addEventListener('click', closeModal);
    }, 200);    
  }


  _fetchPage(url, lang) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: new Headers({ 'Accept-Language': lang || 'fr' })
      }).then(data => {
        data.text().then(htmlString => {
          resolve(document.createRange().createContextualFragment(htmlString));
        }).catch(reject);
      }).catch(reject);
    });
  }


}


export default LFS;
window.LFS = new LFS();
