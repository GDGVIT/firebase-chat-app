# Security Rules

## Real Time Chat App Using Firebase 🔥, a Realtime Database

## 🔥 Firestore Security Rules

```jsx
service cloud.firestore {
  match /databases/{database}/documents {
    // Messages:
    //   - Anyone can read.
    //   - Authenticated users can add and edit messages.
    //   - Validation: Check name is same as auth token and text length below 300 char or that imageUrl is a URL.
    //   - Deletes are not allowed.
    match /messages/{messageId} {
      allow read;
      allow create, update: if request.auth != null
                    && request.resource.data.name == request.auth.token.name
                    && (request.resource.data.text is string
                      && request.resource.data.text.size() <= 300
                      || request.resource.data.imageUrl is string
                      && request.resource.data.imageUrl.matches('https?://.*'));
      allow delete: if false;
    }
    // FCM Tokens:
    //   - Anyone can write their token.
    //   - Reading list of tokens is not allowed.
    match /fcmTokens/{token} {
      allow read: if false;
      allow write;
    }
  }
}
```

## 🔥 Storage Security Rules

```jsx
// Returns true if the uploaded file is an image and its size is below the given number of MB.
function isImageBelowMaxSize(maxSizeMB) {
  return request.resource.size < maxSizeMB * 1024 * 1024
      && request.resource.contentType.matches('image/.*');
}

service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/{messageId}/{fileName} {
      allow write: if request.auth != null && request.auth.uid == userId && isImageBelowMaxSize(5);
      allow read;
    }
  }
}
```

## 🔥 Firebase.json

```jsx
{
  // Add this!
  "firestore": {
    "rules": "firestore.rules"
  },
  // Add this!
  "storage": {
    "rules": "storage.rules"
  },
  "hosting": {
    "public": "./public"
  }
}
```