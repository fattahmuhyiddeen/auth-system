import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import AuthForm from './components/AuthForm';
import './App.scss';
import 'antd/dist/antd.css';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [is_auth, set_is_auth] = useState(false);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(userAuth => {
      setIsLoading(false);
      set_is_auth(!!userAuth);
    });
  }, []);

  const login = (details) => {
    setIsLoading(true);
    firebaseApp.auth().signInWithEmailAndPassword(details.email, details.password).catch(error => {
      setIsLoading(false);
      alert(JSON.stringify(error));
    });
  }
  const register = (details) => {
    setIsLoading(true);
    firebase.auth().createUserWithEmailAndPassword(details.email, details.password).catch(error => {
      setIsLoading(false);
      alert(JSON.stringify(error));
    });
  }

  const signOut = () => firebaseApp.auth().signOut();

  return (
    <div className="container">
      <div className="header">
        <div>Auth system</div>
        <div onClick={signOut} style={{ cursor: 'pointer' }}>Logout</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        {!is_auth && <AuthForm login={login} register={register} isLoading={isLoading} />}
      </div>
    </div>
  );
}

export default App;
