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

let header, main, footer;

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
class ContactsBook {
  list = [];
}

let myContacts = new ContactsBook();
console.log(myContacts, "contacts");

class Contact {
  constructor(id, name, number, email) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.email = email;
  }
}

/***********
 * Creating markup
 */

const createNewElement = (elem, className) => {
  let newEl = document.createElement(elem);
  newEl.className += className;
  return newEl;
};

main = document.createElement("main");

//Create main heading and form
let container, mainHeading, myForm;
container = createNewElement("div", "container");
mainHeading = createNewElement("h1", "");
mainHeading.innerHTML = `<i class="fas fa-book-open text-primary"></i
> My<span>Contact</span>List
`;
myForm = createNewElement("form", "contacts-form");
container.append(mainHeading, myForm);
main.append(container);

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
    <button class="edit"><i class="far fa-edit icon"></i></button>
  </td>
  <td><button class="delete">X</button></td>
  `;

  list.appendChild(row);
};

const displayContacts = () => {
  let list = document.querySelector("#contact-list");

  store.map(item => {
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
    buttonEdit.innerHTML = `<i class="far fa-edit icon"></i>`;
    tableName.innerHTML = item.name;
    tablePhone.innerHTML = item.number;
    tableEmail.innerHTML = item.email;
    let row = document.createElement("tr");

    row.appendChild(tableName);
    row.appendChild(tablePhone);
    row.appendChild(tableEmail);
    row.appendChild(tableButton1);
    row.appendChild(tableButton2);

    list.appendChild(row);
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

document.body.append(main);

//submittting

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

// let phoneBook = [];

/**
 * Adding event listeners
 * and creating new contact
 */

displayContacts();

let ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

document.querySelector(".contacts-form").addEventListener("submit", e => {
  e.preventDefault();
  //get form values
  const name = document.querySelector("#name").value;
  const number = document.querySelector("#number").value;
  const email = document.querySelector("#email").value;

  //instantiate a contact
  const id = ID();
  const contact = new Contact(id, name, number, email);
  // phoneBook = [...phoneBook, { ...contact }];

  myContacts.list = [{ ...contact }];

  console.log(myContacts);

  store.push(contact);
  store.save();

  addContact(contact);
  clearFields();
});

/**
 * Removing contacts from the DOM
 * event listener
 */
document.querySelector(".contacts-table").addEventListener("click", e => {
  deleteContact(e.target);

  let elem = e.target;

  if (elem.classList.contains("delete")) {
    let targetId = elem.parentElement.parentElement.id;
    console.log(targetId, "id");
    return store.filter(contact => {
      for (let value of Object.values(contact)) {
        if (value.includes(targetId)) {
          console.log(contact, "value");
          store.removeItem(contact);
          return true;
        }
      }
    });
  } else {
    return;
  }
});
