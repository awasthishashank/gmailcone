import { doc, updateDoc } from "firebase/firestore";
import { database, auth } from "../firebase/Setup"; // Ensure you import auth from the correct path

export const markMessageAsRead = async (messageId) => {
  const userDoc = doc(database, "Users", `${auth.currentUser?.email}`);
  const messageDoc = doc(userDoc, "Inbox", messageId);
  await updateDoc(messageDoc, {
    read: true,
  });
};
