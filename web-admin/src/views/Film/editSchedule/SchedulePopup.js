import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";
import ShowSchedule from './Schedule'
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
        title="Film Schedule"
        visible={visible}
       
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <ShowSchedule onCancel={handleCancel} filmschedule={filmschedules} />
      </Modal>
    </>
  );
};
export default Schedule
