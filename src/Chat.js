import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectchatID, selectchatName } from "./features/chatSlice";
import db from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setinput] = useState("");
  const user = useSelector(selectUser);
  const [messages, setmessages] = useState([]);
  const chatName = useSelector(selectchatName);
  const chatID = useSelector(selectchatID);

  useEffect(() => {
    if (chatID) {
      db.collection("chats")
        .doc(chatID)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatID]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatID).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user?.uid,
      photo: user?.photo,
      email: user?.email,
      displayName: user?.displayName,
    });
    setinput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To:<span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__message">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} content={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            placeholder="Type Here"
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <button onClick={sendMessage}> Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
