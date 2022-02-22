import React from 'react';
import styled from 'styled-components';

const DeleteModal = ({ deleteProject, hideModal }) => {
  return (<>
    <Modal>
      <div>Are you sure you want to delete this project?</div>
      <Button onClick={hideModal}>Cancel</Button>
      <Button onClick={deleteProject}>Delete Project</Button>
    </Modal>
    <ModalBackground />
  </>);
};

const Button = styled.button`
  margin: 20px 30px 0;
`;

const Modal = styled.div`
  background-color: white;
  z-index: 10;
  position: relative;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid black;
  width: 300px;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
`;

export default DeleteModal;
