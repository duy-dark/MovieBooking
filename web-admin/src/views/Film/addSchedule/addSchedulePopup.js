import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";
import AddSchedule from "./addSchedule"
const AddSchedulePopup = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
   
  const showModal = () => {
    setVisible(true);
  };

 
  const handleCancel = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Add Schedule
      </a>
      <Modal 
        width={400}
        style={{marginTop:100}}
        title="Add Schedule"
        visible={visible}
       
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
       <AddSchedule onCancel={handleCancel} schedule={props.schedule} theaters={props.theaters} longtime={props.longtime} />
      </Modal>
    </>
  );
};
export default AddSchedulePopup
