import React from "react";
import { auth } from "../../firebasy/firebasyConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../apps/userslice";
export default function Register() {
  const dispatch = useDispatch();
  const registergoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        dispatch(login(user));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorMessage);
      });
  };
  return (
    <div className="min-h-screen grid place-items-center">
      <button onClick={registergoogle} className="btn btn-primary">
        google
      </button>
    </div>
  );
}
