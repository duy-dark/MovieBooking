import { Modal, Button } from 'antd';
import React from "react";
import AddFilm from './AddFilm'
import "./../../../styles/Film/addfilmPopup.scss";
const AddNewFilm = (props) => {
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
        Add Film
      </a>
      <Modal 
        width={400}
        
        title="Add New Film"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
      >
        <AddFilm/>
      </Modal>
    </>
  );
};
export default AddNewFilm
