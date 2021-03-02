import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";
import { useSelector, useDispatch } from "react-redux";
import { getTheaters } from "../../../redux/films/actions";
import EditSchedule from  './EditSchedule'
const EditSchedulePopup = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
  const dispatch = useDispatch();
  useEffect(() => {
   
    dispatch((getTheaters()))
  }, []);
  const theaters = useSelector((state) => state.films.theaters);
  
  
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
        Edit
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
 
      >
        <EditSchedule onCancel={handleCancel} schedule={props.schedule} theaters={theaters} />
      </Modal>
    </>
  );
};
export default EditSchedulePopup
