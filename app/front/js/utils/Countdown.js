class Countdown {


  constructor(options) {
    this._targetDate = options.targetDate.getTime();
    this._targetDom = options.targetDom;
    this._intervalId = -1;

    if (this._checkValidity() === true) {
      this._prepareDom(options);
      this.startClock();
    } else {
      this._targetDom.innerHTML = `<p>Compte à rebourd terminé!<br>À l'année prochaine 😉</p>`;
    }
  }


  startClock() {
    if (this._intervalId === -1) {
      this._tick();
      this._intervalId = setInterval(this._tick.bind(this), 1000);
    }
  }


  stopClock() {
    if (this._intervalId !== -1) {
      clearInterval(this._intervalId);
      this._intervalId = -1;
    }
  }


  _checkValidity() {
    const now = new Date().getTime();

    if ((this._targetDate - now) <= 0) {
      return false;
    }

    return true;
  }


  _prepareDom(options) {
    this._targetDom.style.display = 'flex';
    this._targetDom.style.justifyContent = 'center';
    this._targetDom.style.transition = '.1s transform';

    const containers = [
      document.createElement('DIV'), // D
      document.createElement('DIV'), // H
      document.createElement('DIV'), // M
      document.createElement('DIV')  // S
    ];

    for (let i = 0; i < containers.length; ++i) {
      containers[i].style.borderRadius = '.5rem';
      containers[i].style.color = `${options?.color ? options.color : 'black'}`;
      containers[i].style.display = 'flex';
      containers[i].style.flexDirection = 'column';
      containers[i].style.width = '8rem';

      const number = document.createElement('P');
      const text = document.createElement('P');

      number.style.fontSize = `${options?.fontSize ? options.fontSize : '18pt'}`;
      number.style.fontWeight = 'bold';
      number.style.marginBottom = '.5rem';
      number.style.textTransform = 'uppercase';
      text.style.fontSize = `${options?.fontSize ? 'calc(' + options.fontSize + '/ 3)' : '10pt'}`;
      text.style.margin = '0';
      text.style.textTransform = 'uppercase';

      containers[i].appendChild(number);
      containers[i].appendChild(text);
      this._targetDom.appendChild(containers[i]);
    }
  }


  _tick() {
    const now = new Date().getTime();
    const distance = this._targetDate - now;
    // Decompose distance in readable elements
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((distance % (1000 * 60)) / 1000);
    // Update DOM numbers and texte
    this._targetDom.children[0].firstChild.innerHTML = `${this.prefixZero(days)}`;
    this._targetDom.children[0].lastChild.innerHTML = `${(days <= 1) ? 'jour' : 'jours'}`;
    this._targetDom.children[1].firstChild.innerHTML = `${this.prefixZero(hrs)}`;
    this._targetDom.children[1].lastChild.innerHTML = `${(hrs <= 1) ? 'heure' : 'heures'}`;
    this._targetDom.children[2].firstChild.innerHTML = `${this.prefixZero(min)}`;
    this._targetDom.children[2].lastChild.innerHTML = `${(min <= 1) ? 'minute' : 'minutes'}`;
    this._targetDom.children[3].firstChild.innerHTML = `${this.prefixZero(sec)}`;
    this._targetDom.children[3].lastChild.innerHTML = `${(sec <= 1) ? 'seconde' : 'secondes'}`;
    // Animate text
    this._targetDom.style.transform = 'scale(1.025)';
    setTimeout(() => this._targetDom.style.transform = 'scale(1)', 90);
    // Check for stop condition
    if (this._checkValidity() === false) {
      this.stopClock();
      this._targetDom.innerHTML = `<p>Compte à rebourd terminé!<br>À l'année prochaine 😉</p>`;
    }
  }


  prefixZero(input) {
    if (input < 10) {
      return `0${input}`;
    }

    return `${input}`;
  }


}


export default Countdown;