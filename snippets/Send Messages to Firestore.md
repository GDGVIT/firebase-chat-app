# Send Messages to Firestore

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Check if User is Signed In

```jsx
// Returns true if a user is signed-in.
function isUserSignedIn() {
  // TODO 6: Return true if a user is signed-in.
  if (firebase.auth().currentUser) {
    return true;
  }
  window.alert("You must signin first");
  return false;
}
```

## 🔥 Save the message onto Firestore

```jsx
// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
  // TODO 7: Push a new message to Firebase.
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
```
