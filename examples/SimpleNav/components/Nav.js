import { Component } from "../Vector.js";

export class Nav extends Component {
  constructor($parent) {
    super($parent);
  }

  template() {
    return `
      <ul class="nav">
        <li class="nav__item nav__brand"><a href="/" class="nav__link">Awesome Website</a></li>
        <li class="nav__item"><a href="/" class="nav__link">Home</a></li>
        <li class="nav__item nav__last"><a href="/contact" class="nav__link">Contact</a></li>
        <li class="nav__item"><slot name="nav-actions"><slot></li>
      </ul>
    `
  }
}

export class NavActions extends Component {
  constructor($parent) {
    super($parent);
    this.state = {loggedin: localStorage.getItem("loggedin") ? true : false};
    this.eventListeners = [
      {selector: '#login', type: 'click', callback: () => {alert("Login!")}}, // Normal syntax
      ['#logout', 'click', () => {alert("Logout!")}] // Shorthand syntax
    ]
  }

  template() {
    if (this.state.loggedin) {
      return `
        <button id="logout" class="nav__link nav__action">Logout</a>
      `
    } else {
      return `
        <button id="login" class="nav__link nav__action">Login</a>
      `
    }
  }
}
