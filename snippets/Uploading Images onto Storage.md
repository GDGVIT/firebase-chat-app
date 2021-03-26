# Uploading Images onto Storage

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Save the image onto Firebase Storage and update the Firestore

```jsx
// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  // TODO 9: Posts a new image as a message.
  const db = firebase.firestore().collection("messages");
  db.add({
    name: getUserName(),
    imageUrl: LOADING_IMAGE_URL,
    profilePicUrl: getProfilePicUrl(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
    .then(function (messageRef) {
      const filePath =
        firebase.auth().currentUser.uid + "/" + messageRef.id + "/" + file.name;

      const fileRef = firebase.storage().ref(filePath).put(file);

      fileRef.then(function (fileSnapshot) {
        const getUrl = fileSnapshot.ref.getDownloadURL();

        getUrl.then((url) => {
          messageRef
            .update({
              imageUrl: url,
              storageUri: fileSnapshot.metadata.fullPath,
            })
            .then(function () {
              console.log("Image has been added and updated in firestore!");
            });
        });
      });
    })
    .catch(function (error) {
      console.log(
        "There was an error uploading a file to Cloud Storage: ",
        error
      );
    });
}
```
