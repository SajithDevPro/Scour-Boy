import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);

  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || "",
      email: user.email || "",
      role: "free",
      subscription: "free",
      createdAt: new Date()
    });
  }

  const data = snap.exists() ? snap.data() : { role: "free" };

  return {
    id: user.uid,
    email: user.email || "",
    name: user.displayName || "",
    photo: user.photoURL || "",
    role: data.role || "free"
  };
}