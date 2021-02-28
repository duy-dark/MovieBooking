import { Modal, Button } from 'antd';
import React from "react";
import EditableTable from './EditFilm'
import "./../../../styles/Film/detailPopup.scss";
const Detail = (props) => {
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
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Detail
      </a>
      <Modal 
        width={720}
        marginLeft={180}
        title="Edit Film Detail"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
      >
        <EditableTable detail={props.detail}/>
      </Modal>
    </>
  );
};
export default Detail
