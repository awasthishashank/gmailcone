import { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { auth, database } from "../firebase/Setup";

export const useGetMail = (subCollect) => {
  const [mailData, setMailData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const pollingInterval = useRef(null);

  const getMail = async () => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`);
    const messageDoc = collection(userDoc, `${subCollect ? subCollect : "Inbox"}`);
    
    try {
      const data = await getDocs(messageDoc);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        read: doc.data().read || false,
        timestamp: doc.data().timestamp?.toDate() || new Date() // Ensure timestamp is a Date object
      }));

      // Sort data: Inbox - newest first, Sent - oldest first
      const sortedData = subCollect === "Send"
        ? filteredData.sort((a, b) => a.timestamp - b.timestamp)
        : filteredData.sort((a, b) => b.timestamp - a.timestamp);
      
      setMailData(sortedData);
      const unreadMessages = sortedData.filter((message) => !message.read);
      setUnreadCount(unreadMessages.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMail();
    pollingInterval.current = setInterval(() => {
      getMail();
    }, 2000);

    return () => {
      clearInterval(pollingInterval.current);
    };
  }, [subCollect]);

  return { mailData, unreadCount, getMail };
};
