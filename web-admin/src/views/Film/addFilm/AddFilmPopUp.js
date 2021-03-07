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

  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 200);
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
        okButtonProps={{ style: { display: 'none' } }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        pagination={false}
      >
        <AddFilm categories={props.categories} onCancel={handleCancel}/>
      </Modal>
    </>
  );
};
export default AddNewFilm
