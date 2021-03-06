import { Modal, Button } from 'antd';
import React,{useEffect, useState } from "react";

import "./../../../styles/Film/detailPopup.scss";
import { useSelector, useDispatch } from "react-redux";

const Delete = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();

  

  const showModal = () => {
   console.log(props.schedule)
  };

  

 

  return (
    <>
      <a type="primary" onClick={showModal}>
        Delete
      </a>
     
    </>
  );
};
export default Delete
