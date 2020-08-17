import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Space, Tabs, Upload, Modal } from 'antd';
import { SaveOutlined, UnlockOutlined, CloseCircleOutlined, LoadingOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const { TabPane } = Tabs;

function Form(props) {
  const [name, setName] = useState('');
  const [img, setImg] = useState();
  const [isShowModal, setIsShowModal] = useState();

  const beforeUpload = (file, fileList) => {
    // Access file content here and do something with it
    const reader = new FileReader();

    reader.onload = e => setImg(e.target.result);
    reader.readAsDataURL(file)

    // Prevent upload
    return false;
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const showModal = () => {
    if (!name || !img) {
      alert('Please fill all details');
      return;
    }
    setIsShowModal(true)
  }

  return (
    <Space size="small" direction="vertical" style={{ marginTop: '1em' }}>
      <Input value={name} addonBefore="Name" onChange={e => setName(e.target.value)} />
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {/* {uploadButton} */}
        {!!img ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
      </Upload>

      <Button type="danger" onClick={showModal}>
        Submit
      </Button>
      <Modal
        title="Preview Profile Details"
        visible={isShowModal}
        onOk={() => !props.isRegistering && props.completeRegister({ img, name })}
        onCancel={() => setIsShowModal(false)}
      >
        <p>Name: {name}</p>
        <p>Passport / IC</p>
        <img src={img} width="100%" height="auto" />
      </Modal>
    </Space>
  )
}
export default Form;
