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

// const contactPrototype = {
//   name: [],
//   phone: [],
//   email: []
// };

// function Contact(name, phone, email) {
//   let newContact = Object.create(contactPrototype);
//   newContact.name = name;
//   newContact.phone = phone;
//   newContact.email = email;
//   return newContact;
// }

/***********
 * Classes
 */
// class ContactsBook {
//   list = [];
// }

// let myContacts = new ContactsBook();
// console.log(myContacts, "contacts");

class Contact {
  constructor(id, name, number, email) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.email = email;
    this.history = [];
  }
}

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
view.setAttribute("id", "view");
let headingView = createNewElement("h1", "");
headingView.innerHTML = `<i class="fas fa-book-open text-primary"></i
> View</span>List
`;
view.appendChild(headingView);
let containerContact = createNewElement("div", "container-contact");

let contactTable, conTblHead, conTblRow, conTblBody;
contactTable = createNewElement("table", "contact-history");
conTblHead = document.createElement("thead");
conTblRow = document.createElement("tr");
conTblBody = document.createElement("tbody");
conTblBody.id = "contact-history";
conTblHead.append(conTblRow);
contactTable.append(conTblHead, conTblBody);
let thNumer = 5;
let tableItems = [];
for (let i = 0; i < thNumer; i++) {
  let tableItem = document.createElement("th");
  conTblRow.appendChild(tableItem);
  tableItems.push(tableItem);
}
tableItems[0].innerHTML = "Name";
tableItems[1].innerHTML = "Phone";
tableItems[2].innerHTML = "Email";

containerContact.append(contactTable);
view.append(containerContact);

main.append(view);

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
 */

const addTableRow = (item, id) => {
  let list = document.querySelector(id);
  let tableName = document.createElement("td");
  let tablePhone = document.createElement("td");
  let tableEmail = document.createElement("td");
  let tableButton1 = document.createElement("td");
  let tableButton2 = document.createElement("td");
  let buttonEdit = document.createElement("button");
  buttonEdit.className += "edit";
  let buttonDelete = document.createElement("button");
  buttonDelete.className += "delete";
  tableButton1.appendChild(buttonEdit);
  tableButton2.appendChild(buttonDelete);
  buttonDelete.innerHTML = "X";
  buttonEdit.innerHTML = "Edit";
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

displayContacts();

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

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
  const contact = new Contact(id, name, number, email);
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

//on edit sent to different route
let onEdit = listen("click", ".edit", e => {
  onNavigate("/contact");

  console.log("edit");
  console.log(e.target, "event");
  console.log(e.target.parentElement.parentElement);
  let id = e.target.parentElement.parentElement.id;
  let contactToShow = findID(id);
  console.log(contactToShow);
  let heading = createNewElement("h2", "heading-contact");
  heading.innerHTML = contactToShow.name;

  addTableRow(contactToShow, ".contact-history");
});

// / let headingView = createNewElement("h1", "");
// headingView.innerHTML = `<i class="fas fa-book-open text-primary"></i
// > View</span>List
// `;
// view.appendChild(headingView);

//write again view component so that it shows on edit
