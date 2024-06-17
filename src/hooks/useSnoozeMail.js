import { setDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase/Setup";

export const useSnoozeMail = () => {
  const snoozed = async (data) => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`);
    const messageDoc = doc(userDoc, "Snoozed", `${data.id}`);
    const snoozeDoc = doc(userDoc, "Inbox", `${data.id}`);
    try {
      await deleteDoc(snoozeDoc);
      await setDoc(messageDoc, {
        email: data.email,
        sender: data.sender,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { snoozed };
};
