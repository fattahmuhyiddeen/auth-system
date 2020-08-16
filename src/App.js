import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Form from './components/Form';
import './App.scss';
import 'antd/dist/antd.css';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


function App() {
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

  return (
    <div className="container">
      <div className="header">Registration system</div>
      <Row>
        <Col span={24} className="small-padding">
          {!is_auth && <Form login={login} register={register} isLoading={isLoading} />}
        </Col>
        {/* <Col span={19} className="small-padding">
          <div> List</div>
        </Col> */}
      </Row>
    </div>
  );
}

export default App;
