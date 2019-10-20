// import Router from "./Router.js";
import UI from "./UI.js";
import Modal from "./Modal.js";
import History from "./History.js";

UI.renderHeaderAndMain();
UI.renderContactView();
// UI.displayContacts();
Modal.renderModal();

window.onload = function() {
  onNavigate("/");
  UI.displayContacts();
};
/***
 * Event delegation
 */

const [listen, unlisten] = (() => {
  let listeningOnType = {};
  let listeners = [];

  function listen(eventType, cssSelector, func) {
    // Register a "listener"
    let listener = { eventType, cssSelector, func };
    listeners.push(listener);
    // If no listener on window[eventType] register a
    // a real/raw js-listener
    if (!listeningOnType[eventType]) {
      // add event listener for this type on the whole window
      window.addEventListener(eventType, e => {
        listeners
          .filter(x => x.eventType === eventType)
          .forEach(listener => {
            if (e.target.closest(listener.cssSelector)) {
              listener.func(e);
            }
          });
      });
      listeningOnType[eventType] = true;
    }
    return listener;
  }

  function unlisten(listener) {
    listeners.splice(listeners.indexOf(listener), 1);
  }

  return [listen, unlisten];
})();

listen("click", ".add-contact", e => {
  e.preventDefault();
  UI.addContact(e);
});

listen("click", ".delete", e => {
  UI.deleteContact(e);
});

listen("click", ".close-button", () => {
  Modal.refreshModal();
  Modal.toggleModal("");
});

listen("click", ".edit", e => {
  let id = e.target.parentElement.parentElement.id;
  Modal.showModal(id);
});

listen("submit", ".form-modal", e => {
  e.preventDefault();

  Modal.saveEditedContact(e);
  Modal.refreshModal();
  Modal.toggleModal("");
});

listen("click", ".info", e => {
  onNavigate("/contact");
  History.showHistory(e);
});
