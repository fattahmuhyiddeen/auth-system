import React from 'react';
import { Input, Typography, Button, Space, Tabs, Upload, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

export default props => {
  return (
    <Space size="small" direction="vertical" style={{ marginTop: '1em' }}>
      <Title level={4}>Status: Completed Registration</Title>
      <Text disabled>Name:</Text>
      <Text>{props.profile.name}</Text>
      <Text disabled>Passport / IC:</Text>
      <Avatar size={200} icon={<UserOutlined />} src={'https://firebasestorage.googleapis.com/v0/b/user-auth-portal.appspot.com/o/' + props.profile.filename + '?alt=media'} />
    </Space>
  )
}