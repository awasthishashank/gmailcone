import { setDoc, doc } from "firebase/firestore";
import { auth, database } from "../firebase/Setup";

export const useStarMail = () => {
  const starred = async (data) => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.email}`);
    const messageDoc = doc(userDoc, "Starred", `${data.id}`);
    try {
      await setDoc(messageDoc, {
        email: data.email,
        sender: data.sender,
        starred: "true",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { starred };
};
