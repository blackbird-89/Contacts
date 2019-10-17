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

// We can unlisten - try commenting in these lines:
// unlisten(listener1);

/***********
 * Setting up local storage
 */

let store;
try {
  store = JSON.parse(localStorage.store);
} catch (e) {
  store = [];
}

store.save = function() {
  localStorage.store = JSON.stringify(this);
};

/* PROTOTYPE*/

const contactPrototype = {
  id: "",
  date: "",
  name: [],
  phone: [],
  email: [],
  history: []
};

function Contact(id, date, name, number, email) {
  let newContact = Object.create(contactPrototype);

  newContact.id = id;
  newContact.date = date;
  newContact.name = name;
  newContact.number = number;
  newContact.email = email;
  newContact.history = [];
  return newContact;
}

/***********
 * Classes
 */
// class ContactsBook {
//   list = [];
// }

// let myContacts = new ContactsBook();
// console.log(myContacts, "contacts");

// class Contact {
//   constructor(id, date, name, number, email) {
//     this.id = id;
//     this.date = date;
//     this.name = name;
//     this.number = number;
//     this.email = email;
//     this.history = [];
//   }
// }

/***********
 * Creating markup
 */

let header, main, footer;

const createNewElement = (elem, className) => {
  let newEl = document.createElement(elem);
  newEl.className += className;
  return newEl;
};

main = document.createElement("main");
main.setAttribute("id", "content");

//Create main heading and form
let container, mainHeading, myForm;
let containerRouter = createNewElement("div", "route1");
container = createNewElement("div", "container");
containerRouter.setAttribute("id", "home");

mainHeading = createNewElement("h1", "");
mainHeading.innerHTML = `<i class="fas fa-book-open text-primary"></i
> My<span>Contact</span>List
`;
myForm = createNewElement("form", "contacts-form");
container.append(mainHeading, myForm);
containerRouter.append(container);
main.append(containerRouter);
// main.append(container);

//creating Contact view**************************************'
/////
///////
let view = createNewElement("div", "route2");
let containerContact = createNewElement("div", "container-contact");

view.setAttribute("id", "view");
let headingView = createNewElement("h1", "");
headingView.innerHTML = `<i class="fas fa-book-open text-primary"></i
> Contact</span>
`;
// view.appendChild(headingView);
containerContact.appendChild(headingView);
let introduction = createNewElement("div", "intro-contact");
containerContact.appendChild(introduction);
let contactTable, conTblHead, conTblRow, conTblBody;
contactTable = createNewElement("table", "contact-history");
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
view.append(containerContact);

main.append(view);

window.onload = function() {
  displayContacts();
};

//buttons to navigate***************************************************************buttons
header = createNewElement("header", "");
let buttonHome = createNewElement("button", "button-home");
buttonHome.innerHTML = "Home";
let buttonView = createNewElement("button", "button-view");
buttonView.innerHTML = "View";
let divHeader = createNewElement("div", "header-container");
divHeader.appendChild(buttonHome);
divHeader.appendChild(buttonView);
header.appendChild(divHeader);

//navigating
buttonHome.addEventListener("click", () => {
  onNavigate("/");
  displayContacts();
});

buttonView.addEventListener("click", () => {
  onNavigate("/contact");
});

//Creating labels
const createLabels = id => {
  let label = document.createElement("label");
  label.htmlFor = id;
  label.innerHTML = id;
  return label;
};

//Creating inputs
let inputTags = [
  ["text", "name"],
  ["text", "number"],
  ["text", "email"],
  ["submit", "add-contact", ""]
];

const createInput = (type, name) => {
  let input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.className += "form-input";
  input.id = name;
  return input;
};

let inputs = [];

for (let i = 0; i < inputTags.length; i++) {
  let newInput = createInput(inputTags[i][0], inputTags[i][1]);
  inputs.push(newInput);
}

inputs[3].value = "Add contact";

let labelTags = [
  ["name", "label-name", "Name"],
  ["phone", "label-name", "Phone"],
  ["email", "label-name", "Email"],
  ["", "", ""]
];

let labels = [];
for (let i = 0; i < labelTags.length; i++) {
  let newLabel = createLabels(labelTags[i][0]);
  console.log(labelTags[i][i]);
  newLabel.className += labelTags[i][1];
  newLabel.innerHTML = labelTags[i][2];
  labels.push(newLabel);
}

//Craeting divs for input fields
let divsInForm = 4;
let divs = [];
for (let i = 0; i < divsInForm; i++) {
  let div = createNewElement("div", "form-group");
  div.appendChild(labels[i]);
  div.appendChild(inputs[i]);
  myForm.appendChild(div);
  divs.push(div);
}

//Creating table for contacts

let myTable, tblHead, tblRow, tblBody;
myTable = createNewElement("table", "contacts-table");
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

/**
 * Adding a table row
 *
 *
 */

const refreshContactInfo = () => {
  let elem = document.querySelector(".intro-contact");
  let heading = document.querySelector(".intro-contact-heading");
  let phoneNumber = document.querySelector(".intro-contact-phone");
  let email = document.querySelector(".intro-contact-email");

  elem.removeChild(heading);
  elem.removeChild(phoneNumber);
  elem.removeChild(email);
};

