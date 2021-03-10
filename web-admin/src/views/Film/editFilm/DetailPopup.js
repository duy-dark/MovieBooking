import { Modal, Button } from 'antd';
import React from "react";
import Detail from './Detail'
import "./../../../styles/Film/detailPopup.scss";
const DetailPopUp = (props) => {
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
    }, 1000);
  };

  const handleCancel = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Detail
      </a>
      <Modal 
        width={720}
        marginLeft={180}
        title="Film Detail"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
        okButtonProps={{ style: { display: 'none' } }}  
      >
        <Detail detail={props.detail} categories={props.categories} onCancel={handleCancel}/>
      </Modal>
    </>
  );
};
export default DetailPopUp
