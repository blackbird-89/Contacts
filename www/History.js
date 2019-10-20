import Store from "./Store.js";
import UI from "./UI.js";

class History {
  static introContactHistory = contact => {
    let elem = document.querySelector(".intro-contact");
    let heading = UI.createNewElement("h2", "intro-contact-heading");
    let phoneNumber = UI.createNewElement("p", "intro-contact-phone");
    let email = UI.createNewElement("p", "intro-contact-email");
    let buttonHome = document.createElement("button");
    buttonHome.className = "button-home";
    buttonHome.innerHTML = '<i class="fas fa-arrow-left"></i>';
    heading.innerHTML = contact.name;
    phoneNumber.innerHTML = contact.number;
    email.innerHTML = contact.email;
    elem.appendChild(buttonHome);

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
    //last one -- need later for pointer
    //   let currentContactIndex = history.length - 1;

    let copy = { ...found };
    copy.date = new Date().toLocaleString();
    contactToShow.history = [...contactToShow.history, { ...copy }];
    //   contactToShow = { ...found };
    let newVersion = Object.assign(contactToShow, copy);
    Store.resetContact(contactToShow, newVersion);

    this.refreshContactInfo();
    this.refreshTableHistory(".contact-history");
    let elem = document.querySelector(".intro-contact");
    let alertInfo = UI.createNewElement("p", "alertInfo");
    alertInfo.innerHTML = "Updated";
    elem.append(alertInfo);
    this.introContactHistory(found);
    setTimeout(() => {
      alertInfo.style.display = "none";
    }, 3000);

    newVersion.history.map(item => {
      this.addTableRowInHistory(item, ".contact-history");
    });
  };
}

export default History;
