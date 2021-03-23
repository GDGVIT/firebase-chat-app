# Uploading Images onto Storage

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Save the image onto Firebase Storage and update the Firestore

```jsx
// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  // TODO 9: Posts a new image as a message.
  firebase
    .firestore()
    .collection("messages")
    .add({
      name: getUserName(),
      imageUrl: LOADING_IMAGE_URL,
      profilePicUrl: getProfilePicUrl(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function (messageRef) {
      let filePath =
        firebase.auth().currentUser.uid + "/" + messageRef.id + "/" + file.name;
      return firebase
        .storage()
        .ref(filePath)
        .put(file)
        .then(function (fileSnapshot) {
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            return messageRef.update({
              imageUrl: url,
              storageUri: fileSnapshot.metadata.fullPath,
            });
          });
        });
    })
    .catch(function (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage: ",
        error
      );
    });
}
```