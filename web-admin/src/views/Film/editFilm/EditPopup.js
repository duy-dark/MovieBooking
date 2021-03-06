import { Modal, Button } from 'antd';
import React from "react";
import Edit from './Edit'
// import "./../../../styles/Film/detailPopup.scss";
const EditPopUp = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
   

  const showModal = () => {

    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Edit
      </a>
      <Modal 
        width={370}
       
        title="Edit Film Detail"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}  
      >
        <Edit detail={props.detail} categories={props.categories} onCancel={handleCancel} onCancelDetail={props.onCancel}/>
      </Modal>
    </>
  );
};
export default EditPopUp
