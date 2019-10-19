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

container.append(mainHeading);

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
  onNavigate("/");
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

const createInput = (type, name, placeholder) => {
  let input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.className += "form-input" + " input" + name;
  //   input.id = name;
  input.placeholder = "Add " + placeholder;
  return input;
};

const createForm = () => {
  myForm = createNewElement("form", "contacts-form");
  container.append(mainHeading, myForm);
  //Creating inputs
  let inputTags = [
    ["text", "name", "name"],
    ["text", "number", "phone number"],
    ["text", "email", "email"],
    ["submit", "add-contact", ""]
  ];

  let inputs = [];

  for (let i = 0; i < inputTags.length; i++) {
    let newInput = createInput(
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
};
createForm();

let neededDiv = main.querySelectorAll(".form-group");
// console.log(neededDiv[0], "div");
let addPhoneButton = createNewElement("span", "add-phone");
addPhoneButton.innerHTML = "+";
let addEmailButton = createNewElement("span", "add-email");

addEmailButton.innerHTML = "+";

neededDiv[1].appendChild(addPhoneButton);
neededDiv[2].appendChild(addEmailButton);

const addMorePhones = listen("click", ".add-phone", e => {
  console.log(e.target.parentElement);
  let elem = e.target.parentElement;
  //   let elem = document.querySelector(".parent-add-phone");
  let inputField = createInput("text", "number", "phone number");
  inputField.className += " inputphone-modal modal-input";

  let removePhoneButton = createNewElement("span", "remove-phone");
  removePhoneButton.innerHTML = "X";

  elem.appendChild(inputField);
  elem.appendChild(removePhoneButton);
});

const addMoreEmails = listen("click", ".add-email", e => {
  console.log(e.target.parentElement);
  let elem = e.target.parentElement;
  //   let elem = document.querySelector(".parent-add-email");

  let inputField = createInput("text", "email", "email");
  inputField.className += " inputemail-modal modal-input";
  let removeEmailButton = createNewElement("span", "remove-email");
  removeEmailButton.innerHTML = "X";

  elem.appendChild(inputField);
  elem.appendChild(removeEmailButton);
});
//Creating table for contacts

const deleteAddPhone = listen("click", ".remove-phone", e => {
  let elem = e.target.previousSibling;
  let elem2 = e.target;
  //   let elem3 = e.target.nextSibling;
  //   console.log(e.target.nextSibling);
  elem.remove();
  elem2.remove();
  //   elem3.remove();
});

const deleteAddEmail = listen("click", ".remove-email", e => {
  let elem = e.target.previousSibling;
  let elem2 = e.target;
  //   let elem3 = e.target.nextSibling;
  elem.remove();
  elem2.remove();
  //   elem3.remove();
});

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
  let row = document.createElement("tr");
  let tablePhone = document.createElement("td");

  let tableName = document.createElement("td");
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
  for (let i = 0; i < item.number.length; i++) {
    if (Array.isArray(item.number)) {
      let additional = document.createElement("td");
      additional.innerHTML = item.number[i];
      let mybr = document.createElement("br");
      tablePhone.appendChild(mybr);
      tablePhone.append(additional);
    } else {
      tablePhone.innerHTML = item.number;
    }

    // let breakEl = document.createElement("BR");
    // tablePhone.innerHTML.append(breakEl);
  }

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

document.body.append(header);

document.body.append(main);
let submitButton = main.querySelector("#add-contact");
submitButton.className += " add-contact";
console.log(submitButton, "submitbutton");
/**
 * Adding contacts to the DOM
 */

const addContact = contact => {
  addTableRow(contact, "#contact-list");
  //   let list = document.querySelector("#contact-list");
  //   let row = document.createElement("tr");
  //   row.setAttribute("id", contact.id);
  //   row.innerHTML = `
  //   <td>${contact.name}</td>
  //     <td>${contact.number}</td>
  //     <td>${contact.email}</td>
  //     <td>
  //     <button class="edit">Edit</button>
  //   </td>
  //   <td><button class="delete">X</button></td>
  //   <td><button class="info">Info</button></td>
  //   `;

  //   list.appendChild(row);
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
  let input = [];
  input = document.querySelectorAll(".form-input");

  let inputs = Array.from(input);

  for (let item of inputs) {
    item.value = "";
  }
  console.log(inputs.length);
  let lastIndex = inputs.length - 1;
  inputs[lastIndex].value = "Save contact";
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

let listener = listen("click", ".add-contact", e => {
  e.preventDefault();
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
    console.log(item.value, "item");
    emailAdress = [...emailAdress, ...[item.value]];
  }
  console.log(emailAdress);
  //   let email = document.querySelector(".inputemail").value;
  let id = ID();
  let date = new Date().toLocaleString();
  console.log(date, "date");
  let contact = new Contact(id, date, name, phoneNumber, emailAdress);
  //   myContacts.list = [{ ...contact }];
  store.push(contact);
  //   contact.history = [...contact.history, { ...contact }];

  store.save();
  addContact(contact);
  console.log(contact, "contact");
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
  //   inputsModal[0].value = contactToEdit.name;
  //   inputsModal[1].value = contactToEdit.number;
  //   inputsModal[2].value = contactToEdit.email;
  createModalInputs(contactToEdit);

  //   console.log(inputsModal[0].value, "value1");
  //   console.log(inputsModal[1].value, "value2");
  //   console.log(inputsModal[2].value, "value3");
});

const createModalInputs = contact => {
  console.log(contact, "contact");
  let inputName = createInput("text", "name-modal modal-input", "name");

  let divs = [];
  divs = document.querySelectorAll(".form-group-modal");

  inputName.value = contact.name;

  if (Array.isArray(contact.number) && contact.number.length > 1) {
    for (let i = 0; i < contact.number.length; i++) {
      let inputPhone = createInput(
        "text",
        "phone-modal modal-input",
        "phone number"
      );
      let removePhoneButton = createNewElement("span", "remove-phone");
      removePhoneButton.innerHTML = "X";
      let addPhoneButton = createNewElement("span", "add-phone");
      addPhoneButton.innerHTML = "+";
      inputPhone.value = contact.number[i];

      divs[1].appendChild(inputPhone);

      divs[1].appendChild(removePhoneButton);
      divs[1].appendChild(addPhoneButton);
    }
  } else {
    let inputPhone1 = createInput(
      "text",
      "phone-modal modal-input",
      "phone number"
    );
    let removePhoneButton = createNewElement("span", "remove-phone");
    removePhoneButton.innerHTML = "X";
    let addPhoneButton = createNewElement("span", "add-phone");
    addPhoneButton.innerHTML = "+";
    inputPhone1.value = contact.number;
    divs[1].appendChild(inputPhone1);
    divs[1].appendChild(removePhoneButton);
    divs[1].appendChild(addPhoneButton);

    console.log(divs[1], "div");
  }

  //email

  if (Array.isArray(contact.email) && contact.email.length > 1) {
    for (let i = 0; i < contact.email.length; i++) {
      let inputEmail = createInput("text", "email-modal modal-input", "email");
      inputEmail.value = contact.email[i];
      let removeEmailButton = createNewElement("span", "remove-email");
      removeEmailButton.innerHTML = "X";
      let addEmailButton = createNewElement("span", "add-email");
      addEmailButton.innerHTML = "+";
      divs[2].appendChild(inputEmail);
      divs[2].appendChild(removeEmailButton);
      divs[2].appendChild(addEmailButton);
    }
  } else {
    let inputEmail1 = createInput("text", "email-modal modal-input", "email");
    let removeEmailButton = createNewElement("span", "remove-email");
    removeEmailButton.innerHTML = "X";
    let addEmailButton = createNewElement("span", "add-email");
    addEmailButton.innerHTML = "+";
    inputEmail1.value = contact.email;
    divs[2].appendChild(inputEmail1);
    divs[2].appendChild(removeEmailButton);
    divs[2].appendChild(addEmailButton);
  }

  divs[0].appendChild(inputName);

  // console.log(neededDiv[0], "div");
};

refreshModal = () => {
  let inputsToDelete = [];
  inputsToDelete = document
    .querySelectorAll(".modal-input")
    .forEach(e => e.parentNode.removeChild(e));
  let modal = document.querySelector(".modal");

  let buttonToDelete = modal
    .querySelectorAll(".add-phone")
    .forEach(e => e.parentNode.removeChild(e));

  let buttonToDelete2 = modal
    .querySelectorAll(".add-email")
    .forEach(e => e.parentNode.removeChild(e));
  let buttonToDelete3 = modal
    .querySelectorAll(".remove-email")
    .forEach(e => e.parentNode.removeChild(e));
  let buttonToDelete4 = modal
    .querySelectorAll(".remove-phone")
    .forEach(e => e.parentNode.removeChild(e));
  //   buttonToDelete.parentNode.removeChild(buttonToDelete);

  //   buttonToDelete.remove();
  //   buttonToDelete2.remove();
  //   console.log(inputsToDelete, "inputs");
  //   inputsToDelete.remove();

  //   elem.parentNode.removeChild(elem);
};

////

// let numbers = [];
// numbers = main.querySelectorAll(".inputnumber");

// let phoneNumber = [];

// let stable = Array.from(numbers);

// for (let item of stable) {
//   phoneNumber = [...phoneNumber, ...[item.value]];
// }

const saveEdit = listen("submit", ".form-modal", e => {
  e.preventDefault();
  //   //   refreshModal();

  let id = e.target.parentElement.parentElement.id;

  let contactToEdit = findID(id);
  let inputsPhone = [];
  let inputsEmail = [];

  let inputName = document.querySelector(".inputname-modal");
  inputsEmail = document.querySelectorAll(".inputemail-modal");
  inputsPhone = document.querySelectorAll(".inputphone-modal");
  let stable = Array.from(inputsPhone);
  let stableEmail = Array.from(inputsEmail);

  //   console.log(stable, "phones");
  //   let phoneNumbers = [];
  let phoneNumbers = [];
  for (let item of stable) {
    // console.log(item.value, "phone");
    phoneNumbers.push(item.value);
    console.log(item.value, "item");
  }
  console.log(stable, "after loop");

  let emails = [];
  for (let item of stableEmail) {
    emails.push(item.value);
  }

  //   console.log(phoneNumbers.length, "nums lengt");
  //   console.log(contactToEdit.number.length, "numsedit lengt");

  let comparedPhone;
  //   let comparedEmail = false;
  if (phoneNumbers.length === contactToEdit.number.length) {
    console.log(phoneNumbers, "numbers");
    for (let i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i] === contactToEdit.number[i]) {
        //   if (phoneNumbers === contactToEdit.number) {
        comparedPhone = "same";
      } else {
        comparedPhone = "different";
        break;
      }
    }
  } else {
    console.log("went to else");

    comparedPhone = "different";
  }

  let comparedEmail;

  if (emails.length === contactToEdit.email.length) {
    console.log("if sats");
    for (let i = 0; i < emails.length; i++) {
      console.log("loop");
      if (emails[i] === contactToEdit.email[i]) {
        comparedEmail = "same";
      } else {
        comparedEmail = "different";
        break;
      }
    }
  } else {
    console.log("went to else");

    comparedPhone = "different";
  }

  if (
    inputName.value === contactToEdit.name &&
    comparedPhone === "same" &&
    comparedEmail === "same"
  ) {
    console.log("SAMEEEEEEEEEE");
  } else {
    console.log("diffffffffffffffff");

    // historyList = [{ ...contactToEdit }];
    console.log(phoneNumbers, "nums");
    let editedContact = {
      id: contactToEdit.id,
      date: new Date().toLocaleString(),
      name: inputName.value,
      number: [...phoneNumbers],
      email: [...emails]
    };
    console.log(editedContact);

    // console.log(contactToEdit, "contacttttttttttt");

    contactToEdit.history = [...contactToEdit.history, { ...editedContact }];

    console.log(contactToEdit, "the contact");

    // contactToEdit.history = [
    //   ...contactToEdit.history,
    //   { ...contactToEdit },
    //   { ...editedContact }
    // ];

    //history functioning
    // console.log(contactToEdit, "beneath history");

    //MAKE THIS BETTER
    let newVersion = Object.assign(contactToEdit, editedContact);
    console.log(newVersion, "new ");
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
    refreshModal();
  }

  toggleModal("");
});

//trying to get values from inputs
// loop for numbers and asve as array

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
  let copy = { ...found };
  copy.date = new Date().toLocaleString();
  //   console.log(copy, "copy");
  //   found.date = new Date().toLocaleString();
  contactToShow.history = [...contactToShow.history, { ...copy }];
  //   contactToShow = { ...found };
  let newVersion = Object.assign(contactToShow, copy);
  let index = store.indexOf(contactToShow);

  store.splice(index, 1, newVersion);
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

  newVersion.history.map(item => {
    addTableRowInHistory(item, ".contact-history");
  });
});

//create render view!!!!!!!!
