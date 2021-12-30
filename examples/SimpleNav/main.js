import { Nav } from "./components/Nav.js";
import { NavActions } from "./components/Nav.js";

document.addEventListener("DOMContentLoaded", () => {
  let app = document.querySelector("#app")
  let nav = new Nav(app);
  nav.render();
  let navActions = new NavActions({name: 'nav-actions'});
  navActions.render();
})