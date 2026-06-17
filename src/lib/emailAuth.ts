import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

import { auth, db } from "./firebase";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";


export async function signup(
  name: string,
  email: string,
  password: string
) {

  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );


  const user = result.user;


  console.log("USER CREATED");


  // send verification email
  await sendEmailVerification(user);


  console.log("VERIFICATION EMAIL SENT");


  // create firestore profile
  await setDoc(
    doc(db, "users", user.uid),
    {
      name,
      email,
      role: "free",
      subscription: "free",
      emailVerified: false,
      createdAt: new Date()
    }
  );


  console.log("FIRESTORE WRITE SUCCESS");


  return {
    user,
    verificationSent: true
  };

}



export async function login(
  email: string,
  password: string
) {


  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );


  const user = result.user;



  // prevent login before verification
  if (!user.emailVerified) {

    throw new Error(
      "Please verify your email before login."
    );

  }



  const userDoc =
    await getDoc(
      doc(db,"users",user.uid)
    );



  const role =
    userDoc.exists()
      ? userDoc.data().role
      : "free";



  return {
    ...user,
    role
  };

}