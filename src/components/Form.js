import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Space, Tabs, Upload, message } from 'antd';
import { SaveOutlined, CloseCircleOutlined, LoadingOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const { TabPane } = Tabs;

const { Title } = Typography;
function Form(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const reset = () => {
    setEmail('');
    setPassword('');
    setRePassword('');
  }

  const onTabChanged = (key) => {
    setIsRegister(key === 'register');
  }

  const login = () => {
    if (props.isLoading) {
      return;
    }
    if (!email || !password) {
      alert('Please fill all details');
      return;
    }

    props.login({ email, password });
  }
  const register = () => {
    if (props.isLoading) {
      return;
    }
    if (!email || !password) {
      alert('Please fill all details');
      return;
    }
    if (password != rePassword) {
      alert('Please make sure password and re-password match');
      return;
    }
    props.register({ email, password });
  }

  return (
    <Space size="small" direction="vertical">
      <Tabs defaultActiveKey="1" onChange={onTabChanged}>
        <TabPane tab="Login" key="login">
        </TabPane>
        <TabPane tab="Register" key="register">
        </TabPane>
      </Tabs>
      <Input value={email} addonBefore="E-Mail" onChange={e => setEmail(e.target.value)} />
      <Input.Password value={password} addonBefore="Password" onChange={e => setPassword(e.target.value)} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
      {isRegister && <Input.Password value={rePassword} addonBefore="Re-Password" onChange={e => setRePassword(e.target.value)} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />}
      <div className="spread-row">
        <Button onClick={reset} shape="round" icon={<CloseCircleOutlined />} size={10}>
          Reset
        </Button>
        <Button onClick={isRegister ? register : login} type="danger" shape="round" icon={props.isLoading ? <LoadingOutlined /> : <SaveOutlined />} size={10}>
          {isRegister ? 'Register' : 'Login'}
        </Button>
      </div>
    </Space>
  );
}

export default Form;
