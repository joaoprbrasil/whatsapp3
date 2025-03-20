import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import './App.css';
import { db } from './firebase.config';

function App() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
  }, []);

  const playSound = () => {
    const audio = new Audio("https://www.myinstants.com/media/sounds/vine-boom.mp3");
    audio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: document.getElementById("user_name").value,
    });

    playSound(); 
    setNewMessage("");
  };

  return (
    <>
      <div className="chat-app">
        <div>
          {messages.map((message) => (
            <p key={message.id}>
              <strong>{message.user}:</strong> {message.text}
            </p>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="new-message-form">
          <input id="user_name" placeholder="Username" />
          <input
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </>
  );
}

export default App;
