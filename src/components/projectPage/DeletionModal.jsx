import React from 'react';
import styled, { keyframes } from 'styled-components';

const DeletionModal = ({ deleteProject, hideModal }) => (<>
  <Modal>
    <div>Are you sure you want to delete this project?</div>
    <Button onClick={hideModal}>Cancel</Button>
    <Button onClick={deleteProject}>Delete Project</Button>
  </Modal>
  <ModalBackground onClick={hideModal} />
</>);

const Button = styled.button`
  margin: 20px 30px 0;
  background-color: #CBCBCB;
  border-radius: 3px;
  border: 1px solid black;
`;

const slideUp = keyframes`
  from { top: 300px; opacity: 0 }
  to { top: 0; opacity: 1 }
`;

const Modal = styled.div`
  background-color: white;
  z-index: 10;
  position: relative;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid black;
  width: 320px;
  animation: ${slideUp} 0.5s;
  font-family: Helvetica, Arial, sans-serif;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
`;

export default DeletionModal;
