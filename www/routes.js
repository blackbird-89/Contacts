let home = document.getElementById("home");

let viewPage = document.getElementById("view");

routes = {
  "/": home,
  "/contact": viewPage
};

let rootElem = document.getElementById("content");
rootElem.innerHTML = routes[window.location.pathname].innerHTML;

let onNavigate = pathName => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  rootElem.innerHTML = routes[pathName].innerHTML;
};

window.onpopstate = () => {
  rootElem.innerHTML = routes[window.location.pathname].innerHTML;
};
