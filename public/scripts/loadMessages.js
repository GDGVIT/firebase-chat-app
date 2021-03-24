//------------------LOADING MESSAGES FROM FIRESTORE-----------------------
/*
    Firestore

    querying firestore => firebase().collection("collectionName").orderBy("timestamp","desc").limit(12)
    listening to doc changes => query.onSnapshot(snapshot)
    
*/

let messageListElement = document.getElementById("messages");

//--------------------functions------------------------
function loadMessages() {
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
