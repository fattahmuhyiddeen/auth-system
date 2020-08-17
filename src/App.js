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
  const [isRegistering, setIsRegistering] = useState(false);
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

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      type = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type });
  }

  const completeRegister = ({ img, name }) => {
    setIsRegistering(true);
    const filename = user.uid + '.jpg';
    let storageRef = firebase.storage().ref(filename);
    storageRef.put(dataURLtoFile(img, filename)).then((e) => {
      const profile = { name, filename };
      firebase.database().ref('users/' + user.uid).set(profile).then(() => {
        set_user({ ...user, profile });
      })
    }).catch(() => {
      setIsRegistering(false);
    })
  }

  return (
    <div className="container">
      <div className="header">
        <div>Auth system</div>
        <div onClick={signOut} style={{ cursor: 'pointer' }}>Logout</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        {!user && <AuthForm login={login} register={register} isLoading={isLoading} />}
        {(!!user && !isRegistrationComplete) && <DetailRegistrationForm completeRegister={completeRegister} isRegistering={isRegistering} />}
      </div>
    </div>
  );
}

export default App;
