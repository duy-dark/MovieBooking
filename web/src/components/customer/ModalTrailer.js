import React from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/customers/modal-trailer.scss';

export default function ModalTrailer(props) {
  return (
    <Modal
      {...props}
      className="modal--trailer"
      centered
    >
      <div dangerouslySetInnerHTML={{ __html: props.trailer }} />
    </Modal>
  )
}
