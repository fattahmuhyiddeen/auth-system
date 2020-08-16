import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import DetailRegistrationForm from './components/DetailRegistrationForm';
import './App.scss';
import 'antd/dist/antd.css';
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, set_user] = useState();

  const isRegistrationComplete = !!user?.profile;

  useEffect(() => {
    if (!!user?.uid) {
      db.ref('users/' + user.uid).once('value', snapshot => {
        set_user({ ...user, profile: snapshot.val() });
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(userAuth => {
      setIsLoading(false);
      set_user(userAuth);
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
        {!user && <AuthForm login={login} register={register} isLoading={isLoading} />}
        {(!!user && !isRegistrationComplete) && <DetailRegistrationForm />}
      </div>
    </div>
  );
}

export default App;
