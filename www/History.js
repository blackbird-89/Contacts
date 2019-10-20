import Store from "./Store.js";
import UI from "./UI.js";

let counter = 0;
class History {
  static introContactHistory = contact => {
    let elem = document.querySelector(".intro-contact");
    let heading = UI.createNewElement("h2", "intro-contact-heading");
    let phoneNumber = UI.createNewElement("p", "intro-contact-phone");
    let email = UI.createNewElement("p", "intro-contact-email");
    let buttonHome = document.createElement("button");
    let iconUser = UI.createNewElement("span", "icon-user");
    let iconPhone = UI.createNewElement("span", "icon-phone");
    let iconEmail = UI.createNewElement("span", "icon-email");
    iconUser.innerHTML = '<i class="fas fa-user"></i>';
    iconPhone.innerHTML = '<i class="fas fa-phone"></i>';
    iconEmail.innerHTML = '<i class="far fa-envelope"></i>';
    buttonHome.className = "button-home";
    buttonHome.innerHTML = '<i class="fas fa-arrow-left"></i>';
    heading.innerHTML = contact.name;
    phoneNumber.innerHTML = contact.number;
    email.innerHTML = contact.email;
    elem.appendChild(buttonHome);
    heading.prepend(iconUser);
    phoneNumber.prepend(iconPhone);
    email.prepend(iconEmail);
    elem.appendChild(heading);
    elem.appendChild(phoneNumber);
    elem.appendChild(email);

    //navigating
    buttonHome.addEventListener("click", () => {
      onNavigate("/");
      UI.displayContacts();
    });
  };

  static addTableRowInHistory = (item, id) => {
    let list = document.querySelector(id);
    list.setAttribute("id", item.id);
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

  //reseting

  static resetContact = e => {
    let id = e.target.parentElement.parentElement.id;
    let timestamp =
      e.target.parentElement.parentElement.childNodes[0].textContent;
    let contactToShow = Store.findID(id);
    let history = contactToShow.history;
    let found = history.find(contact => {
      return contact.date === timestamp;
    });
    this.updateContact(found, id);
  };

  static stepBack = num => {
    counter = counter + num;
  };

  static stepForward = num => {
    counter = counter - num;
  };

  static updateContact = (contact, id) => {
    let contactToShow = Store.findID(id);
    let copy = { ...contact };
    copy.date = new Date().toLocaleString();
    contactToShow.history = [...contactToShow.history, { ...copy }];
    let newVersion = Object.assign(contactToShow, copy);
    Store.resetContact(contactToShow, newVersion);
    this.refreshContactInfo();
    this.refreshTableHistory(".contact-history");
    let elem = document.querySelector(".intro-contact");
    elem.id = newVersion.id;
    let alertInfo = UI.createNewElement("p", "alertInfo");
    alertInfo.innerHTML = "Updated";
    elem.append(alertInfo);
    this.introContactHistory(copy);
    setTimeout(() => {
      alertInfo.style.display = "none";
    }, 3000);
    newVersion.history.map(item => {
      this.addTableRowInHistory(item, ".contact-history");
    });
  };

  static saveChanges = () => {
    let id = document.querySelector(".contact-history").getAttribute("id");
    let contactToShow = Store.findID(id);
    let current = counter;
    let history = contactToShow.history;
    if (counter === 0) {
      return;
    }
    if (counter > history.length) {
      return;
    }
    if (counter < 0) {
      return;
    } else {
      let currentContIndex = history.length - current;
      let contact = history[currentContIndex];
      this.updateContact(contact, id);
      counter = 0;
    }
  };
}

export default History;
