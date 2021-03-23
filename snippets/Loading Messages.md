# Loading Messages

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Loading Messages stored in Firestore and update the UI

```jsx
// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
  // TODO 8: Load and listens for new messages.
  let query = firebase
    .firestore()
    .collection("messages")
    .orderBy("timestamp", "desc")
    .limit(12);

  query.onSnapshot(function (snapshot) {
    console.log("snapshot", snapshot);
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "removed") {
        deleteMessage(change.doc.id);
      } else {
        let message = change.doc.data();
        displayMessage(
          change.doc.id,
          message.timestamp,
          message.name,
          message.text,
          message.profilePicUrl,
          message.imageUrl
        );
      }
    });
  });
}
```