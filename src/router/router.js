import loginView from "../views/loginView.js";
import homeView from "../views/homeView.js";
import { isAuthenticated } from "../utils.js";

const routes = {
  "/": loginView,
  "/home": homeView,
};

const privateRoutes = ["/home"];
const publicRoutes = ["/"];

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");

  let path = window.location.pathname;

  if (privateRoutes.includes(path) && !isAuthenticated()) {
    history.replaceState({}, "", "/");
    path = "/";
  }

  if (publicRoutes.includes(path) && isAuthenticated()) {
    history.replaceState({}, "", "/home");
    path = "/home";
  }

  const view = routes[path] || loginView;

  app.innerHTML = view();
};

window.addEventListener("popstate", router);
