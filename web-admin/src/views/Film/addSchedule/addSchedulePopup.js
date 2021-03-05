import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";

const AddSchedulePopup = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
   
  const showModal = () => {
    setVisible(true);
  };

  
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Add Schedule
      </a>
      <Modal 
        width={400}
        style={{marginTop:100}}
        title="Film Schedule"
        visible={visible}
       
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
       
      </Modal>
    </>
  );
};
export default AddSchedulePopup
