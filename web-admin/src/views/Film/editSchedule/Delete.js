import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";
import { useSelector, useDispatch } from "react-redux";
import {deleteFilmSchedules} from "../../../redux/films/actions"
const Delete = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();
  const dispatch = useDispatch();
  

  

  const deleteSchedule = () => {
    //console.log(props.schedule.FilmScheduleid)
    dispatch(deleteFilmSchedules(props.schedule.FilmScheduleid));
  };

  

 

  return (
    <>
      <a type="primary" onClick={deleteSchedule}>
        Delete
      </a>
     
    </>
  );
};
export default Delete
