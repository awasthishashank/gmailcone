import { useState, useEffect } from 'react';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/Setup';

export const useContacts = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [contactsData, setContactsData] = useState([]);

  const addContacts = async () => {
    const userDoc = doc(database, 'Users', `${auth.currentUser?.email}`);
    const messageRef = collection(userDoc, 'Contacts');
    try {
      await addDoc(messageRef, {
        name: name,
        mobile: mobile,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const showContacts = async () => {
    const userDoc = doc(database, 'Users', `${auth.currentUser?.email}`);
    const messageRef = collection(userDoc, 'Contacts');
    try {
      const data = await getDocs(messageRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContactsData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    name,
    setName,
    mobile,
    setMobile,
    contactsData,
    addContacts,
    showContacts,
  };
};
