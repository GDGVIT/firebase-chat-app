//------------------SENDING MESSAGES TO FIRESTORE-----------------------
/*
    Auth

    Check if user signed in => firebase.auth().currentUser

    Firestore

    Retrieve data from collection => firebase.firestore().collection('collectionName')
    To add message => .add() to the reference obtained
*/

//Storing element objects obtained by id in variables
let messageFormElement = document.getElementById("message-form");
let messageInputElement = document.getElementById("message");
let signInSnackbarElement = document.getElementById("must-signin-snackbar");
let submitButtonElement = document.getElementById("submit");

//-----------------event listeners----------------------
messageFormElement.addEventListener("submit", onMessageFormSubmit);
messageInputElement.addEventListener("keyup", toggleButton);
messageInputElement.addEventListener("change", toggleButton);

//--------------------functions--------------------------
function checkSignedInWithMessage() {}

function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute("disabled");
  } else {
    submitButtonElement.setAttribute("disabled", "true");
  }
}

function onMessageFormSubmit(e) {
  e.preventDefault();
  if (messageInputElement.value && checkSignedInWithMessage()) {
    saveMessage(messageInputElement.value).then(function () {
      messageInputElement.value = "";
      toggleButton();
    });
  }
}

//add message on firestore messages collection
function saveMessage(messageText) {}
