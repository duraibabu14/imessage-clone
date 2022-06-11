import React, { useEffect } from "react";
import "./App.css";
import Imessage from "./Imessage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(
          login({
            uid: authuser?.uid,
            photo: authuser?.photoURL,
            email: authuser?.email,
            displayName: authuser?.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
