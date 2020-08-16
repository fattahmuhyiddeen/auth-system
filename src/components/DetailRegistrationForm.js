import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Space, Tabs, Upload, Modal } from 'antd';
import { SaveOutlined, UnlockOutlined, CloseCircleOutlined, LoadingOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const { TabPane } = Tabs;

function Form(props) {
  const [name, setName] = useState('');
  const [tmpImg, setTmpImg] = useState();
  const [isShowModal, setIsShowModal] = useState();

  const beforeUpload = (file, fileList) => {
    // Access file content here and do something with it
    const reader = new FileReader();

    reader.onload = e => {
      setTmpImg(e.target.result);
    };
    reader.readAsDataURL(file)

    // Prevent upload
    return false;
  }
  const onImageChange = info => {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   }),
      // );
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const showModal = () => {
    if (!name || !tmpImg) {
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
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
      // onChange={onImageChange}
      >
        {/* {uploadButton} */}
        {!!tmpImg ? <img src={tmpImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
      </Upload>

      <Button type="danger" onClick={showModal}>
        Submit
      </Button>
      <Modal
        title="Preview Profile Details"
        visible={isShowModal}
        onOk={() => null}
        onCancel={() => setIsShowModal()}
      >
        <p>Name: {name}</p>
        <p>Passport / IC</p>
        <img src={tmpImg} width="100%" height="auto" />
      </Modal>
    </Space>
  )
}
export default Form;
