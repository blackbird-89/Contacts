import Contact from "./Contact.js";
import Store from "./Store.js";
import { store } from "./localStorage.js";

class UI {
  static createNewElement(elem, className) {
    let newEl = document.createElement(elem);
    newEl.className += className;
    return newEl;
  }

  //Creating labels
  static createLabels(id) {
    let label = document.createElement("label");
    label.htmlFor = id;
    label.innerHTML = id;
    return label;
  }

  //creating inputs
  static createInput = (type, name, placeholder) => {
    let input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.className += "form-input" + " input" + name;
    input.placeholder = "Add " + placeholder;
    return input;
  };

  static renderHeaderAndMain() {
    let header, main;
    header = this.createNewElement("header", "");
    main = document.createElement("main");
    main.setAttribute("id", "content");
    let divHeader = this.createNewElement("div", "header-container");
    header.appendChild(divHeader);
    //Create main heading and form
    let container, mainHeading;
    let containerRouter = this.createNewElement("div", "route1");
    container = this.createNewElement("div", "container");
    containerRouter.setAttribute("id", "home");
    mainHeading = this.createNewElement("h1", "");
    mainHeading.innerHTML = `<i class="fas fa-book-open text-primary"></i
    > My<span>Contact</span>List
    `;
    container.append(mainHeading);
    containerRouter.append(container);
    main.append(containerRouter);
    document.body.append(header);
    document.body.append(main);
  }

  /**
   * creating table
   */

  static renderTable = () => {
    let myTable, tblHead, tblRow, tblBody;
    let container = document.querySelector(".container");
    myTable = this.createNewElement("table", "contacts-table");
    tblHead = document.createElement("thead");
    tblRow = document.createElement("tr");
    tblBody = document.createElement("tbody");
    tblBody.id = "contact-list";
    tblHead.append(tblRow);
    myTable.append(tblHead, tblBody);
    let thNum = 5;
    let categories = [];
    for (let i = 0; i < thNum; i++) {
      let category = document.createElement("th");
      tblRow.appendChild(category);
      categories.push(category);
    }
    categories[0].innerHTML = "Name";
    categories[1].innerHTML = "Phone";
    categories[2].innerHTML = "Email";
    container.append(myTable);
  };

  static renderForm = () => {
    //form
    let myForm;
    myForm = this.createNewElement("form", "contacts-form");
    let container = document.querySelector(".container");

    //Creating inputs
    let inputTags = [
      ["text", "name", "name"],
      ["text", "number", "phone number"],
      ["text", "email", "email"],
      ["submit", " add-contact", ""]
    ];
    let inputs = [];
    for (let i = 0; i < inputTags.length; i++) {
      let newInput = this.createInput(
        inputTags[i][0],
        inputTags[i][1],
        inputTags[i][2]
      );
      inputs.push(newInput);
    }
    inputs[3].value = "Save contact";
    inputs[3].id = "add-contact";
    let labelTags = [
      ["name", "label-name", "Name"],
      ["phone", "label-name", "Phone"],
      ["email", "label-name", "Email"],
      ["", "", ""]
    ];

    let labels = [];
    for (let i = 0; i < labelTags.length; i++) {
      let newLabel = this.createLabels(labelTags[i][0]);
      newLabel.className += labelTags[i][1];
      newLabel.innerHTML = labelTags[i][2];
      labels.push(newLabel);
    }
    let divsInForm = 4;
    let divs = [];
    for (let i = 0; i < divsInForm; i++) {
      let div = this.createNewElement("div", "form-group");
      div.appendChild(labels[i]);
      div.appendChild(inputs[i]);
      myForm.appendChild(div);
      divs.push(div);
    }
    container.append(myForm);
    //nav buttons
    let main = document.querySelector("main");
    let neededDiv = main.querySelectorAll(".form-group");
    let addPhoneButton = this.createNewElement("span", "add-phone");
    addPhoneButton.innerHTML = "+";
    let addEmailButton = this.createNewElement("span", "add-email");
    addEmailButton.innerHTML = "+";
    neededDiv[1].appendChild(addPhoneButton);
    neededDiv[2].appendChild(addEmailButton);
    container.append(myForm);
  };

  static rerenderForm() {
    let myForm = document.querySelector(".contacts-form");
    myForm.remove();
    let myTable = document.querySelector(".contacts-table");
    myTable.remove();
  }

  /**
   * adding phone input fields
   */

  static addMorePhones = e => {
    let elem = e.target.parentElement;
    let inputField = this.createInput("text", "number", "phone number");
    inputField.className += " inputphone-modal modal-input";
    let removePhoneButton = this.createNewElement("span", "remove-phone");
    removePhoneButton.innerHTML = "X";
    elem.appendChild(inputField);
    elem.appendChild(removePhoneButton);
  };

  /**
   * adding email input fields
   */

  static addMoreEmails = e => {
    let elem = e.target.parentElement;
    let inputField = this.createInput("text", "email", "email");
    inputField.className += " inputemail-modal modal-input";
    let removeEmailButton = this.createNewElement("span", "remove-email");
    removeEmailButton.innerHTML = "X";
    elem.appendChild(inputField);
    elem.appendChild(removeEmailButton);
  };

  //removing

  static deleteAddPhone = e => {
    let elem = e.target.previousSibling;
    let elem2 = e.target;
    //   let elem3 = e.target.nextSibling;
    //   console.log(e.target.nextSibling);
    elem.remove();
    elem2.remove();
    //   elem3.remove();
  };

  //removing

  static deleteAddEmail = e => {
    let elem = e.target.previousSibling;
    let elem2 = e.target;
    //   let elem3 = e.target.nextSibling;
    elem.remove();
    elem2.remove();
    //   elem3.remove();
  };

