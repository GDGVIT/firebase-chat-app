# Authentication

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Sign In

```jsx
// Signs-in Friendly Chat.
function signIn() {
  // TODO 1: Sign in Firebase with credential from the Google user.
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
```

## 🔥 Sign Out

```jsx
// Signs-out of Friendly Chat.
function signOut() {
  // TODO 2: Sign out of Firebase.
  firebase.auth().signOut();
}
```

## 🔥 Changes in Authentication State

```jsx
// Initiate firebase auth.
function initFirebaseAuth() {
  // TODO 3: Initialize Firebase.
  firebase.auth().onAuthStateChanged(authStateObserver);
}
```

## 🔥 Getting Username and Profile Pic of Authenticated User

```jsx
// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  // TODO 4: Return the user's profile pic URL.
  return (
    firebase.auth().currentUser.photoURL || "/images/profile_placeholder.png"
  );
}

// Returns the signed-in user's display name.
function getUserName() {
  // TODO 5: Return the user's display name.
  return firebase.auth().currentUser.displayName;
}
```