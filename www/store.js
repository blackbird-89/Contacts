import { store } from "./localStorage.js";

class Store {
  static findID = id => {
    let result = store.find(contact => {
      return contact.id === id;
    });
    return result;
  };

  static addNewContact = contact => {
    store.push(contact);
    store.save();
  };

  static deleteContact = id => {
    let itemToDelete = this.findID(id);
    let index = store.indexOf(itemToDelete);
    store.splice(index, 1);
    store.save();
  };

  static editContact = (contact, newContact) => {
    let index = store.indexOf(contact);
    store.splice(index, 1, newContact);
    store.save();
  };

  static resetContact = (contact, newContact) => {
    let index = store.indexOf(contact);
    store.splice(index, 1, newContact);
    store.save();
  };
}

export default Store;
