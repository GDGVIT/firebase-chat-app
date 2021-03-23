# Send Messages to Firestore

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Check if User is Signed In

```jsx
// Returns true if a user is signed-in.
function isUserSignedIn() {
  // TODO 6: Return true if a user is signed-in.
  return !!firebase.auth().currentUser;
}
```

## 🔥 Save the message onto Firestore

```jsx
// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
  // TODO 7: Push a new message to Firebase.
  return firebase
    .firestore()
    .collection("messages")
    .add({
      name: getUserName(),
      text: messageText,
      profilePicUrl: getProfilePicUrl(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) =>
      console.log("Error writing new message to database", error)
    );
}
```