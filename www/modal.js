import UI from "./UI.js";
import Store from "./Store.js";

class Modal {
  static renderModal = () => {
    let modal = UI.createNewElement("div", "modal");
    let innerDiv = UI.createNewElement("div", "modal-content");

    let buttonModal = UI.createNewElement("button", "close-button");
    buttonModal.innerHTML = "X";
    let formModal = UI.createNewElement("form", "form-modal");

    let labelTagsModal = [
      ["name", "label-name", "Name"],
      ["phone", "label-name", "Phone"],
      ["email", "label-name", "Email"],
      ["", "", ""]
    ];

    let labelsModal = [];
    for (let i = 0; i < labelTagsModal.length; i++) {
      let newLabel = UI.createLabels(labelTagsModal[i][0]);
      newLabel.className += labelTagsModal[i][1];
      newLabel.innerHTML = labelTagsModal[i][2];
      labelsModal.push(newLabel);
    }

    let divsInFormModal = 4;
    let divsModal = [];
    for (let i = 0; i < divsInFormModal; i++) {
      let div = UI.createNewElement("div", "form-group-modal");
      div.appendChild(labelsModal[i]);
      formModal.appendChild(div);
      divsModal.push(div);
    }
    let buttonSave = UI.createNewElement("button", "save-contact");
    buttonSave.innerHTML = "Save";

    let headingModal = UI.createNewElement("h3", "modal-heading");
    headingModal.innerHTML = "Edit contact";
    let lastDiv = divsModal[3];
    lastDiv.appendChild(buttonSave);
    innerDiv.appendChild(headingModal);
    innerDiv.appendChild(buttonModal);
    innerDiv.append(formModal);
    modal.append(innerDiv);
    document.body.append(modal);
  };

  static toggleModal = id => {
    let modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
    modal.id = id;
  };

  static createModalInputs = contact => {
    let inputName = UI.createInput("text", "name-modal modal-input", "name");
    let divs = [];
    divs = document.querySelectorAll(".form-group-modal");
    inputName.value = contact.name;
    if (Array.isArray(contact.number) && contact.number.length > 1) {
      for (let i = 0; i < contact.number.length; i++) {
        let inputPhone = UI.createInput(
          "text",
          "phone-modal modal-input",
          "phone number"
        );
        let removePhoneButton = UI.createNewElement("span", "remove-phone");
        removePhoneButton.innerHTML = "X";
        let addPhoneButton = UI.createNewElement("span", "add-phone");
        addPhoneButton.innerHTML = "+";
        inputPhone.value = contact.number[i];
        divs[1].appendChild(inputPhone);
        divs[1].appendChild(removePhoneButton);
        divs[1].appendChild(addPhoneButton);
      }
    } else {
      let inputPhone1 = UI.createInput(
        "text",
        "phone-modal modal-input",
        "phone number"
      );
      let removePhoneButton = UI.createNewElement("span", "remove-phone");
      removePhoneButton.innerHTML = "X";
      let addPhoneButton = UI.createNewElement("span", "add-phone");
      addPhoneButton.innerHTML = "+";
      inputPhone1.value = contact.number;
      divs[1].appendChild(inputPhone1);
      divs[1].appendChild(removePhoneButton);
      divs[1].appendChild(addPhoneButton);
    }

    //email

    if (Array.isArray(contact.email) && contact.email.length > 1) {
      for (let i = 0; i < contact.email.length; i++) {
        let inputEmail = UI.createInput(
          "text",
          "email-modal modal-input",
          "email"
        );
        inputEmail.value = contact.email[i];
        let removeEmailButton = UI.createNewElement("span", "remove-email");
        removeEmailButton.innerHTML = "X";
        let addEmailButton = UI.createNewElement("span", "add-email");
        addEmailButton.innerHTML = "+";
        divs[2].appendChild(inputEmail);
        divs[2].appendChild(removeEmailButton);
        divs[2].appendChild(addEmailButton);
      }
    } else {
      let inputEmail1 = UI.createInput(
        "text",
        "email-modal modal-input",
        "email"
      );
      let removeEmailButton = UI.createNewElement("span", "remove-email");
      removeEmailButton.innerHTML = "X";
      let addEmailButton = UI.createNewElement("span", "add-email");
      addEmailButton.innerHTML = "+";
      inputEmail1.value = contact.email;
      divs[2].appendChild(inputEmail1);
      divs[2].appendChild(removeEmailButton);
      divs[2].appendChild(addEmailButton);
    }
    divs[0].appendChild(inputName);
  };

  static showModal = id => {
    this.toggleModal(id);
    let contactToEdit = Store.findID(id);
    this.createModalInputs(contactToEdit);
  };

  static refreshModal = () => {
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
  };

  static saveEditedContact = e => {
    let id = e.target.parentElement.parentElement.id;
    let contactToEdit = Store.findID(id);
    let inputsPhone = [];
    let inputsEmail = [];
    let inputName = document.querySelector(".inputname-modal");
    inputsEmail = document.querySelectorAll(".inputemail-modal");
    inputsPhone = document.querySelectorAll(".inputphone-modal");
    let stable = Array.from(inputsPhone);
    let stableEmail = Array.from(inputsEmail);
    let phoneNumbers = [];
    for (let item of stable) {
      phoneNumbers.push(item.value);
    }
    let emails = [];
    for (let item of stableEmail) {
      emails.push(item.value);
    }
    let comparedPhone;
    if (phoneNumbers.length === contactToEdit.number.length) {
      for (let i = 0; i < phoneNumbers.length; i++) {
        if (phoneNumbers[i] === contactToEdit.number[i]) {
          comparedPhone = "same";
        } else {
          comparedPhone = "different";
          break;
        }
      }
    } else {
      comparedPhone = "different";
    }

    let comparedEmail;
    if (emails.length === contactToEdit.email.length) {
      for (let i = 0; i < emails.length; i++) {
        if (emails[i] === contactToEdit.email[i]) {
          comparedEmail = "same";
        } else {
          comparedEmail = "different";
          break;
        }
      }
    } else {
      comparedPhone = "different";
    }
    if (
      inputName.value === contactToEdit.name &&
      comparedPhone === "same" &&
      comparedEmail === "same"
    ) {
    } else {
      let editedContact = {
        id: contactToEdit.id,
        date: new Date().toLocaleString(),
        name: inputName.value,
        number: [...phoneNumbers],
        email: [...emails]
      };

      contactToEdit.history = [...contactToEdit.history, { ...editedContact }];
      let newVersion = Object.assign(contactToEdit, editedContact);
      Store.editContact(contactToEdit, newVersion);
      let changeValue = document.getElementById(id);
      changeValue.children[0].innerHTML = newVersion.name;
      changeValue.children[1].innerHTML = newVersion.number;
      changeValue.children[2].innerHTML = newVersion.email;
    }
  };
}

export default Modal;
