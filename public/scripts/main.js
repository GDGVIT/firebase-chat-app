// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (
    !window.firebase ||
    !(firebase.app instanceof Function) ||
    !firebase.app().options
  ) {
    window.alert(
      "You have not configured and imported the Firebase SDK. " +
        "Make sure you go through the codelab setup instructions and make " +
        "sure you are running the codelab using `firebase serve`"
    );
  }
}

// Checks that Firebase has been imported.
checkSetup();

//-----------------------FIREBASE FUNCTIONS--------------------------

//div referecnes
let userPicElement = document.getElementById("user-pic");
let userNameElement = document.getElementById("user-name");
let signInButtonElement = document.getElementById("sign-in");
let signOutButtonElement = document.getElementById("sign-out");

let messageFormElement = document.getElementById("message-form");
let messageInputElement = document.getElementById("message");
let signInSnackbarElement = document.getElementById("must-signin-snackbar");
let submitButtonElement = document.getElementById("submit");

let imageButtonElement = document.getElementById("submitImage");
let imageFormElement = document.getElementById("image-form"); //for resetting file
let mediaCaptureElement = document.getElementById("mediaCapture");
let LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";

let messageListElement = document.getElementById("messages");

//event listeners
signInButtonElement.addEventListener("click", signIn);
signOutButtonElement.addEventListener("click", signOut);
messageFormElement.addEventListener("submit", onMessageFormSubmit);
messageInputElement.addEventListener("keyup", toggleButton);
messageInputElement.addEventListener("change", toggleButton);

imageButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener("change", onMediaFileSelected);

//---------------------Authentication Section------------------------------
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}

//get profile URL
function getProfilePicUrl() {}

//get username of the user who is authenticated
function getUserName() {}

function authStateObserver(user) {
  //acts as a listener
  if (user) {
    //if user signed in
    let profilePicUrl = getProfilePicUrl();
    let userName = getUserName();
    //set the user's profile in html
    userPicElement.style.backgroundImage =
      "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";

    userNameElement.textContent = userName;

    //remove hidden attributes
    userPicElement.removeAttribute("hidden");
    userNameElement.removeAttribute("hidden");
    signOutButtonElement.removeAttribute("hidden");

    //hide sign in
    signInButtonElement.setAttribute("hidden", "true");

    saveMessagingDeviceToken();
  } else {
    userPicElement.setAttribute("hidden", "true");
    userNameElement.setAttribute("hidden", "true");
    signOutButtonElement.setAttribute("hidden", "true");

    //show sign-in
    signInButtonElement.removeAttribute("hidden");
  }
}

//initialize firebase auth to listen to state changes
function initializeFirebaseAuth() {}

//sign in using firebase googleoauth. ensure google oauth is enabled
function signIn() {}

//signout the user
function signOut() {}

//-----------------------Messages Section-----------------------------
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

//--------------------Images Section------------------------------------
function onMediaFileSelected(event) {
  event.preventDefault();
  let file = event.target.files[0];
  imageFormElement.reset();

  if (!file.type.match("image.*")) {
    window.alert("You can only share images");
    return;
  }
  if (checkSignedInWithMessage()) {
    saveImageMessage(file);
  }
}

//create temporary message on firestore until image is uploaded and then update it
function saveImageMessage(file) {}

//-----------------------Load Images and Messages------------------------
//load the recent 12 messages and add listener to document for changes
//when changes are detected modify the UI
function loadMessages() {}

function deleteMessage(id) {
  let div = document.getElementById(id);
  if (div) {
    div.parentNode.removeChild(div);
  }
}

let MESSAGE_TEMPLATE =
  '<div class="message-container">' +
  '<div class="pic"></div>' +
  '<div class="message-box">' +
  '<div class="message"></div>' +
  '<div class="name"></div>' +
  "</div>" +
  "</div>";

function createAndInsertMessage(id, timestamp) {
  const container = document.createElement("div");
  container.innerHTML = MESSAGE_TEMPLATE;

  const div = container.firstChild;
  div.setAttribute("id", id);

  timestamp = timestamp ? timestamp.toMillis() : Date.now();
  div.setAttribute("timestamp", timestamp);

  const existingMessages = messageListElement.children;

  if (existingMessages.length === 0) {
    messageListElement.appendChild(div);
  } else {
    let messageListNode = existingMessages[0];
    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute("timestamp");
      if (!messageListNodeTime) {
        throw new Error(
          `Child ${messageListNode.id} has no 'timestamp' attribute`
        );
      }
      if (messageListNodeTime > timestamp) {
        break;
      }
      messageListNode = messageListNode.nextSibling;
    }
    messageListElement.insertBefore(div, messageListNode);
  }

  return div;
}

function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
  let div =
    document.getElementById(id) || createAndInsertMessage(id, timestamp);

  if (picUrl) {
    div.querySelector(".pic").style.backgroundImage =
      "url(" + addSizeToGoogleProfilePic(picUrl) + ")";
  }

  div.querySelector(".name").textContent = name;
  let messageElement = div.querySelector(".message");

  if (text) {
    messageElement.textContent = text;
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, "<br>");
  } else if (imageUrl) {
    var image = document.createElement("img");
    image.src = imageUrl + "&" + new Date().getTime();
    messageElement.innerHTML = "";
    messageElement.appendChild(image);
  }
}

//--------------------------Notifications Section--------------------------
//called whenever user authenticates
//get firebase cloud messaging(fcm) token to send notifications and
//store it in firestore
function saveMessagingDeviceToken() {}

//request for permissions is not granted initially
function requestNotificationsPermissions() {}

// initializeFirebaseAuth();

// firebase.performance();

// loadMessages();