  /**
   * Adding a row to the table
   */
  static addTableRow = (item, id) => {
    let list = document.querySelector(id);
    let row = document.createElement("tr");
    let tablePhone = document.createElement("td");
    let tableName = document.createElement("td");
    let tableEmail = document.createElement("td");
    let tableButton1 = document.createElement("td");
    let tableButton2 = document.createElement("td");
    let tableButton3 = document.createElement("td");
    let buttonEdit = document.createElement("button");
    buttonEdit.className = "edit";
    let buttonInfo = document.createElement("button");
    buttonInfo.className = "info";
    let buttonDelete = document.createElement("button");
    buttonDelete.className = "delete";
    tableButton1.appendChild(buttonEdit);
    tableButton2.appendChild(buttonDelete);
    tableButton3.appendChild(buttonInfo);
    buttonDelete.innerHTML = "Delete";
    buttonEdit.innerHTML = "Edit";
    buttonInfo.innerHTML = "Info";
    tableName.innerHTML = item.name;
    // for (let i = 0; i < item.number.length; i++) {
    //   if (Array.isArray(item.number)) {
    //     // let additional = document.createElement("td");
    //     additional.innerHTML = item.number[i];
    //     // let mybr = document.createElement("br");
    //     // tablePhone.appendChild(mybr);
    //     // tablePhone.append(additional);
    //   } else {
    tablePhone.innerHTML = item.number;
    tableEmail.innerHTML = item.email;
    row.setAttribute("id", item.id);
    row.appendChild(tableName);
    row.appendChild(tablePhone);
    row.appendChild(tableEmail);
    row.appendChild(tableButton1);
    row.appendChild(tableButton2);
    row.appendChild(tableButton3);
    list.appendChild(row);
  };

  static displayContacts = () => {
    store.map(item => {
      this.addTableRow(item, "#contact-list");
    });
  };

  /***
   * add and remove button
   */

  static renderContactView() {
    let view = this.createNewElement("div", "route2");
    let containerContact = this.createNewElement("div", "container-contact");
    view.setAttribute("id", "view");
    let headingView = this.createNewElement("h1", "");
    headingView.innerHTML = `<i class="fas fa-book-open text-primary"></i
    > Contact</span>
    `;
    containerContact.appendChild(headingView);
    let introduction = this.createNewElement("div", "intro-contact");
    containerContact.appendChild(introduction);
    let contactTable, conTblHead, conTblRow, conTblBody;
    contactTable = this.createNewElement("table", "contact-history");
    conTblHead = document.createElement("thead");
    conTblRow = document.createElement("tr");
    conTblBody = document.createElement("tbody");
    conTblBody.id = "contact-history";
    conTblHead.append(conTblRow);
    contactTable.append(conTblHead, conTblBody);
    let thNumer = 7;
    let tableItems = [];
    for (let i = 0; i < thNumer; i++) {
      let tableItem = document.createElement("th");
      conTblRow.appendChild(tableItem);
      tableItems.push(tableItem);
    }
    tableItems[0].innerHTML = "Date";
    tableItems[1].innerHTML = "Name";
    tableItems[2].innerHTML = "Phone";
    tableItems[3].innerHTML = "Email";
    containerContact.append(contactTable);
    let backButton = UI.createNewElement("button", "backButton");
    let forwardButton = UI.createNewElement("button", "forwardButton");
    let saveButton = UI.createNewElement("button", "saveButton");
    backButton.innerHTML = "Back";
    forwardButton.innerHTML = "Forward";
    saveButton.innerHTML = "Save";

    containerContact.append(backButton);
    containerContact.append(forwardButton);
    containerContact.append(saveButton);

    view.append(containerContact);
    let main = document.querySelector("main");
    main.append(view);
  }

  /**
   * Clearing input fields after adding values to the DOM
   */

  static clearFields = () => {
    let input = [];
    input = document.querySelectorAll(".form-input");
    let inputs = Array.from(input);
    for (let item of inputs) {
      item.value = "";
    }
    let lastIndex = inputs.length - 1;
    inputs[lastIndex].value = "Save contact";
  };

  static ID = () => {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  /**
   * Adding new contact to DOm
   * and storage
   */
  static addContacttoDOM = contact => {
    this.addTableRow(contact, "#contact-list");
  };

  static addContact = e => {
    e.preventDefault();
    let main = document.querySelector("main");
    let name = document.querySelector(".inputname").value;
    let numbers = [];
    numbers = main.querySelectorAll(".inputnumber");
    let phoneNumber = [];
    let stable = Array.from(numbers);
    for (let item of stable) {
      phoneNumber = [...phoneNumber, ...[item.value]];
    }
    let emails = main.querySelectorAll(".inputemail");
    let emailAdress = [];
    let stableEmail = Array.from(emails);
    for (let item of stableEmail) {
      emailAdress = [...emailAdress, ...[item.value]];
    }
    let id = UI.ID();
    let date = new Date().toLocaleString();
    let contact = new Contact(id, date, name, phoneNumber, emailAdress);
    Store.addNewContact(contact);
    this.addContacttoDOM(contact);
    this.clearFields();
    this.rerenderForm();
    this.renderForm();
    this.renderTable();
    this.displayContacts();
  };

  /**
   * Removing contacts from the DOM
   */

  static deleteContactFromDOM = elem => {
    if (elem.classList.contains("delete")) {
      elem.parentElement.parentElement.remove();
    }
  };

  /**
   * Removing contacts from the DOM
   * Deleting contact from local storage, on click
   */

  static deleteContact = e => {
    let elem = e.target;
    this.deleteContactFromDOM(elem);
    if (elem.classList.contains("delete")) {
      let targetId = elem.parentElement.parentElement.id;
      Store.deleteContact(targetId);
    }
  };
}

export default UI;
