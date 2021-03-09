import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";

const Trailer = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
   
  const showModal = () => {
    setVisible(true);
  };

 
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
       Watch
      </a>
      <Modal 
        width={330}
        style={{marginTop:40,marginLeft:600,padding:20}}
       
        visible={visible}
       
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
       <div  dangerouslySetInnerHTML={{ __html: props.ifr }}/>
      </Modal>
    </>
  );
};
export default Trailer
