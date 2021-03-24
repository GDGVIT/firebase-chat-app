//-------------------------AUTHENTICATION--------------------------------
/*
    Firebase Oauth functions

    provider => new firebase.auth().GoogleAuthProvider();
    profilePicUrl => firebase.auth().currentUser.photoURL
    userName => firebase.auth().currentUser.displayName
    detect Auth State Change => firebase.auth().onAuthStateChanged()
    
*/

//Storing element objects obtained by id in variables
let userPicElement = document.getElementById("user-pic");
let userNameElement = document.getElementById("user-name");
let signInButtonElement = document.getElementById("sign-in");
let signOutButtonElement = document.getElementById("sign-out");

//----------------event listeners------------------------
signInButtonElement.addEventListener("click", signIn);
signOutButtonElement.addEventListener("click", signOut);

//------------------functions----------------------------
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}

//get profile URL
function getProfilePicUrl() {
  return (
    firebase.auth().currentUser.photoURL || "/images/profile_placeholder.png"
  );
}

//get username of the user who is authenticated
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

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
  } else {
    userPicElement.setAttribute("hidden", "true");
    userNameElement.setAttribute("hidden", "true");
    signOutButtonElement.setAttribute("hidden", "true");

    //show sign-in
    signInButtonElement.removeAttribute("hidden");
  }
}

//initialize firebase auth to listen to state changes
function initializeFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}

//sign in using firebase googleoauth. ensure google oauth is enabled
function signIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

//signout the user
function signOut() {
  firebase.auth().signOut();
}
