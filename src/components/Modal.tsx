/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { mq } from './Theme';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--text);
  opacity: 0.3;
  z-index: 21;
`;

const ModalCard = styled.div`
  background-color: var(--background);
  border-radius: 2px;
  padding: 15px;
  min-width: 265px;
  position: relative;
  z-index: 22;
  margin-bottom: 100px;
  color: var(--text);
  ${mq[0]} {
    min-width: 200px;
  }
`;

const portalRoot = document.getElementById('modal-root');

const Modal = ({ children, isOpen, onClose }) => {
  const modalContent = isOpen && (
    <ModalWrapper>
      <ModalCard>
        <div>{children}</div>
      </ModalCard>
      <Mask onClick={onClose} />
    </ModalWrapper>
  );
  return ReactDOM.createPortal(modalContent, portalRoot);
};

export default Modal;
