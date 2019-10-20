import Store from "./Store.js";
import UI from "./UI.js";

class History {
  static introContactHistory = contact => {
    let elem = document.querySelector(".intro-contact");
    let heading = UI.createNewElement("h2", "intro-contact-heading");
    let phoneNumber = UI.createNewElement("p", "intro-contact-phone");
    let email = UI.createNewElement("p", "intro-contact-email");
    heading.innerHTML = contact.name;
    phoneNumber.innerHTML = contact.number;
    email.innerHTML = contact.email;
    elem.appendChild(heading);
    elem.appendChild(phoneNumber);
    elem.appendChild(email);
  };

  static addTableRowInHistory = (item, id) => {
    let list = document.querySelector(id);
    let tableDate = document.createElement("td");
    let tableName = document.createElement("td");
    let tablePhone = document.createElement("td");
    let tableEmail = document.createElement("td");
    let tableButton3 = document.createElement("td");
    let buttonReset = document.createElement("button");
    buttonReset.className += "reset";
    tableButton3.appendChild(buttonReset);
    buttonReset.innerHTML = "Återställ";
    tableDate.innerHTML = item.date;
    tableName.innerHTML = item.name;
    tablePhone.innerHTML = item.number;
    tableEmail.innerHTML = item.email;
    let row = document.createElement("tr", "row-contact");
    row.setAttribute("id", item.id);
    row.appendChild(tableDate);
    row.appendChild(tableName);
    row.appendChild(tablePhone);
    row.appendChild(tableEmail);
    row.appendChild(tableButton3);
    list.appendChild(row);
  };

  static refreshTableHistory = id => {
    let list = document.querySelector(id);
    list.innerHTML = "";
  };

  static refreshContactInfo = () => {
    let elem = document.querySelector(".intro-contact");
    let heading = document.querySelector(".intro-contact-heading");
    let phoneNumber = document.querySelector(".intro-contact-phone");
    let email = document.querySelector(".intro-contact-email");
    elem.removeChild(heading);
    elem.removeChild(phoneNumber);
    elem.removeChild(email);
  };

  static showHistory = e => {
    let id = e.target.parentElement.parentElement.id;
    let contactToShow = Store.findID(id);
    this.introContactHistory(contactToShow);
    let history = contactToShow.history;
    history.map(item => {
      this.addTableRowInHistory(item, ".contact-history");
    });
  };
}

export default History;
