import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";
import EditSchedule from './EditSchedule'
import "./../../../styles/Film/detailPopup.scss";
import { useSelector, useDispatch } from "react-redux";
import { getFilmSchedules } from "../../../redux/films/actions";
const Schedule = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch((getFilmSchedules(props.schedule._id)))
  }, []);
  const filmschedules = useSelector((state) => state.films.filmSchedule);
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
        Schedule
      </a>
      <Modal 
        width={400}
        style={{marginTop:100}}
        title="Edit Film Schedule"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
      >
        <EditSchedule filmschedule={filmschedules}/>
      </Modal>
    </>
  );
};
export default Schedule
