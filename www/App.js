import { store } from "./store.js";

class App {
  static findID = id => {
    let result = store.find(contact => {
      return contact.id === id;
    });
    return result;
  };

  static addNewContact = contact => {
    store.push(contact);
    //   contact.history = [...contact.history, { ...contact }];
    store.save();
  };

  static deleteContact = id => {
    let itemToDelete = this.findID(id);
    let index = store.indexOf(itemToDelete);
    store.splice(index, 1);
    store.save();
  };
}

export default App;
