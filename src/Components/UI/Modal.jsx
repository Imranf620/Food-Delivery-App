import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';

const ModalContext = createContext();

function Modal({ children }) {
  const [openId, setOpenId] = useState('');

  const open = id => setOpenId(id);
  const close = () => setOpenId('');

  useEffect(() => {
    if (openId) document.body.style.overflow = 'hidden';
    if (!openId) document.body.style.overflow = 'visible';
  }, [openId]);

  return (
    <ModalContext.Provider value={{ openId, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

// Modal Button to open the Modal
function Open({ children, id }) {
  const { open } = useContext(ModalContext);
  const handleClick = () => {
    open(id);
  };
  return cloneElement(children, { onClick: handleClick });
}

Open.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

// Modal Window to show the main content
function Window({
  children,
  closeOnOverlay = false,
  center = false,
  zIndex,
  scrollbar = true,
  id,
}) {
  const { openId, close } = useContext(ModalContext);

  if (id !== openId) return null;

  return createPortal(
    <>
      <Overlay
        show={id === openId}
        onClick={() => closeOnOverlay && close()}
        className={zIndex}
      />
      <div
        className={`custom-scrollbar fixed z-50 rounded-md bg-white ${
          center ? 'top-1/2 -translate-y-1/2 ' : 'top-0 mt-[5rem] '
        } left-1/2 max-h-[70dvh] -translate-x-1/2 overflow-y-auto shadow-md ${
          !scrollbar ? 'scrollbar-hidden' : ''
        } w-[90%] overflow-x-hidden sm:w-[500px]`}
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </>,
    document.getElementById('overlay'),
  );
}

Window.propTypes = {
  children: PropTypes.node.isRequired,
  closeOnOverlay: PropTypes.bool,
  center: PropTypes.bool,
  zIndex: PropTypes.string,
  scrollbar: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
