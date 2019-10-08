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

//Class
class Contact {
  constructor(name, number, email) {
    this.name = name;
    this.number = number;
    this.email = email;
  }
}

//create markup

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
>My<span>Contact</span>List
`;
myForm = createNewElement("form", "contacts-form");
container.append(mainHeading, myForm);
main.append(container);

//Add inputs to the form
const createLabels = id => {
  let label = document.createElement("label");
  label.htmlFor = id;
  label.innerHTML = id;
  return label;
};

let inputTags = [
  ["text", "name"],
  ["text", "number"],
  ["email", "email"],
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

let divsInForm = 4;
let divs = [];
for (let i = 0; i < divsInForm; i++) {
  let div = createNewElement("div", "form-group");

  div.appendChild(labels[i]);
  div.appendChild(inputs[i]);

  myForm.appendChild(div);
  //   console.log(div, "div");
  //   let classDiv = document.getElementsByClassName("form-group");
  divs.push(div);
}

//creating table for contacts

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

const addContact = contact => {
  let list = document.querySelector("#contact-list");
  let row = document.createElement("tr");
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

const clearFields = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#number").value = "";
  document.querySelector("#email").value = "";
};

document.querySelector(".contacts-form").addEventListener("submit", e => {
  e.preventDefault();
  //get form values
  const name = document.querySelector("#name").value;
  const number = document.querySelector("#number").value;
  const email = document.querySelector("#email").value;

  //instantiate a book
  const contact = new Contact(name, number, email);
  console.log(contact, "contact");

  addContact(contact);
  clearFields();
});