const refreshTable = id => {
  //   let row = document.querySelector(".row-contact");
  let list = document.querySelector(id);
  list.innerHTML = "";
  //   for (let i = num; i < num.length; i++) {
  //     list.removeChild(row);
  //   }
};
const introContact = contact => {
  let elem = document.querySelector(".intro-contact");
  let heading = createNewElement("h2", "intro-contact-heading");
  let phoneNumber = createNewElement("p", "intro-contact-phone");
  let email = createNewElement("p", "intro-contact-email");
  heading.innerHTML = contact.name;
  phoneNumber.innerHTML = contact.number;
  email.innerHTML = contact.email;
  elem.appendChild(heading);
  elem.appendChild(phoneNumber);
  elem.appendChild(email);
};

const addTableRowInHistory = (item, id) => {
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

const addTableRow = (item, id) => {
  let list = document.querySelector(id);
  let tableName = document.createElement("td");
  let tablePhone = document.createElement("td");
  let tableEmail = document.createElement("td");
  let tableButton1 = document.createElement("td");
  let tableButton2 = document.createElement("td");
  let tableButton3 = document.createElement("td");

  let buttonEdit = document.createElement("button");
  buttonEdit.className += "edit";

  let buttonInfo = document.createElement("button");
  buttonInfo.className += "info";

  let buttonDelete = document.createElement("button");
  buttonDelete.className += "delete";
  tableButton1.appendChild(buttonEdit);
  tableButton2.appendChild(buttonDelete);
  tableButton3.appendChild(buttonInfo);

  buttonDelete.innerHTML = "X";
  buttonEdit.innerHTML = "edit";

  buttonInfo.innerHTML = "Info";

  tableName.innerHTML = item.name;
  tablePhone.innerHTML = item.number;
  tableEmail.innerHTML = item.email;
  let row = document.createElement("tr");
  row.setAttribute("id", item.id);
  row.appendChild(tableName);
  row.appendChild(tablePhone);
  row.appendChild(tableEmail);
  row.appendChild(tableButton1);
  row.appendChild(tableButton2);
  row.appendChild(tableButton3);

  list.appendChild(row);
};

document.body.append(header);

document.body.append(main);

/**
 * Adding contacts to the DOM
 */

const addContact = contact => {
  let list = document.querySelector("#contact-list");
  let row = document.createElement("tr");
  row.setAttribute("id", contact.id);
  row.innerHTML = `
  <td>${contact.name}</td>
    <td>${contact.number}</td>
    <td>${contact.email}</td>
    <td>
    <button class="edit">Edit</button>
  </td>
  <td><button class="delete">X</button></td>
  <td><button class="info">Info</button></td>
  `;

  list.appendChild(row);
};

{
  /* <i class="edit far fa-edit icon "></i> */
}

/***
 * Displaying contacts from localStorage
 */

const displayContacts = () => {
  store.map(item => {
    addTableRow(item, "#contact-list");
  });
};

/**
 * Clearing input fields after adding values to the DOM
 */

const clearFields = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#number").value = "";
  document.querySelector("#email").value = "";
};

/**
 * Removing contacts from the DOM
 */

const deleteContact = elem => {
  if (elem.classList.contains("delete")) {
    elem.parentElement.parentElement.remove();
  }
};

//submitting

// function toSubmit(name, phone, email) {
//   let newContact = new Contact(name, phone, email);
//   console.log(newContact);
//   return newContact;
// }

// // form.onsubmit =
// // button.onclick(form.submit());
// // console.log(form.submit());

// myForm.addEventListener("submit", e => {
//   e.preventDefault();

//   toSubmit(inputs[0].value, inputs[1].value, inputs[2].value);
//   myForm.reset();
// });

/**
 * Adding event listeners
 * and creating new contact
 */

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

// getDate = () => {
//   let dateObj = new Date();
//   let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
//   let dateNum = ("0" + dateObj.getDate()).slice(-2);
//   let year = dateObj.getFullYear();
//   let date = year + "/" + month + "/" + dateNum;
//   return date;
// };
/**
 * Adding new contact to local storage, on submit
 */

let listener = listen("submit", ".contacts-form", e => {
  e.preventDefault();
  console.log("you clicke submit");
  const name = document.querySelector("#name").value;
  const number = document.querySelector("#number").value;
  const email = document.querySelector("#email").value;
  const id = ID();
  const date = new Date().toLocaleString();
  console.log(date, "date");
  const contact = new Contact(id, date, name, number, email);
  console.log(contact, "contact");
  //   myContacts.list = [{ ...contact }];
  store.push(contact);
  store.save();
  addContact(contact);
  clearFields();
});

const findID = id => {
  let result = store.find(contact => {
    return contact.id === id;
  });
  return result;
};

// const findTimestamp = date => {
//     let result = store.find(contact =>)
// }
/**
 * Removing contacts from the DOM
 * Deleting contact from local storage, on click
 */

