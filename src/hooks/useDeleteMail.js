import { deleteDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase/Setup";

export const useDeleteMail = () => {
  const deleteMail = async (data) => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`);
    const messageDoc = doc(userDoc, "Inbox", `${data.id}`);
    const starredDoc = doc(userDoc, "Starred", `${data.id}`);
    const snoozedDoc = doc(userDoc, "Snoozed", `${data.id}`);
    const sentDoc = doc(userDoc, "Send", `${data.id}`);
    try {
      await deleteDoc(starredDoc);
      await deleteDoc(snoozedDoc);
      await deleteDoc(messageDoc);
      await deleteDoc(sentDoc);
    } catch (err) {
      console.error(err);
    }
  };

  return { deleteMail };
};
