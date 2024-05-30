import React from 'react';
import './pokemonPopup.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';

function ModelPopup(props) {
  return (
    <>

    {/* <div className={props.show? 'pop_container': "dnon"} {...props}>
      <header>
        <h2 id="contained-modal-title-vcenter">
        {props.header}
        <CloseButton onClick={props.onHide}>X</CloseButton>
        </h2>
      </header>
      <div>
      {props.content}
      </div>
      <footer>
        <Button onClick={props.onHide}>Close</Button>
      </footer>
    </div> */}

    <Modal
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.content}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>

    
  )
}

export default ModelPopup