import { updateDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase/Setup";
import { useState } from "react";

export const useMarkAsRead = (setMailData, setUnreadCount) => {
  const markAsRead = async (data, subCollect) => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`);
    const messageDoc = doc(userDoc, `${subCollect ? subCollect : "Inbox"}`, `${data.id}`);
    try {
      await updateDoc(messageDoc, { read: true });
      setMailData((prevData) =>
        prevData.map((msg) =>
          msg.id === data.id ? { ...msg, read: true } : msg
        )
      );
      if (!data.read) {
        setUnreadCount((prevCount) => prevCount - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { markAsRead };
};
