import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';

const Chat = () => {
  const [state, setState] = useState({
    user: auth().currentUser,
    chats: [],
    content: '',
    readError: null,
    writeError: null
  });

  useEffect(() => {
    const getChats = async () => {
      setState({ ...state, readError: null });

      try {
        await db.ref('chats').on('value', snapshot => {
          let chats = [];

          snapshot.forEach(snap => {
            chats.push(snap.val());
          });

          console.log(chats);

          setState({ ...state, chats });
        });
      } catch (error) {
        setState({ ...state, readError: error.message });
      }
    };

    getChats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setState({ ...state, writeError: null });

    try {
      await db.ref('chats').push({
        content: state.content,
        timestamp: Date.now(),
        uid: state.user.uid
      });
    } catch (error) {
      setState({ ...state, writeError: error.message });
    }
  };

  const handleChange = event => {
    console.log(event.target.value);
    setState({ ...state, content: event.target.value });
  };

  return (
    <div>
      <div className="chats">
        {state.chats.map(chat => {
          return (
            <div key={chat.timestamp}>
              <p>
                <strong>{chat.content}</strong>
              </p>
              <pre>{state.user.email}</pre>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={state.content} />
        {state.writeError && <p>{state.writeError}</p>}
        <button>Send</button>
      </form>

      <div>
        Loggedin in as: <strong>{state.user.email}</strong>
      </div>
    </div>
  );
};

export default Chat;
