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
let submitButtonElement = document.getElementById("submit");

//-----------------event listeners----------------------
messageFormElement.addEventListener("submit", onMessageFormSubmit);
messageInputElement.addEventListener("keyup", toggleButton);
messageInputElement.addEventListener("change", toggleButton);

//--------------------functions-------------------------

function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (firebase.auth().currentUser) {
    return true;
  }
  window.alert("You must sign in first");
  return false;
}

function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute("disabled");
  } else {
    submitButtonElement.setAttribute("disabled", "true");
  }
}

function onMessageFormSubmit(e) {
  e.preventDefault();
  console.log(messageInputElement.value);
  if (checkSignedInWithMessage()) {
    if (messageInputElement.value) {
      saveMessage(messageInputElement.value);
    }
  }
}

//add message on firestore messages collection
function saveMessage(messageText) {
  const db = firebase.firestore().collection("messages");
  db.add({
    name: getUserName(),
    text: messageText,
    profilePicUrl: getProfilePicUrl(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
    .then(function () {
      console.log("Data has been added on firestore");
      messageInputElement.value = "";
      toggleButton();
    })
    .catch(function (err) {
      console.log(err);
    });
}
