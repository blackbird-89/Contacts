//modal

let modal = createNewElement("div", "modal");
let innerDiv = createNewElement("div", "modal-content");

let buttonModal = createNewElement("button", "close-button");
buttonModal.innerHTML = "X";
let formModal = createNewElement("form", "form-modal");

let inputsModalTags = [
  ["text", "name"],
  ["text", "number"],
  ["text", "email"],
  ["submit", "save-contact", ""]
];

let inputsModal = [];

for (let i = 0; i < inputsModalTags.length; i++) {
  let newInput = createInput(inputsModalTags[i][0], inputsModalTags[i][1]);
  inputsModal.push(newInput);
}

inputsModal[3].value = "Save";

let labelTagsModal = [
  ["name", "label-name", "Name"],
  ["phone", "label-name", "Phone"],
  ["email", "label-name", "Email"],
  ["", "", ""]
];

let labelsModal = [];
for (let i = 0; i < labelTagsModal.length; i++) {
  let newLabel = createLabels(labelTagsModal[i][0]);
  newLabel.className += labelTagsModal[i][1];
  newLabel.innerHTML = labelTagsModal[i][2];
  labelsModal.push(newLabel);
}

//Craeting divs for input fields
let divsInFormModal = 4;
let divsModal = [];
for (let i = 0; i < divsInForm; i++) {
  let div = createNewElement("div", "form-group-modal");
  div.appendChild(labelsModal[i]);
  div.appendChild(inputsModal[i]);
  formModal.appendChild(div);
  divsModal.push(div);
}

let headingModal = createNewElement("h3", "modal-heading");
headingModal.innerHTML = "Edit contact";

innerDiv.appendChild(headingModal);
innerDiv.appendChild(buttonModal);
innerDiv.append(formModal);

modal.append(innerDiv);
document.body.append(modal);

const toggleModal = id => {
  modal.classList.toggle("show-modal");
  modal.id = id;
};

const closeModal = listen("click", ".close-button", () => {
  toggleModal("");
});
