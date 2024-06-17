import { useState } from 'react';
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth, database } from '../firebase/Setup';

export const useMessage = () => {
  const [mailId, setMailId] = useState('');
  const [message, setMessage] = useState('');

  const send = async () => {
    const userDoc = doc(database, 'Users', `${auth.currentUser?.email}`);
    const messageRef = collection(userDoc, 'Send');
    try {
      await addDoc(messageRef, {
        email: message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const inbox = async () => {
    const userDoc = doc(database, 'Users', `${mailId}`);
    const messageRef = collection(userDoc, 'Inbox');
    try {
      await addDoc(messageRef, {
        email: message,
        sender: auth.currentUser?.displayName,
      });
      await send();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    mailId,
    setMailId,
    message,
    setMessage,
    inbox,
  };
};
