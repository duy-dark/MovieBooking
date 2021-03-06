import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";
import { useSelector, useDispatch } from "react-redux";

import EditSchedule from  './EditSchedule'
const EditSchedulePopup = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();

  

  const showModal = () => {
    setVisible(true);
  };

  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Edit
      </a>
      <Modal 
        width={400}
        style={{marginTop:300}}
        title="Film Schedule"
        visible={visible}
       
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}
 
      >
        <EditSchedule onCancel={handleCancel} schedule={props.schedule} theaters={props.theaters} longtime={props.longtime} />
      </Modal>
    </>
  );
};
export default EditSchedulePopup