let listener2 = listen("click", ".delete", e => {
  deleteContact(e.target);
  console.log("from delete");
  let elem = e.target;
  if (elem.classList.contains("delete")) {
    let targetId = elem.parentElement.parentElement.id;
    let itemToDelete = findID(targetId);
    // console.log(itemToDelete, "toDelete");
    let index = store.indexOf(itemToDelete);
    store.splice(index, 1);
    store.save();
  }
});

//Navigating on edit
//on edit sent to different route
// let onEdit = listen("click", ".edit", e => {
//   onNavigate("/contact");

//   console.log("edit");
//   console.log(e.target, "event");
//   console.log(e.target.parentElement.parentElement);
//   let id = e.target.parentElement.parentElement.id;
//   let contactToShow = findID(id);
//   console.log(contactToShow);
//   let heading = createNewElement("h2", "heading-contact");
//   heading.innerHTML = contactToShow.name;

//   addTableRow(contactToShow, ".contact-history");
// });

let closeButton = document.querySelector(".close-button");

const editContact = listen("click", ".edit", e => {
  //   console.log(e.target, "target");
  console.log(e.target.parentElement.parentElement.id);
  let id = e.target.parentElement.parentElement.id;
  toggleModal(id);
  let contactToEdit = findID(id);
  //   console.log(contactToEdit);
  inputsModal[0].value = contactToEdit.name;
  inputsModal[1].value = contactToEdit.number;
  inputsModal[2].value = contactToEdit.email;
  //   console.log(inputsModal[0].value, "value1");
  //   console.log(inputsModal[1].value, "value2");
  //   console.log(inputsModal[2].value, "value3");
});

const saveEdit = listen("submit", ".form-modal", e => {
  e.preventDefault();

  let id = e.target.parentElement.parentElement.id;
  //   console.log(e.target, "target");
  let contactToEdit = findID(id);
  //   console.log(contactToEdit, " already existing contact");
  if (
    inputsModal[0].value === contactToEdit.name &&
    inputsModal[1].value === contactToEdit.number &&
    inputsModal[2].value === contactToEdit.email
  ) {
    return;
  } else {
    // historyList = [{ ...contactToEdit }];
    let editedContact = {
      id: contactToEdit.id,
      date: new Date().toLocaleString(),
      name: inputsModal[0].value,
      number: inputsModal[1].value,
      email: inputsModal[2].value
    };

    console.log(contactToEdit, "contacttttttttttt");

    contactToEdit.history = [...contactToEdit.history, { ...editedContact }];
    // contactToEdit.history = [
    //   ...contactToEdit.history,
    //   { ...contactToEdit },
    //   { ...editedContact }
    // ];

    //history functioning
    // console.log(contactToEdit, "beneath history");

    //MAKE THIS BETTER
    let newVersion = Object.assign(contactToEdit, editedContact);
    // contactToEdit.history = [{ ...contactToEdit }]; funkar
    // console.log(contactToEdit, "to edtis");
    // console.log(contactToEdit.history, "history");
    let index = store.indexOf(contactToEdit);
    let changeValue = document.getElementById(id);
    changeValue.children[0].innerHTML = newVersion.name;
    changeValue.children[1].innerHTML = newVersion.number;
    changeValue.children[2].innerHTML = newVersion.email;
    store.splice(index, 1, newVersion);
    store.save();
  }
  toggleModal("");
});

//history
const showInfo = listen("click", ".info", e => {
  onNavigate("/contact");

  //   console.log(e.target, "event");
  //   console.log(e.target.parentElement.parentElement);
  let id = e.target.parentElement.parentElement.id;
  let contactToShow = findID(id);
  //   console.log(contactToShow);
  let content = document.querySelector(".container-contact");
  //   console.log(content);

  introContact(contactToShow);
  //   console.log(contactToShow.history);
  let history = contactToShow.history;
  history.map(item => {
    addTableRowInHistory(item, ".contact-history");
  });
  //   addTableRow(contactToShow, ".contact-history");

  //add here that the last in list (history) shows
});

//reseting

const findTimestamp = () => {};

const resetContact = listen("click", ".reset", e => {
  let id = e.target.parentElement.parentElement.id;
  let timestamp =
    e.target.parentElement.parentElement.childNodes[0].textContent;
  let contactToShow = findID(id);
  let history = contactToShow.history;
  let found = history.find(contact => {
    return contact.date === timestamp;
  });

  //last one -- need later for pointer
  //   let currentContactIndex = history.length - 1;

  //   let currentContact = history[currentContactIndex];

  //update histort with resetted contact
  contactToShow.history = [...contactToShow.history, { ...found }];
  store.save();
  refreshContactInfo();
  refreshTable(".contact-history");
  let elem = document.querySelector(".intro-contact");
  let alertInfo = createNewElement("p", "alertInfo");
  alertInfo.innerHTML = "Updated";
  elem.append(alertInfo);
  introContact(found);
  setTimeout(() => {
    alertInfo.style.display = "none";
  }, 3000);

  contactToShow.history.map(item => {
    addTableRowInHistory(item, ".contact-history");
  });
});

//create render view!!!!!!!!
