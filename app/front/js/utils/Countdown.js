class Countdown {


  constructor(options) {
    this._targetDate = options.targetDate.getTime();
    this._targetDom = options.targetDom;
    this._intervalId = -1;

    if (this._checkValidity() === true) {
      this.startClock();
    } else {
      this._targetDom.innerHTML = `Compte à rebourd terminé!<br>À l'année prochaine 😉`;
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


  _tick() {
    const now = new Date().getTime();
    const distance = this._targetDate - now;
    // Decompose distance in readable elements
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((distance % (1000 * 60)) / 1000);
    // Adjust plurals and hide empty min or sec if required
    days = (days === 0) ? '' : (days === 1) ? '<h2>1 jour</h2>' : `<h2>${days} jours</h2>`;
    hrs = (hrs === 0) ? '' : (hrs === 1) ? '1 heure, ' : `${hrs} heures, `;
    min = (hrs === '' && min === 0) ? '' : (min <= 1) ? `${min} minute ` : `${min} minutes `;
    if (min !== '' && sec > 0) { min += 'et '; }
    sec = (sec === 0) ? '' : (sec === 1) ? `${sec} seconde` : `${sec} secondes`;
    // Update DOM and check for stop condition
    this._targetDom.innerHTML = `${days}${hrs}${min}${sec}`;
    if (this._checkValidity() === false) {
      this.stopClock();
      this._targetDom.innerHTML = `Compte à rebourd terminé!<br>À l'année prochaine 😉`;
    }
  }
}


export default Countdown;